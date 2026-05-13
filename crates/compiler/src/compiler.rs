use super::*;

#[derive(Debug)]
pub(crate) struct Compiler {
  pub(crate) manifest: Manifest,
  pub(crate) options: Arguments,
  pub(crate) root: PathBuf,
}

impl Compiler {
  fn build_parser(&self, parser: &ParserConfig, source: &Path) -> Result {
    let output = self
      .public_directory()
      .join(format!("tree-sitter-{}.wasm", parser.name));

    run(
      Command::new(self.tree_sitter())
        .arg("build")
        .arg("--wasm")
        .arg("--output")
        .arg(&output)
        .arg(source),
    )?;

    println!("built {}", self.display_path(&output));

    Ok(())
  }

  fn build_parsers(&self) -> Result {
    let checkout_directory = Builder::new()
      .prefix("treesitter-run-parsers-")
      .tempdir()?;

    for parser in &self.manifest.parsers {
      let source = Self::prepare_parser(parser, checkout_directory.path())?;

      self.build_parser(parser, &source)?;
    }

    Ok(())
  }

  fn copy_runtime(&self) -> Result {
    fs::create_dir_all(self.public_directory())?;

    fs::copy(self.runtime_wasm(), self.runtime_output())?;

    println!("copied {}", self.display_path(&self.runtime_output()));

    Ok(())
  }

  fn display_path(&self, path: &Path) -> String {
    path
      .strip_prefix(&self.root)
      .unwrap_or(path)
      .display()
      .to_string()
  }

  fn prepare_parser(
    parser: &ParserConfig,
    checkout_directory: &Path,
  ) -> Result<PathBuf> {
    let directory =
      checkout_directory.join(repository_name(&parser.repository)?);

    run(
      Command::new("git")
        .arg("clone")
        .arg("--filter=blob:none")
        .arg("--no-checkout")
        .arg(&parser.repository)
        .arg(&directory),
    )?;

    run(
      Command::new("git")
        .arg("-C")
        .arg(&directory)
        .arg("fetch")
        .arg("--depth")
        .arg("1")
        .arg("origin")
        .arg(&parser.revision),
    )?;

    run(
      Command::new("git")
        .arg("-C")
        .arg(&directory)
        .arg("checkout")
        .arg("--detach")
        .arg(&parser.revision),
    )?;

    let revision = read(
      Command::new("git")
        .arg("-C")
        .arg(&directory)
        .arg("rev-parse")
        .arg("HEAD"),
    )?;

    if revision.trim() != parser.revision {
      bail!(
        "{} checked out {}, expected {}",
        parser.name,
        revision.trim(),
        parser.revision
      );
    }

    let source = if let Some(path) = &parser.path {
      directory.join(path)
    } else {
      directory
    };

    Ok(source)
  }

  fn public_directory(&self) -> PathBuf {
    self.resolve(&self.options.public_directory.as_path())
  }

  fn resolve(&self, path: &Path) -> PathBuf {
    if path.is_absolute() {
      path.to_path_buf()
    } else {
      self.root.join(path)
    }
  }

  pub(crate) fn run(&self) -> Result {
    self.copy_runtime()?;

    if !self.options.verify_only {
      self.build_parsers()?;
    }

    if !self.options.skip_verify {
      self.verify_parsers()?;
    }

    Ok(())
  }

  fn runtime_output(&self) -> PathBuf {
    self.public_directory().join("tree-sitter.wasm")
  }

  fn runtime_wasm(&self) -> PathBuf {
    self.options.runtime_wasm.as_ref().map_or_else(
      || {
        self
          .root
          .join("node_modules")
          .join("web-tree-sitter")
          .join("tree-sitter.wasm")
      },
      |path| self.resolve(path),
    )
  }

  fn tree_sitter(&self) -> PathBuf {
    self.options.tree_sitter.as_ref().map_or_else(
      || {
        self
          .root
          .join("node_modules")
          .join(".bin")
          .join(if cfg!(windows) {
            "tree-sitter.cmd"
          } else {
            "tree-sitter"
          })
      },
      |path| self.resolve(path),
    )
  }

  fn verify_parsers(&self) -> Result {
    let parser_names = self
      .manifest
      .parsers
      .iter()
      .map(|parser| parser.name.as_str())
      .collect::<Vec<_>>()
      .join("\n");

    run(
      Command::new("bun")
        .arg("--eval")
        .arg(VERIFY_SCRIPT)
        .env("TREE_SITTER_PUBLIC_DIR", self.public_directory())
        .env("TREE_SITTER_PARSERS", parser_names),
    )?;

    Ok(())
  }
}

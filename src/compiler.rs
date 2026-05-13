use super::*;

#[derive(Debug)]
pub(crate) struct Compiler {
  pub(crate) manifest: Manifest,
  pub(crate) options: Arguments,
  pub(crate) root: PathBuf,
}

impl Compiler {
  fn build_parser(
    &self,
    parser: &ParserConfig,
    progress: &ProgressBar,
    source: &Path,
  ) -> Result {
    let output = self
      .public_directory()
      .join(format!("tree-sitter-{}.wasm", parser.name));

    let output_display = self.display_path(&output);

    Self::start_step(progress, "build", &parser.name);

    run(
      Command::new(self.tree_sitter())
        .arg("build")
        .arg("--wasm")
        .arg("--output")
        .arg(&output)
        .arg(source),
    )?;

    Self::finish_step(progress, "built", &output_display);

    Ok(())
  }

  fn build_parsers(&self, progress: &ProgressBar) -> Result {
    let checkout_directory =
      Builder::new().prefix("treesitter-run-parsers-").tempdir()?;

    for parser in &self.manifest.parsers {
      Self::start_step(progress, "fetch", &parser.name);

      self.build_parser(
        parser,
        progress,
        &Self::prepare_parser(parser, checkout_directory.path())?,
      )?;
    }

    Ok(())
  }

  fn copy_runtime(&self, progress: &ProgressBar) -> Result {
    let output = self.runtime_output();

    let output_display = self.display_path(output.as_path());

    Self::start_step(progress, "copy", &output_display);

    fs::create_dir_all(self.public_directory())?;
    fs::copy(self.runtime_wasm(), output)?;

    Self::finish_step(progress, "copied", &output_display);

    Ok(())
  }

  fn display_path(&self, path: &Path) -> String {
    path
      .strip_prefix(&self.root)
      .unwrap_or(path)
      .display()
      .to_string()
  }

  fn finish_step(progress: &ProgressBar, status: &str, message: &str) {
    progress.inc(1);

    let message =
      format!("{} {}", style(status).for_stderr().green().bold(), message);

    if progress.is_hidden() {
      eprintln!("{message}");
    } else {
      progress.println(message);
    }
  }

  fn node_modules(&self) -> PathBuf {
    self.root.join("www").join("node_modules")
  }

  fn prepare_parser(
    parser: &ParserConfig,
    checkout_directory: &Path,
  ) -> Result<PathBuf> {
    let repository = parser.repository.trim_end_matches('/');

    let name = repository
      .rsplit('/')
      .next()
      .filter(|name| !name.is_empty())
      .context("repository URL does not contain a name")?;

    let directory =
      checkout_directory.join(name.strip_suffix(".git").unwrap_or(name));

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

    let revision = String::from_utf8(
      run(
        Command::new("git")
          .arg("-C")
          .arg(&directory)
          .arg("rev-parse")
          .arg("HEAD"),
      )?
      .stdout,
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

  fn progress_bar(&self) -> Result<ProgressBar> {
    let progress = ProgressBar::new(self.progress_len()?);

    progress.set_style(
      ProgressStyle::with_template(
        "[{bar:32.cyan/blue}] {pos:>2}/{len:2} {msg}",
      )?
      .progress_chars("=>-"),
    );

    Ok(progress)
  }

  fn progress_len(&self) -> Result<u64> {
    let parser_count = if self.options.verify_only {
      0
    } else {
      u64::try_from(self.manifest.parsers.len())?
    };

    let verify_count = u64::from(!self.options.skip_verify);

    Ok(1 + parser_count + verify_count)
  }

  fn public_directory(&self) -> PathBuf {
    self.resolve(self.options.public_directory.as_path())
  }

  fn resolve(&self, path: &Path) -> PathBuf {
    if path.is_absolute() {
      path.to_path_buf()
    } else {
      self.root.join(path)
    }
  }

  pub(crate) fn run(&self) -> Result {
    let progress = self.progress_bar()?;

    self.copy_runtime(&progress)?;

    if !self.options.verify_only {
      self.build_parsers(&progress)?;
    }

    if !self.options.skip_verify {
      self.verify_parsers(&progress)?;
    }

    progress.finish_with_message(
      style("done").for_stderr().green().bold().to_string(),
    );

    Ok(())
  }

  fn runtime_output(&self) -> PathBuf {
    self.public_directory().join("tree-sitter.wasm")
  }

  fn runtime_wasm(&self) -> PathBuf {
    self.options.runtime_wasm.as_ref().map_or_else(
      || {
        self
          .node_modules()
          .join("web-tree-sitter")
          .join("tree-sitter.wasm")
      },
      |path| self.resolve(path),
    )
  }

  fn start_step(progress: &ProgressBar, status: &str, message: &str) {
    progress.set_message(format!(
      "{} {}",
      style(status).for_stderr().cyan().bold(),
      message
    ));
  }

  fn tree_sitter(&self) -> PathBuf {
    self.options.tree_sitter.as_ref().map_or_else(
      || {
        self.node_modules().join(".bin").join(if cfg!(windows) {
          "tree-sitter.cmd"
        } else {
          "tree-sitter"
        })
      },
      |path| self.resolve(path),
    )
  }

  fn verify_parsers(&self, progress: &ProgressBar) -> Result {
    let parser_names = self
      .manifest
      .parsers
      .iter()
      .map(|parser| parser.name.as_str())
      .collect::<Vec<_>>()
      .join("\n");

    Self::start_step(progress, "verify", "parsers");

    run(
      Command::new("bun")
        .arg("--eval")
        .arg(VERIFY_SCRIPT)
        .current_dir(self.root.join("www"))
        .env("TREE_SITTER_PUBLIC_DIR", self.public_directory())
        .env("TREE_SITTER_PARSERS", parser_names),
    )?;

    Self::finish_step(progress, "verified", "parsers");

    Ok(())
  }
}

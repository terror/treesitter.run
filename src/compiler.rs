use super::*;

#[derive(Debug)]
pub(crate) struct Compiler {
  manifest: Manifest,
  reporter: Reporter,
  workspace: Workspace,
}

impl Compiler {
  fn build_parser(&self, parser: &Parser, source: &Path) -> Result {
    let output = self.workspace.parser_wasm(parser);

    self.reporter.start_step("build", &parser.name);

    Command::new(self.workspace.tree_sitter_bin())
      .arg("build")
      .arg("--wasm")
      .arg("--output")
      .arg(&output)
      .arg(source)
      .run()?;

    self
      .reporter
      .finish_step("built", &self.workspace.display_path(output.as_path()));

    Ok(())
  }

  fn build_parsers(&self, parser_indices: &[usize]) -> Result {
    let checkout_directory =
      Builder::new().prefix("treesitter-run-parsers-").tempdir()?;

    for index in parser_indices {
      let parser = &self.manifest.parsers[*index];

      self.reporter.start_step("fetch", &parser.name);

      self.build_parser(
        parser,
        &Self::prepare_parser(parser, checkout_directory.path())?,
      )?;
    }

    Ok(())
  }

  pub(crate) fn check(&self, parser: Option<&str>) -> Result {
    let parser_indices = self.parser_indices(parser)?;

    self.reporter.reset(u64::try_from(parser_indices.len())?);

    for index in parser_indices {
      let parser = &self.manifest.parsers[index];

      self.reporter.start_step("verify", &parser.name);

      Command::new("bun")
        .arg("--eval")
        .arg(VERIFY_SCRIPT)
        .current_dir(self.workspace.www_dir())
        .env("TREE_SITTER_PUBLIC_DIR", self.workspace.public_dir())
        .env("TREE_SITTER_PARSERS", &parser.name)
        .run()?;

      self.reporter.finish_step("verified", &parser.name);
    }

    self.reporter.done();

    Ok(())
  }

  pub(crate) fn compile(&self, parser: Option<&str>) -> Result {
    let parser_indices = self.parser_indices(parser)?;

    self
      .reporter
      .reset(1 + u64::try_from(parser_indices.len())?);

    self.copy_runtime()?;

    self.build_parsers(&parser_indices)?;

    self.reporter.done();

    Ok(())
  }

  fn copy_runtime(&self) -> Result {
    let output = self.workspace.runtime_wasm();

    let output_display = self.workspace.display_path(output.as_path());

    self.reporter.start_step("copy", &output_display);

    fs::create_dir_all(self.workspace.public_dir())?;
    fs::copy(self.workspace.bundled_runtime_wasm(), output)?;

    self.reporter.finish_step("copied", &output_display);

    Ok(())
  }

  fn latest_revision(parser: &Parser) -> Result<String> {
    Self::parse_latest_revision(&String::from_utf8(
      Command::new("git")
        .arg("ls-remote")
        .arg("--exit-code")
        .arg(&parser.repository)
        .arg("HEAD")
        .run()?
        .stdout,
    )?)
    .with_context(|| {
      format!("failed to resolve latest revision for {}", parser.name)
    })
  }

  pub(crate) fn new() -> Result<Self> {
    let workspace = Workspace::current()?;

    Ok(Self {
      manifest: Manifest::load(&workspace.manifest_path())?,
      reporter: Reporter::new()?,
      workspace,
    })
  }

  fn parse_latest_revision(output: &str) -> Result<String> {
    let line = output
      .lines()
      .find(|line| !line.trim().is_empty())
      .context("git ls-remote returned no HEAD")?;

    let mut fields = line.split_whitespace();

    let revision = fields
      .next()
      .context("git ls-remote HEAD output did not contain a revision")?;

    let reference = fields
      .next()
      .context("git ls-remote HEAD output did not contain a reference")?;

    ensure!(
      reference == "HEAD",
      "git ls-remote HEAD resolved {reference}, expected HEAD"
    );

    Ok(revision.to_string())
  }

  fn parser_indices(&self, parser: Option<&str>) -> Result<Vec<usize>> {
    if let Some(parser) = parser {
      Ok(vec![
        self
          .manifest
          .parsers
          .iter()
          .position(|config| config.name == parser)
          .with_context(|| format!("unknown parser `{parser}`"))?,
      ])
    } else {
      Ok((0..self.manifest.parsers.len()).collect::<Vec<_>>())
    }
  }

  fn prepare_parser(
    parser: &Parser,
    checkout_directory: &Path,
  ) -> Result<PathBuf> {
    let directory = checkout_directory.join(&parser.name);

    Command::new("git")
      .arg("clone")
      .arg("--filter=blob:none")
      .arg("--no-checkout")
      .arg(&parser.repository)
      .arg(&directory)
      .run()?;

    Command::new("git")
      .arg("-C")
      .arg(&directory)
      .arg("fetch")
      .arg("--depth")
      .arg("1")
      .arg("origin")
      .arg(&parser.revision)
      .run()?;

    Command::new("git")
      .arg("-C")
      .arg(&directory)
      .arg("checkout")
      .arg("--detach")
      .arg(&parser.revision)
      .run()?;

    let revision = String::from_utf8(
      Command::new("git")
        .arg("-C")
        .arg(&directory)
        .arg("rev-parse")
        .arg("HEAD")
        .run()?
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

  pub(crate) fn update(&mut self, parser: Option<&str>) -> Result {
    let parser_indices = self.parser_indices(parser)?;

    self.reporter.reset(u64::try_from(parser_indices.len())?);

    for index in parser_indices {
      let parser = &self.manifest.parsers[index];

      self.reporter.start_step("update", &parser.name);

      let revision = Self::latest_revision(parser)?;

      self.reporter.finish_step(
        "updated",
        &format!(
          "{} {}",
          parser.name,
          revision.chars().take(12).collect::<String>()
        ),
      );

      self.manifest.parsers[index].revision = revision;
    }

    self
      .manifest
      .save(self.workspace.manifest_path().as_path())?;

    self.reporter.done();

    Ok(())
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn parse_latest_revision() {
    assert_eq!(
      Compiler::parse_latest_revision("foo\tHEAD\n").unwrap(),
      "foo"
    );
  }

  #[test]
  fn parser_indices() {
    let compiler = Compiler {
      manifest: Manifest {
        parsers: vec![
          Parser {
            name: String::from("foo"),
            path: None,
            repository: String::from("bar"),
            revision: String::from("baz"),
          },
          Parser {
            name: String::from("bar"),
            path: None,
            repository: String::from("baz"),
            revision: String::from("foo"),
          },
        ],
      },
      reporter: Reporter::new().unwrap(),
      workspace: Workspace::new(PathBuf::from("bar")),
    };

    assert_eq!(compiler.parser_indices(None).unwrap(), vec![0, 1]);
    assert_eq!(compiler.parser_indices(Some("bar")).unwrap(), vec![1]);

    let error = compiler
      .parser_indices(Some("baz"))
      .unwrap_err()
      .to_string();

    assert_eq!(error, "unknown parser `baz`",);
  }
}

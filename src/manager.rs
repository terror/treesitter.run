use super::*;

#[derive(Debug)]
pub(crate) struct Manager {
  manifest: Manifest,
  reporter: Reporter,
  workspace: Workspace,
}

impl Manager {
  pub(crate) fn add_parser(&mut self, mut parser: Parser) -> Result {
    ensure!(
      !self
        .manifest
        .parsers
        .iter()
        .any(|existing| existing.name == parser.name),
      "parser `{}` already exists",
      parser.name
    );

    self.reporter.reset(2);
    self.reporter.start_step("resolve", &parser.name);

    parser.revision = parser.latest_revision()?;

    self.reporter.finish_step(
      "resolved",
      &format!(
        "{} {}",
        parser.name,
        parser.revision.chars().take(12).collect::<String>()
      ),
    );

    let name = parser.name.clone();

    self.manifest.parsers.push(parser);
    self.manifest.parsers.sort_by(|a, b| a.name.cmp(&b.name));

    self.compile_parser(Some(vec![name.as_str()]))?;

    self
      .manifest
      .save(self.workspace.manifest_path().as_path())?;

    Ok(())
  }

  pub(crate) fn check_parsers(&self, parsers: Option<Vec<&str>>) -> Result {
    let parsers = self.parsers(parsers)?;

    self.reporter.reset(u64::try_from(parsers.len())?);

    for parser in parsers {
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

  pub(crate) fn compile_parser(&self, parsers: Option<Vec<&str>>) -> Result {
    let parsers = self.parsers(parsers)?;

    self.reporter.reset(u64::try_from(parsers.len())?);

    for parser in parsers {
      let checkout_directory =
        Builder::new().prefix("treesitter-run-parsers-").tempdir()?;

      self.reporter.start_step("fetch", &parser.name);

      let source = parser.checkout(checkout_directory.path())?;

      self.reporter.start_step("build", &parser.name);

      let output = self.workspace.parser_wasm(&parser);

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
    }

    self.reporter.done();

    Ok(())
  }

  pub(crate) fn copy_runtime(&self) -> Result {
    self.reporter.reset(1);

    let output = self.workspace.runtime_wasm();

    let output_display = self.workspace.display_path(output.as_path());

    self.reporter.start_step("copy", &output_display);

    fs::create_dir_all(self.workspace.public_dir())?;
    fs::copy(self.workspace.bundled_runtime_wasm(), output)?;

    self.reporter.finish_step("copied", &output_display);
    self.reporter.done();

    Ok(())
  }

  pub(crate) fn new() -> Result<Self> {
    let workspace = Workspace::current()?;

    Ok(Self {
      manifest: Manifest::load(&workspace.manifest_path())?,
      reporter: Reporter::new()?,
      workspace,
    })
  }

  fn parsers(&self, parsers: Option<Vec<&str>>) -> Result<Vec<Parser>> {
    match parsers {
      Some(parsers) => parsers
        .into_iter()
        .map(|parser| {
          self
            .manifest
            .parsers
            .iter()
            .find(|config| config.name == parser)
            .cloned()
            .with_context(|| format!("unknown parser `{parser}`"))
        })
        .collect(),
      None => Ok(self.manifest.parsers.clone()),
    }
  }

  pub(crate) fn update_parser(&mut self, parsers: Option<Vec<&str>>) -> Result {
    let parsers = self.parsers(parsers)?;

    self.reporter.reset(u64::try_from(parsers.len())?);

    for parser in parsers {
      self.reporter.start_step("update", &parser.name);

      let revision = parser.latest_revision()?;

      self.reporter.finish_step(
        "updated",
        &format!(
          "{} {}",
          parser.name,
          revision.chars().take(12).collect::<String>()
        ),
      );

      self
        .manifest
        .parsers
        .iter_mut()
        .find(|existing| existing.name == parser.name)
        .with_context(|| format!("unknown parser `{}`", parser.name))?
        .revision = revision;
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
  fn parsers() {
    let manager = Manager {
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

    assert_eq!(
      manager.parsers(None).unwrap(),
      vec![
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
    );
    assert_eq!(
      manager.parsers(Some(vec!["bar"])).unwrap(),
      vec![Parser {
        name: String::from("bar"),
        path: None,
        repository: String::from("baz"),
        revision: String::from("foo"),
      }],
    );

    let error = manager.parsers(Some(vec!["baz"])).unwrap_err().to_string();

    assert_eq!(error, "unknown parser `baz`",);
  }
}

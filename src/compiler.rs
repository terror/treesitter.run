use super::*;

#[derive(Debug)]
pub(crate) struct Compiler {
  pub(crate) manifest: Manifest,
  pub(crate) manifest_path: PathBuf,
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
      .root
      .join("www")
      .join("public")
      .join(format!("tree-sitter-{}.wasm", parser.name));

    Self::start_step(progress, "build", &parser.name);

    let tree_sitter = self
      .root
      .join("www")
      .join("node_modules")
      .join(".bin")
      .join(if cfg!(windows) {
        "tree-sitter.cmd"
      } else {
        "tree-sitter"
      });

    Command::new(tree_sitter)
      .arg("build")
      .arg("--wasm")
      .arg("--output")
      .arg(&output)
      .arg(source)
      .run()?;

    Self::finish_step(progress, "built", &self.display_path(&output));

    Ok(())
  }

  fn build_parsers(
    &self,
    progress: &ProgressBar,
    parser_indices: &[usize],
  ) -> Result {
    let checkout_directory =
      Builder::new().prefix("treesitter-run-parsers-").tempdir()?;

    for index in parser_indices {
      let parser = &self.manifest.parsers[*index];

      Self::start_step(progress, "fetch", &parser.name);

      let source = Self::prepare_parser(parser, checkout_directory.path())?;

      self.build_parser(parser, progress, &source)?;
      self.copy_highlights_query(parser, progress, &source)?;
    }

    Ok(())
  }

  pub(crate) fn check(&self, parser: Option<&str>) -> Result {
    let parser_indices = self.parser_indices(parser)?;

    let progress = Self::progress_bar(u64::try_from(parser_indices.len())?)?;

    self.verify_parsers(&progress, &parser_indices)?;

    progress.finish_with_message(
      style("done").for_stderr().green().bold().to_string(),
    );

    Ok(())
  }

  pub(crate) fn compile(&mut self, parser: Option<&str>) -> Result {
    let parser_indices = self.parser_indices(parser)?;

    let progress =
      Self::progress_bar(1 + 3 * u64::try_from(parser_indices.len())?)?;

    self.copy_runtime(&progress)?;

    self.update_parsers(&progress, &parser_indices)?;
    self.build_parsers(&progress, &parser_indices)?;

    progress.finish_with_message(
      style("done").for_stderr().green().bold().to_string(),
    );

    Ok(())
  }

  fn copy_highlights_query(
    &self,
    parser: &ParserConfig,
    progress: &ProgressBar,
    source: &Path,
  ) -> Result {
    let input = source.join("queries").join("highlights.scm");

    let output = self.highlight_query_path(parser);
    let output_display = self.display_path(output.as_path());

    Self::start_step(progress, "copy", &output_display);

    if input.try_exists()? {
      fs::create_dir_all(
        output.parent().context("query output has no parent")?,
      )?;
      fs::copy(input, &output)?;
      Self::finish_step(progress, "copied", &output_display);
    } else if output.try_exists()? {
      fs::remove_file(&output)?;
      Self::finish_step(progress, "removed", &output_display);
    } else {
      Self::finish_step(progress, "skipped", &output_display);
    }

    Ok(())
  }

  fn copy_runtime(&self, progress: &ProgressBar) -> Result {
    let output = self
      .root
      .join("www")
      .join("public")
      .join("tree-sitter.wasm");

    let output_display = self.display_path(output.as_path());

    Self::start_step(progress, "copy", &output_display);

    fs::create_dir_all(self.root.join("www").join("public"))?;

    fs::copy(
      self
        .root
        .join("www")
        .join("node_modules")
        .join("web-tree-sitter")
        .join("tree-sitter.wasm"),
      output,
    )?;

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

  fn highlight_query_path(&self, parser: &ParserConfig) -> PathBuf {
    self
      .root
      .join("www")
      .join("public")
      .join(format!("tree-sitter-{}.highlights.scm", parser.name))
  }

  fn latest_revision(parser: &ParserConfig) -> Result<String> {
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
    let root = env::current_dir()?;

    let manifest_path = root.join("manifest.json");

    Ok(Self {
      manifest: Manifest::load(&manifest_path)?,
      manifest_path: manifest_path.clone(),
      root,
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
    parser: &ParserConfig,
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

  fn progress_bar(len: u64) -> Result<ProgressBar> {
    let progress = ProgressBar::new(len);

    progress.set_style(
      ProgressStyle::with_template(
        "[{bar:32.cyan/blue}] {pos:>2}/{len:2} {msg}",
      )?
      .progress_chars("=>-"),
    );

    Ok(progress)
  }

  fn start_step(progress: &ProgressBar, status: &str, message: &str) {
    progress.set_message(format!(
      "{} {}",
      style(status).for_stderr().cyan().bold(),
      message
    ));
  }

  fn update_parsers(
    &mut self,
    progress: &ProgressBar,
    parser_indices: &[usize],
  ) -> Result {
    for index in parser_indices {
      let parser = &self.manifest.parsers[*index];

      Self::start_step(progress, "update", &parser.name);

      let revision = Self::latest_revision(parser)?;

      Self::finish_step(
        progress,
        "updated",
        &format!(
          "{} {}",
          parser.name,
          revision.chars().take(12).collect::<String>()
        ),
      );

      self.manifest.parsers[*index].revision = revision;
    }

    self.manifest.save(self.manifest_path.as_path())?;

    Ok(())
  }

  fn verify_parsers(
    &self,
    progress: &ProgressBar,
    parser_indices: &[usize],
  ) -> Result {
    for index in parser_indices {
      let parser = &self.manifest.parsers[*index];

      Self::start_step(progress, "verify", &parser.name);

      Command::new("bun")
        .arg("--eval")
        .arg(VERIFY_SCRIPT)
        .current_dir(self.root.join("www"))
        .env(
          "TREE_SITTER_PUBLIC_DIR",
          self.root.join("www").join("public"),
        )
        .env("TREE_SITTER_PARSERS", &parser.name)
        .run()?;

      Self::finish_step(progress, "verified", &parser.name);
    }

    Ok(())
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn parser_indices() {
    let compiler = Compiler {
      manifest: Manifest {
        parsers: vec![
          ParserConfig {
            name: String::from("foo"),
            path: None,
            repository: String::from("bar"),
            revision: String::from("baz"),
          },
          ParserConfig {
            name: String::from("bar"),
            path: None,
            repository: String::from("baz"),
            revision: String::from("foo"),
          },
        ],
      },
      manifest_path: PathBuf::from("foo"),
      root: PathBuf::from("bar"),
    };

    assert_eq!(compiler.parser_indices(None).unwrap(), vec![0, 1]);
    assert_eq!(compiler.parser_indices(Some("bar")).unwrap(), vec![1]);

    assert_eq!(
      compiler
        .parser_indices(Some("baz"))
        .unwrap_err()
        .to_string(),
      "unknown parser `baz`",
    );
  }

  #[test]
  fn parse_latest_revision() {
    assert_eq!(
      Compiler::parse_latest_revision("foo\tHEAD\n").unwrap(),
      "foo"
    );
  }

  #[test]
  fn copy_highlights_query() {
    let root = Builder::new()
      .prefix("treesitter-run-test-")
      .tempdir()
      .unwrap();

    let source = root.path().join("source");
    let query = source.join("queries").join("highlights.scm");

    fs::create_dir_all(query.parent().unwrap()).unwrap();
    fs::write(&query, "bar").unwrap();

    let compiler = Compiler {
      manifest: Manifest {
        parsers: vec![ParserConfig {
          name: String::from("foo"),
          path: None,
          repository: String::from("bar"),
          revision: String::from("baz"),
        }],
      },
      manifest_path: root.path().join("manifest.json"),
      root: root.path().to_path_buf(),
    };

    let parser = compiler.manifest.parsers.first().unwrap();
    let progress = ProgressBar::hidden();
    let output = compiler.highlight_query_path(parser);

    compiler
      .copy_highlights_query(parser, &progress, &source)
      .unwrap();

    assert_eq!(fs::read_to_string(&output).unwrap(), "bar");

    fs::remove_file(&query).unwrap();

    compiler
      .copy_highlights_query(parser, &progress, &source)
      .unwrap();

    assert!(!output.try_exists().unwrap());
  }
}

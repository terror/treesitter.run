use super::*;

#[derive(Debug, Deserialize, Eq, PartialEq)]
pub(crate) struct ParserConfig {
  pub(crate) name: String,
  pub(crate) path: Option<PathBuf>,
  pub(crate) repository: String,
  pub(crate) revision: String,
}

#[derive(Debug, Deserialize, Eq, PartialEq)]
pub(crate) struct Manifest {
  #[serde(rename = "parser")]
  pub(crate) parsers: Vec<ParserConfig>,
}

impl Manifest {
  pub(crate) fn load(path: &Path) -> Result<Self> {
    let manifest = toml::from_str::<Self>(&fs::read_to_string(path)?)?;

    ensure!(
      !manifest.parsers.is_empty(),
      "{} must contain at least one [[parser]] table",
      path.display()
    );

    Ok(manifest)
  }

  pub(crate) fn update_revisions(
    &mut self,
    path: &Path,
    revisions: &[String],
  ) -> Result {
    ensure!(
      self.parsers.len() == revisions.len(),
      "{} revisions provided for {} parsers",
      revisions.len(),
      self.parsers.len()
    );

    let mut document = fs::read_to_string(path)?.parse::<DocumentMut>()?;

    let parsers = document
      .get_mut("parser")
      .and_then(|item| item.as_array_of_tables_mut())
      .with_context(|| {
        format!("{} must contain [[parser]] tables", path.display())
      })?;

    ensure!(
      parsers.len() == revisions.len(),
      "{} contains {} [[parser]] tables but manifest has {} parsers",
      path.display(),
      parsers.len(),
      revisions.len()
    );

    for (parser, revision) in self.parsers.iter_mut().zip(revisions) {
      parser.revision.clone_from(revision);
    }

    for (parser, revision) in parsers.iter_mut().zip(revisions) {
      parser["revision"] = value(revision.as_str());
    }

    fs::write(path, document.to_string())?;

    Ok(())
  }
}

#[cfg(test)]
mod tests {
  use {super::*, indoc::indoc};

  #[test]
  fn update_revisions() {
    let tempdir = Builder::new()
      .prefix("treesitter-run-test-")
      .tempdir()
      .unwrap();

    let path = tempdir.path().join("manifest.toml");

    fs::write(
      &path,
      indoc! {r#"
        [[parser]]
        name = "foo"
        repository = "bar"
        revision = "baz"

        [[parser]]
        name = "qux"
        path = "foo"
        repository = "bar"
        revision = "baz"
      "#},
    )
    .unwrap();

    let mut manifest = Manifest::load(&path).unwrap();

    manifest
      .update_revisions(&path, &[String::from("foo"), String::from("bar")])
      .unwrap();

    assert_eq!(
      manifest,
      Manifest {
        parsers: vec![
          ParserConfig {
            name: String::from("foo"),
            path: None,
            repository: String::from("bar"),
            revision: String::from("foo"),
          },
          ParserConfig {
            name: String::from("qux"),
            path: Some(PathBuf::from("foo")),
            repository: String::from("bar"),
            revision: String::from("bar"),
          },
        ],
      }
    );

    assert_eq!(
      fs::read_to_string(path).unwrap(),
      indoc! {r#"
        [[parser]]
        name = "foo"
        repository = "bar"
        revision = "foo"

        [[parser]]
        name = "qux"
        path = "foo"
        repository = "bar"
        revision = "bar"
      "#}
    );
  }
}

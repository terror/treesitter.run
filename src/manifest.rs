use super::*;

#[derive(Debug, Deserialize, Eq, PartialEq, Serialize)]
pub(crate) struct ParserConfig {
  pub(crate) name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub(crate) path: Option<PathBuf>,
  pub(crate) repository: String,
  pub(crate) revision: String,
}

#[derive(Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(transparent)]
pub(crate) struct Manifest {
  pub(crate) parsers: Vec<ParserConfig>,
}

impl Manifest {
  pub(crate) fn load(path: &Path) -> Result<Self> {
    let manifest = serde_json::from_str::<Self>(&fs::read_to_string(path)?)?;

    ensure!(
      !manifest.parsers.is_empty(),
      "{} must contain at least one parser",
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

    for (parser, revision) in self.parsers.iter_mut().zip(revisions) {
      parser.revision.clone_from(revision);
    }

    fs::write(path, format!("{}\n", serde_json::to_string_pretty(self)?))?;

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

    let path = tempdir.path().join("manifest.json");

    fs::write(
      &path,
      indoc! {
        r#"
        [
          {
            "name": "foo",
            "repository": "bar",
            "revision": "baz"
          },
          {
            "name": "qux",
            "path": "foo",
            "repository": "bar",
            "revision": "baz"
          }
        ]
        "#
      },
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
      indoc! {
        r#"
        [
          {
            "name": "foo",
            "repository": "bar",
            "revision": "foo"
          },
          {
            "name": "qux",
            "path": "foo",
            "repository": "bar",
            "revision": "bar"
          }
        ]
        "#
      }
    );
  }
}

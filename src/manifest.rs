use super::*;

#[derive(Debug, Deserialize, Eq, PartialEq, Serialize)]
#[serde(transparent)]
pub(crate) struct Manifest {
  pub(crate) parsers: Vec<Parser>,
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

  pub(crate) fn save(&self, path: &Path) -> Result {
    fs::write(path, format!("{}\n", serde_json::to_string_pretty(self)?))
      .map_err(Into::into)
  }
}

#[cfg(test)]
mod tests {
  use {super::*, indoc::indoc};

  #[test]
  fn save() {
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

    manifest.parsers[0].revision = String::from("foo");
    manifest.parsers[1].revision = String::from("bar");

    manifest.save(&path).unwrap();

    assert_eq!(
      manifest,
      Manifest {
        parsers: vec![
          Parser {
            name: String::from("foo"),
            path: None,
            repository: String::from("bar"),
            revision: String::from("foo"),
          },
          Parser {
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

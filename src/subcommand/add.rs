use super::*;

#[derive(Clap, Debug)]
pub(crate) struct Add {
  #[arg(long)]
  pub(crate) name: String,
  #[arg(long)]
  pub(crate) path: Option<PathBuf>,
  #[arg(long)]
  pub(crate) repository: String,
}

impl Add {
  fn repository(&self) -> Result<String> {
    let mut components = self.repository.split('/');

    let owner = components
      .next()
      .context("repository must be of the form `owner/repo`")?;

    let repository = components
      .next()
      .context("repository must be of the form `owner/repo`")?;

    ensure!(
      components.next().is_none()
        && !owner.is_empty()
        && !repository.is_empty(),
      "repository must be of the form `owner/repo`"
    );

    Ok(format!("https://github.com/{owner}/{repository}"))
  }

  pub(crate) fn run(self) -> Result {
    let repository = self.repository()?;

    Compiler::new()?.add(Parser {
      name: self.name,
      path: self.path,
      repository,
      revision: String::new(),
    })
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn repository() {
    let add = Add {
      name: "foo".to_string(),
      path: None,
      repository: "foo/bar".to_string(),
    };

    assert_eq!(add.repository().unwrap(), "https://github.com/foo/bar");
  }

  #[test]
  fn repository_requires_owner_and_repo() {
    #[track_caller]
    fn case(repository: &str) {
      let add = Add {
        name: "foo".to_string(),
        path: None,
        repository: repository.to_string(),
      };

      assert_eq!(
        add.repository().unwrap_err().to_string(),
        "repository must be of the form `owner/repo`",
      );
    }

    case("foo");
    case("foo/bar/baz");
    case("/foo");
    case("foo/");
  }
}

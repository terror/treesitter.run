use super::*;

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub(crate) struct Parser {
  pub(crate) name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub(crate) path: Option<PathBuf>,
  pub(crate) repository: String,
  pub(crate) revision: String,
}

impl Parser {
  pub(crate) fn checkout(&self, checkout_directory: &Path) -> Result<PathBuf> {
    let directory = checkout_directory.join(&self.name);

    Command::new("git")
      .arg("clone")
      .arg("--filter=blob:none")
      .arg("--no-checkout")
      .arg(&self.repository)
      .arg(&directory)
      .run()?;

    Command::new("git")
      .arg("-C")
      .arg(&directory)
      .arg("fetch")
      .arg("--depth")
      .arg("1")
      .arg("origin")
      .arg(&self.revision)
      .run()?;

    Command::new("git")
      .arg("-C")
      .arg(&directory)
      .arg("checkout")
      .arg("--detach")
      .arg(&self.revision)
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

    if revision.trim() != self.revision {
      bail!(
        "{} checked out {}, expected {}",
        self.name,
        revision.trim(),
        self.revision
      );
    }

    let source = if let Some(path) = &self.path {
      directory.join(path)
    } else {
      directory
    };

    Ok(source)
  }

  pub(crate) fn latest_revision(&self) -> Result<String> {
    let output = String::from_utf8(
      Command::new("git")
        .arg("ls-remote")
        .arg("--exit-code")
        .arg(&self.repository)
        .arg("HEAD")
        .run()?
        .stdout,
    )?;

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
}

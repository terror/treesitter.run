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
  pub(crate) fn run(self, manager: &mut Manager) -> Result {
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

    manager.add_parser(Parser {
      name: self.name,
      path: self.path,
      repository: format!("https://github.com/{owner}/{repository}"),
      revision: String::new(),
    })
  }
}

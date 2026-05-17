use super::*;

/// Add a parser from GitHub to the manifest.
#[derive(Clap, Debug)]
pub(crate) struct Add {
  /// Parser name used in the manifest and generated WASM filename.
  #[arg(long)]
  pub(crate) name: String,
  /// Subdirectory containing the grammar when it is not at the repository root.
  #[arg(long)]
  pub(crate) path: Option<PathBuf>,
  /// GitHub repository to add, written as `owner/repo`.
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

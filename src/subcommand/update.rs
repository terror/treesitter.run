use super::*;

/// Update parser revisions in the manifest.
#[derive(Clap, Debug)]
pub(crate) struct Update {
  /// Parser names to update; when omitted, every parser in the manifest is updated.
  #[arg(long, num_args = 1..)]
  pub(crate) parsers: Option<Vec<String>>,
}

impl Update {
  pub(crate) fn run(self, manager: &mut Manager) -> Result {
    manager.update_parser(
      self
        .parsers
        .as_ref()
        .map(|parsers| parsers.iter().map(String::as_str).collect()),
    )
  }
}

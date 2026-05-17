use super::*;

/// Verify bundled parser WASM files.
#[derive(Clap, Debug)]
pub(crate) struct Check {
  /// Parser names to verify; when omitted, all parsers in the manifest are checked.
  #[arg(long, num_args = 1..)]
  pub(crate) parsers: Option<Vec<String>>,
}

impl Check {
  pub(crate) fn run(self, manager: &mut Manager) -> Result {
    manager.check_parsers(
      self
        .parsers
        .as_ref()
        .map(|parsers| parsers.iter().map(String::as_str).collect()),
    )
  }
}

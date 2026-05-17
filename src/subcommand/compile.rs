use super::*;

/// Build parser WASM files.
#[derive(Clap, Debug)]
pub(crate) struct Compile {
  /// Parser names to build; when omitted, every parser in the manifest is built.
  #[arg(long, num_args = 1..)]
  pub(crate) parsers: Option<Vec<String>>,
}

impl Compile {
  pub(crate) fn run(self, manager: &mut Manager) -> Result {
    manager.copy_runtime()?;

    manager.compile_parsers(
      self
        .parsers
        .as_ref()
        .map(|parsers| parsers.iter().map(String::as_str).collect()),
    )
  }
}

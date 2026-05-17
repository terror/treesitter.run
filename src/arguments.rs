use super::*;

/// Manage the tree-sitter parsers bundled by treesitter.run.
#[derive(Clap, Debug)]
#[command(version)]
pub(crate) struct Arguments {
  /// Command to run.
  #[clap(subcommand)]
  subcommand: Subcommand,
}

impl Arguments {
  pub(crate) fn run(self) -> Result {
    self.subcommand.run()
  }
}

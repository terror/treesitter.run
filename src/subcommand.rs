use super::*;

mod check;
mod compile;

#[derive(Debug, Parser)]
pub(crate) enum Subcommand {
  /// Check compiled parsers.
  #[command(display_order = 1)]
  Check(check::Check),
  /// Compile parsers.
  #[command(display_order = 0)]
  Compile(compile::Compile),
}

impl Subcommand {
  pub(crate) fn run(self) -> Result {
    match self {
      Self::Check(check) => check.run(),
      Self::Compile(compile) => compile.run(),
    }
  }
}

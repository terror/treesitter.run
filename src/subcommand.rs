use {super::*, check::Check, compile::Compile};

mod check;
mod compile;

#[derive(Debug, Parser)]
pub(crate) enum Subcommand {
  Check(Check),
  Compile(Compile),
}

impl Subcommand {
  pub(crate) fn run(self) -> Result {
    match self {
      Self::Check(check) => check.run(),
      Self::Compile(compile) => compile.run(),
    }
  }
}

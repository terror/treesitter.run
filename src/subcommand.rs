use {super::*, check::Check, compile::Compile, update::Update};

mod check;
mod compile;
mod update;

#[derive(Debug, Parser)]
pub(crate) enum Subcommand {
  Check(Check),
  Compile(Compile),
  Update(Update),
}

impl Subcommand {
  pub(crate) fn run(self) -> Result {
    match self {
      Self::Check(check) => check.run(),
      Self::Compile(compile) => compile.run(),
      Self::Update(update) => update.run(),
    }
  }
}

use {super::*, add::Add, check::Check, compile::Compile, update::Update};

mod add;
mod check;
mod compile;
mod update;

#[derive(Clap, Debug)]
pub(crate) enum Subcommand {
  Add(Add),
  Check(Check),
  Compile(Compile),
  Update(Update),
}

impl Subcommand {
  pub(crate) fn run(self) -> Result {
    match self {
      Self::Add(add) => add.run(),
      Self::Check(check) => check.run(),
      Self::Compile(compile) => compile.run(),
      Self::Update(update) => update.run(),
    }
  }
}

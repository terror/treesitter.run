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
    let mut manager = Manager::new()?;

    match self {
      Self::Add(add) => add.run(&mut manager),
      Self::Check(check) => check.run(&mut manager),
      Self::Compile(compile) => compile.run(&mut manager),
      Self::Update(update) => update.run(&mut manager),
    }
  }
}

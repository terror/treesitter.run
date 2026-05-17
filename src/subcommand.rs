use {super::*, add::Add, check::Check, compile::Compile, update::Update};

mod add;
mod check;
mod compile;
mod update;

#[derive(Clap, Debug)]
pub(crate) enum Subcommand {
  /// Add a parser from a GitHub repository to the manifest and build it.
  Add(Add),
  /// Verify that bundled parser WASM files load and parse successfully.
  Check(Check),
  /// Build parser WASM files into the web app's public asset directory.
  Compile(Compile),
  /// Refresh parser revisions in the manifest from their upstream repositories.
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

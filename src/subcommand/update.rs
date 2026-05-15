use super::*;

#[derive(Debug, Parser)]
pub(crate) struct Update {
  #[arg(long)]
  pub(crate) parser: Option<String>,
}

impl Update {
  pub(crate) fn run(self) -> Result {
    Compiler::new()?.update(self.parser.as_deref())
  }
}

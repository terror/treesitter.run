use super::*;

#[derive(Debug, Parser)]
pub(crate) struct Check {
  #[arg(long)]
  pub(crate) parser: Option<String>,
}

impl Check {
  pub(crate) fn run(self) -> Result {
    Compiler::new()?.check(self.parser.as_deref())
  }
}

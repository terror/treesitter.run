use super::*;

#[derive(Debug, Parser)]
pub(crate) struct Compile {
  #[arg(long)]
  pub(crate) parser: Option<String>,
}

impl Compile {
  pub(crate) fn run(self) -> Result {
    Compiler::new()?.compile(self.parser.as_deref())
  }
}

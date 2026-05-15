use super::*;

#[derive(Debug, Parser)]
#[command(version)]
pub(crate) struct Arguments {
  #[clap(subcommand)]
  subcommand: Subcommand,
}

impl Arguments {
  pub(crate) fn run(self) -> Result {
    self.subcommand.run()
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn parsing() {
    let arguments =
      Arguments::try_parse_from(["treesitter-run", "compile"]).unwrap();

    match arguments.subcommand {
      Subcommand::Check(_) => unreachable!(),
      Subcommand::Compile(compile) => assert_eq!(compile.parser, None),
    }

    let arguments = Arguments::try_parse_from([
      "treesitter-run",
      "compile",
      "--parser",
      "foo",
    ])
    .unwrap();

    match arguments.subcommand {
      Subcommand::Check(_) => unreachable!(),
      Subcommand::Compile(compile) => {
        assert_eq!(compile.parser, Some(String::from("foo")));
      }
    }

    let arguments =
      Arguments::try_parse_from(["treesitter-run", "check"]).unwrap();

    match arguments.subcommand {
      Subcommand::Check(check) => assert_eq!(check.parser, None),
      Subcommand::Compile(_) => unreachable!(),
    }

    let arguments =
      Arguments::try_parse_from(["treesitter-run", "check", "--parser", "foo"])
        .unwrap();

    match arguments.subcommand {
      Subcommand::Check(check) => {
        assert_eq!(check.parser, Some(String::from("foo")));
      }
      Subcommand::Compile(_) => unreachable!(),
    }
  }
}

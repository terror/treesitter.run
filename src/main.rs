use {
  anyhow::{Context, bail, ensure},
  arguments::Arguments,
  clap::Parser,
  compiler::Compiler,
  console::style,
  indicatif::{ProgressBar, ProgressStyle},
  manifest::{Manifest, ParserConfig},
  serde::Deserialize,
  std::{
    env, fs, iter,
    path::{Path, PathBuf},
    process::Command,
  },
  tempfile::Builder,
};

mod arguments;
mod compiler;
mod manifest;

const VERIFY_SCRIPT: &str = include_str!("verify.js");

type Result<T = (), E = anyhow::Error> = std::result::Result<T, E>;

struct PreparedCommand<'a> {
  command: &'a mut Command,
  display: String,
}

impl<'a> PreparedCommand<'a> {
  fn new(command: &'a mut Command) -> Self {
    let display = iter::once(command.get_program())
      .chain(command.get_args())
      .map(|argument| argument.to_string_lossy())
      .collect::<Vec<_>>()
      .join(" ");

    Self { command, display }
  }
}

fn repository_name(repository: &str) -> Result<String> {
  let repository = repository.trim_end_matches('/');

  let name = repository
    .rsplit('/')
    .next()
    .filter(|name| !name.is_empty())
    .context("repository URL does not contain a name")?;

  Ok(name.strip_suffix(".git").unwrap_or(name).to_string())
}

fn output(command: &mut Command) -> Result<std::process::Output> {
  let command = PreparedCommand::new(command);

  let output = command.command.output()?;

  if !output.status.success() {
    let mut message =
      format!("{} exited with {}", command.display, output.status);

    for (label, output) in [
      ("stdout", output.stdout.as_slice()),
      ("stderr", output.stderr.as_slice()),
    ] {
      let output = String::from_utf8_lossy(output);
      let output = output.trim();

      if !output.is_empty() {
        message.push_str("\n\n");
        message.push_str(label);
        message.push_str(":\n");
        message.push_str(output);
      }
    }

    bail!("{message}");
  }

  Ok(output)
}

fn run(command: &mut Command) -> Result {
  output(command)?;

  Ok(())
}

fn read(command: &mut Command) -> Result<String> {
  Ok(String::from_utf8(output(command)?.stdout)?)
}

fn main() -> Result {
  let options = Arguments::parse();

  let root = env::current_dir()?;

  let compiler = Compiler {
    manifest: Manifest::load(&root.join(&options.manifest))?,
    options,
    root,
  };

  compiler.run()
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn repository_names() {
    #[track_caller]
    fn case(repository: &str, expected: &str) {
      assert_eq!(repository_name(repository).unwrap(), expected);
    }

    case("https://example.com/foo/bar", "bar");
    case("https://example.com/foo/bar.git", "bar");
    case("https://example.com/foo/bar/", "bar");
  }
}

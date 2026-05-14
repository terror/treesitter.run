use {
  anyhow::{Context, bail, ensure},
  arguments::Arguments,
  clap::Parser,
  compiler::Compiler,
  console::style,
  indicatif::{ProgressBar, ProgressStyle},
  manifest::{Manifest, ParserConfig},
  serde::{Deserialize, Serialize},
  std::{
    env, fs, iter,
    path::{Path, PathBuf},
    process::{Command, Output},
  },
  tempfile::Builder,
};

mod arguments;
mod compiler;
mod manifest;

const VERIFY_SCRIPT: &str = include_str!("verify.js");

type Result<T = (), E = anyhow::Error> = std::result::Result<T, E>;

fn run(command: &mut Command) -> Result<Output> {
  let display = iter::once(command.get_program())
    .chain(command.get_args())
    .map(|argument| argument.to_string_lossy())
    .collect::<Vec<_>>()
    .join(" ");

  let output = command.output()?;

  if !output.status.success() {
    let mut message = format!("{} exited with {}", display, output.status);

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

fn main() -> Result {
  let options = Arguments::parse();

  let root = env::current_dir()?;

  let mut compiler = Compiler {
    manifest: Manifest::load(&root.join(&options.manifest))?,
    options,
    root,
  };

  compiler.run()
}

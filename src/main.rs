use {
  anyhow::{Context, bail, ensure},
  arguments::Arguments,
  clap::Parser,
  compiler::Compiler,
  console::style,
  indicatif::{ProgressBar, ProgressStyle},
  manifest::{Manifest, ParserConfig},
  runnable::Runnable,
  serde::{Deserialize, Serialize},
  std::{
    env, fs,
    io::{self, IsTerminal},
    iter,
    path::{Path, PathBuf},
    process::{Command, ExitCode, Output},
  },
  tempfile::Builder,
};

mod arguments;
mod compiler;
mod manifest;
mod runnable;

const VERIFY_SCRIPT: &str = include_str!("verify.js");

type Result<T = (), E = anyhow::Error> = std::result::Result<T, E>;

fn main() -> ExitCode {
  if let Err(error) = run() {
    if io::stderr().is_terminal() {
      eprintln!("\x1b[1;31merror\x1b[0m: \x1b[1m{error}\x1b[0m");
    } else {
      eprintln!("error: {error}");
    }

    let causes = error.chain().skip(1).count();

    for (i, source) in error.chain().skip(1).enumerate() {
      eprintln!(
        "       {}─ {source}",
        if i < causes - 1 { '├' } else { '└' }
      );
    }

    ExitCode::FAILURE
  } else {
    ExitCode::SUCCESS
  }
}

fn run() -> Result {
  let options = Arguments::parse();

  let root = env::current_dir()?;

  let mut compiler = Compiler {
    manifest: Manifest::load(&root.join(&options.manifest))?,
    options,
    root,
  };

  compiler.run()
}

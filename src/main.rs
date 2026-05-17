use {
  anyhow::{Context, bail, ensure},
  arguments::Arguments,
  clap::{
    Parser as Clap,
    builder::styling::{AnsiColor, Effects, Styles},
  },
  console::style,
  manager::Manager,
  manifest::Manifest,
  parser::Parser,
  reporter::Reporter,
  runnable::Runnable,
  serde::{Deserialize, Serialize},
  std::{
    env,
    fmt::Write,
    fs,
    io::{self, IsTerminal},
    iter,
    path::{Path, PathBuf},
    process::{Command, ExitCode, Output},
  },
  subcommand::Subcommand,
  tempfile::Builder,
  workspace::Workspace,
};

mod arguments;
mod manager;
mod manifest;
mod parser;
mod reporter;
mod runnable;
mod subcommand;
mod workspace;

const VERIFY_SCRIPT: &str = include_str!("verify.js");

type Result<T = (), E = anyhow::Error> = std::result::Result<T, E>;

fn main() -> ExitCode {
  if let Err(error) = Arguments::parse().run() {
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

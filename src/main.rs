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
    env, fs, iter,
    path::{Path, PathBuf},
    process::{Command, Output},
  },
  tempfile::Builder,
};

mod arguments;
mod compiler;
mod manifest;
mod runnable;

const VERIFY_SCRIPT: &str = include_str!("verify.js");

type Result<T = (), E = anyhow::Error> = std::result::Result<T, E>;

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

use super::*;

#[derive(Debug, Parser)]
#[command(name = "compiler")]
pub(crate) struct Arguments {
  #[arg(long, default_value = "manifest.toml")]
  pub(crate) manifest: PathBuf,
  #[arg(long, default_value = "public")]
  pub(crate) public_directory: PathBuf,
  #[arg(long)]
  pub(crate) runtime_wasm: Option<PathBuf>,
  #[arg(long)]
  pub(crate) skip_verify: bool,
  #[arg(long)]
  pub(crate) tree_sitter: Option<PathBuf>,
  #[arg(long)]
  pub(crate) verify_only: bool,
}

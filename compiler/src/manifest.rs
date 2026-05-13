use super::*;

#[derive(Debug, Deserialize)]
pub(crate) struct ParserConfig {
  pub(crate) name: String,
  pub(crate) path: Option<PathBuf>,
  pub(crate) repository: String,
  pub(crate) revision: String,
}

#[derive(Debug, Deserialize)]
pub(crate) struct Manifest {
  #[serde(rename = "parser")]
  pub(crate) parsers: Vec<ParserConfig>,
}

impl Manifest {
  pub(crate) fn load(path: &Path) -> Result<Self> {
    let manifest = toml::from_str::<Self>(&fs::read_to_string(path)?)?;

    ensure!(
      !manifest.parsers.is_empty(),
      "{} must contain at least one [[parser]] table",
      path.display()
    );

    Ok(manifest)
  }
}

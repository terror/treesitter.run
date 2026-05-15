use super::*;

#[derive(Debug, Deserialize, Eq, PartialEq, Serialize)]
pub(crate) struct Parser {
  pub(crate) name: String,
  #[serde(skip_serializing_if = "Option::is_none")]
  pub(crate) path: Option<PathBuf>,
  pub(crate) repository: String,
  pub(crate) revision: String,
}

use super::*;

#[derive(Debug)]
pub(crate) struct Workspace {
  root: PathBuf,
}

impl Workspace {
  pub(crate) fn bundled_runtime_wasm(&self) -> PathBuf {
    self
      .www_dir()
      .join("node_modules")
      .join("web-tree-sitter")
      .join("tree-sitter.wasm")
  }

  pub(crate) fn current() -> Result<Self> {
    Ok(Self::new(env::current_dir()?))
  }

  pub(crate) fn display_path(&self, path: &Path) -> String {
    path
      .strip_prefix(&self.root)
      .unwrap_or(path)
      .display()
      .to_string()
  }

  pub(crate) fn manifest_path(&self) -> PathBuf {
    self.root.join("manifest.json")
  }

  pub(crate) fn new(root: PathBuf) -> Self {
    Self { root }
  }

  pub(crate) fn parser_wasm(&self, parser: &ParserConfig) -> PathBuf {
    self
      .public_dir()
      .join(format!("tree-sitter-{}.wasm", parser.name))
  }

  pub(crate) fn public_dir(&self) -> PathBuf {
    self.www_dir().join("public")
  }

  pub(crate) fn runtime_wasm(&self) -> PathBuf {
    self.public_dir().join("tree-sitter.wasm")
  }

  pub(crate) fn tree_sitter_bin(&self) -> PathBuf {
    self
      .www_dir()
      .join("node_modules")
      .join(".bin")
      .join(if cfg!(windows) {
        "tree-sitter.cmd"
      } else {
        "tree-sitter"
      })
  }

  pub(crate) fn www_dir(&self) -> PathBuf {
    self.root.join("www")
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn path_resolution() {
    let root = PathBuf::from("foo");

    let workspace = Workspace::new(root.clone());

    let parser = ParserConfig {
      name: String::from("bar"),
      path: None,
      repository: String::from("baz"),
      revision: String::from("qux"),
    };

    let tree_sitter = if cfg!(windows) {
      "tree-sitter.cmd"
    } else {
      "tree-sitter"
    };

    assert_eq!(
      workspace.bundled_runtime_wasm(),
      root
        .join("www")
        .join("node_modules")
        .join("web-tree-sitter")
        .join("tree-sitter.wasm"),
    );

    assert_eq!(workspace.manifest_path(), root.join("manifest.json"));

    assert_eq!(
      workspace.parser_wasm(&parser),
      root.join("www").join("public").join("tree-sitter-bar.wasm"),
    );

    assert_eq!(workspace.public_dir(), root.join("www").join("public"));

    assert_eq!(
      workspace.runtime_wasm(),
      root.join("www").join("public").join("tree-sitter.wasm"),
    );

    assert_eq!(
      workspace.tree_sitter_bin(),
      root
        .join("www")
        .join("node_modules")
        .join(".bin")
        .join(tree_sitter),
    );

    assert_eq!(workspace.www_dir(), root.join("www"));
  }
}

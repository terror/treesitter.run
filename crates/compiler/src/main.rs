use std::{
    env, fs,
    path::{Path, PathBuf},
    process::Command,
};

use anyhow::{Context, Result, bail};
use clap::Parser;
use serde::Deserialize;
use tempfile::Builder;

const VERIFY_SCRIPT: &str = r"
import path from 'node:path';
import { Parser, Language, LANGUAGE_VERSION, MIN_COMPATIBLE_VERSION } from 'web-tree-sitter';

const publicDirectory = process.env.TREE_SITTER_PUBLIC_DIR;
const names = process.env.TREE_SITTER_PARSERS.split('\n').filter(Boolean);

await Parser.init({
  locateFile(scriptName) {
    return path.join(publicDirectory, scriptName);
  },
});

const parser = new Parser();

try {
  for (const name of names) {
    const language = await Language.load(path.join(publicDirectory, `tree-sitter-${name}.wasm`));

    if (language.abiVersion < MIN_COMPATIBLE_VERSION || language.abiVersion > LANGUAGE_VERSION) {
      throw new Error(`${name} ABI ${language.abiVersion} is outside ${MIN_COMPATIBLE_VERSION}-${LANGUAGE_VERSION}`);
    }

    parser.setLanguage(language);
    parser.parse('foo').delete();
    console.log(`verified ${name} ABI ${language.abiVersion}`);
  }
} finally {
  parser.delete();
}
";

#[derive(Debug, Parser)]
#[command(name = "compiler")]
struct Options {
    #[arg(long, default_value = "manifest.toml")]
    manifest: PathBuf,
    #[arg(long, default_value = "public")]
    public_directory: PathBuf,
    #[arg(long)]
    runtime_wasm: Option<PathBuf>,
    #[arg(long)]
    skip_verify: bool,
    #[arg(long)]
    tree_sitter: Option<PathBuf>,
    #[arg(long)]
    verify_only: bool,
}

#[derive(Debug, Deserialize)]
struct Manifest {
    #[serde(rename = "parser")]
    parsers: Vec<ParserConfig>,
}

#[derive(Debug, Deserialize)]
struct ParserConfig {
    name: String,
    path: Option<PathBuf>,
    repository: String,
    revision: String,
}

struct Compiler {
    manifest: Manifest,
    options: Options,
    root: PathBuf,
}

impl Manifest {
    fn load(path: &Path) -> Result<Self> {
        let manifest = fs::read_to_string(path)
            .with_context(|| format!("failed to read {}", path.display()))?;
        let manifest = toml::from_str::<Self>(&manifest)
            .with_context(|| format!("failed to parse {}", path.display()))?;

        if manifest.parsers.is_empty() {
            bail!(
                "{} must contain at least one [[parser]] table",
                path.display()
            );
        }

        Ok(manifest)
    }
}

impl Compiler {
    fn build_parser(&self, parser: &ParserConfig, source: &Path) -> Result<()> {
        let output = self
            .public_directory()
            .join(format!("tree-sitter-{}.wasm", parser.name));

        run(Command::new(self.tree_sitter())
            .arg("build")
            .arg("--wasm")
            .arg("--output")
            .arg(&output)
            .arg(source))
        .with_context(|| format!("failed to build {}", parser.name))?;

        println!("built {}", self.display_path(&output));

        Ok(())
    }

    fn build_parsers(&self) -> Result<()> {
        let checkout_directory = Builder::new()
            .prefix("treesitter-run-parsers-")
            .tempdir()
            .context("failed to create temporary checkout directory")?;

        for parser in &self.manifest.parsers {
            let source = Self::prepare_parser(parser, checkout_directory.path())?;

            self.build_parser(parser, &source)?;
        }

        Ok(())
    }

    fn copy_runtime(&self) -> Result<()> {
        fs::create_dir_all(self.public_directory())
            .with_context(|| format!("failed to create {}", self.public_directory().display()))?;
        fs::copy(self.runtime_wasm(), self.runtime_output()).with_context(|| {
            format!(
                "failed to copy {} to {}",
                self.runtime_wasm().display(),
                self.runtime_output().display()
            )
        })?;

        println!("copied {}", self.display_path(&self.runtime_output()));

        Ok(())
    }

    fn display_path(&self, path: &Path) -> String {
        path.strip_prefix(&self.root)
            .unwrap_or(path)
            .display()
            .to_string()
    }

    fn prepare_parser(parser: &ParserConfig, checkout_directory: &Path) -> Result<PathBuf> {
        let directory = checkout_directory.join(repository_name(&parser.repository)?);

        run(Command::new("git")
            .arg("clone")
            .arg("--filter=blob:none")
            .arg("--no-checkout")
            .arg(&parser.repository)
            .arg(&directory))
        .with_context(|| format!("failed to clone {}", parser.name))?;

        run(Command::new("git")
            .arg("-C")
            .arg(&directory)
            .arg("fetch")
            .arg("--depth")
            .arg("1")
            .arg("origin")
            .arg(&parser.revision))
        .with_context(|| format!("failed to fetch {}", parser.name))?;

        run(Command::new("git")
            .arg("-C")
            .arg(&directory)
            .arg("checkout")
            .arg("--detach")
            .arg(&parser.revision))
        .with_context(|| format!("failed to checkout {}", parser.name))?;

        let revision = read(
            Command::new("git")
                .arg("-C")
                .arg(&directory)
                .arg("rev-parse")
                .arg("HEAD"),
        )
        .with_context(|| format!("failed to read checked out revision for {}", parser.name))?;

        if revision.trim() != parser.revision {
            bail!(
                "{} checked out {}, expected {}",
                parser.name,
                revision.trim(),
                parser.revision
            );
        }

        let source = if let Some(path) = &parser.path {
            directory.join(path)
        } else {
            directory
        };

        Ok(source)
    }

    fn public_directory(&self) -> PathBuf {
        self.resolve(&self.options.public_directory)
    }

    fn resolve(&self, path: &Path) -> PathBuf {
        if path.is_absolute() {
            path.to_path_buf()
        } else {
            self.root.join(path)
        }
    }

    fn run(&self) -> Result<()> {
        self.copy_runtime()?;

        if !self.options.verify_only {
            self.build_parsers()?;
        }

        if !self.options.skip_verify {
            self.verify_parsers()?;
        }

        Ok(())
    }

    fn runtime_output(&self) -> PathBuf {
        self.public_directory().join("tree-sitter.wasm")
    }

    fn runtime_wasm(&self) -> PathBuf {
        self.options.runtime_wasm.as_ref().map_or_else(
            || {
                self.root
                    .join("node_modules")
                    .join("web-tree-sitter")
                    .join("tree-sitter.wasm")
            },
            |path| self.resolve(path),
        )
    }

    fn tree_sitter(&self) -> PathBuf {
        self.options.tree_sitter.as_ref().map_or_else(
            || {
                self.root
                    .join("node_modules")
                    .join(".bin")
                    .join(if cfg!(windows) {
                        "tree-sitter.cmd"
                    } else {
                        "tree-sitter"
                    })
            },
            |path| self.resolve(path),
        )
    }

    fn verify_parsers(&self) -> Result<()> {
        let parser_names = self
            .manifest
            .parsers
            .iter()
            .map(|parser| parser.name.as_str())
            .collect::<Vec<_>>()
            .join("\n");

        run(Command::new("bun")
            .arg("--eval")
            .arg(VERIFY_SCRIPT)
            .env("TREE_SITTER_PUBLIC_DIR", self.public_directory())
            .env("TREE_SITTER_PARSERS", parser_names))
        .context("failed to verify parser WASM files")?;

        Ok(())
    }
}

struct PreparedCommand<'a> {
    command: &'a mut Command,
    display: String,
}

impl<'a> PreparedCommand<'a> {
    fn new(command: &'a mut Command) -> Self {
        let display = std::iter::once(command.get_program())
            .chain(command.get_args())
            .map(|argument| argument.to_string_lossy())
            .collect::<Vec<_>>()
            .join(" ");

        Self { command, display }
    }
}

fn main() -> Result<()> {
    let options = Options::parse();
    let root = env::current_dir().context("failed to read current directory")?;
    let manifest = Manifest::load(&root.join(&options.manifest))?;

    Compiler {
        manifest,
        options,
        root,
    }
    .run()
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

fn run(command: &mut Command) -> Result<()> {
    let command = PreparedCommand::new(command);
    let status = command
        .command
        .status()
        .with_context(|| format!("failed to run {}", command.display))?;

    if !status.success() {
        bail!("{} exited with {}", command.display, status);
    }

    Ok(())
}

fn read(command: &mut Command) -> Result<String> {
    let command = PreparedCommand::new(command);
    let output = command
        .command
        .output()
        .with_context(|| format!("failed to run {}", command.display))?;

    if !output.status.success() {
        bail!("{} exited with {}", command.display, output.status);
    }

    String::from_utf8(output.stdout).context("command output was not UTF-8")
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

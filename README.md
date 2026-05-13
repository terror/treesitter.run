## ![icon](https://github.com/user-attachments/assets/7d32d27b-3f64-44e8-8fe4-f151678aded1) treesitter.run

**treesitter.run** is a web playground for tree-sitter.

<img width="1667" alt="demo" src="screenshot.png" />

## Parser WASM

Parser sources are pinned in `manifest.toml`.

```sh
bun run build:parsers
```

The build command runs the Rust compiler helper in `crates/compiler`. It clones
the grammar repositories into a temporary directory, builds each parser into
`public/tree-sitter-*.wasm`, copies the `web-tree-sitter` runtime WASM, removes
the temporary checkouts, and verifies that every parser loads with the bundled
runtime.

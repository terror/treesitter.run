set dotenv-load

export EDITOR := 'nvim'

alias f := fmt
alias r := run
alias t := test

default:
  just --list

[group: 'build']
build:
  cargo build

[group: 'build']
build-wasm *args:
  cargo run --quiet --locked --package compiler -- {{ args }}

[group: 'dev']
run *args:
  cargo run -- {{ args }}

[group: 'format']
fmt:
  cargo fmt

[group: 'test']
test:
  cargo test --all --all-targets

[group: 'web']
[working-directory: 'www']
web-build:
  bun run build

[group: 'web']
[working-directory: 'www']
web-dev:
  bun run dev

[group: 'web']
[working-directory: 'www']
web-fmt:
  bun run format

[group: 'web']
[working-directory: 'www']
web-install:
  bun install

[group: 'web']
[working-directory: 'www']
web-test:
  bun test

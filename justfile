set dotenv-load

export EDITOR := 'nvim'

alias f := fmt
alias t := test

default:
  just --list

[group: 'build']
build:
  bun run build

[group: 'build']
build-wasm *args:
  cargo run --quiet --locked --package compiler -- {{ args }}

[group: 'dev']
dev:
  bun run dev

[group: 'format']
fmt:
  bunx prettier --write .

[group: 'test']
test:
  bun run test

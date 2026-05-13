set dotenv-load

export EDITOR := 'nvim'

alias f := fmt
alias t := test

default:
  just --list

[group: 'build']
compile:
  bun run build:parsers

[group: 'build']
build:
  bun run build

[group: 'dev']
dev:
  bun run dev

[group: 'format']
fmt:
  bunx prettier --write .

[group: 'test']
test:
  bun run test

[group: 'test']
verify-parsers:
  bun run verify:parsers

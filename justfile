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

[group: 'check']
check:
 cargo check

[group: 'check']
ci: test clippy forbid
  cargo fmt --all -- --check
  cargo update --locked --package treesitter-run

[group: 'check']
clippy:
  cargo clippy --all --all-targets

[group: 'format']
fmt:
  cargo fmt

[group: 'format']
fmt-check:
  cargo fmt --all -- --check

[group: 'check']
forbid:
  ./bin/forbid

[group: 'dev']
install:
  cargo install -f treesitter-run

[group: 'dev']
install-dev-deps:
  cargo install cargo-watch

[group: 'dev']
run *args:
  cargo run {{ args }}

[group: 'test']
test:
  cargo test --all --all-targets

[group: 'dev']
watch +COMMAND='test':
  cargo watch --clear --exec "{{COMMAND}}"

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

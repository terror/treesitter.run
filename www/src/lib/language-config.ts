import { Language, LanguageConfig } from './types';

export const highlightQueryPath = (language: Language): string =>
  `tree-sitter-${language}.highlights.scm`;

export const languageConfig: Record<Language, LanguageConfig> = {
  agda: {
    name: 'agda',
    displayName: 'Agda',
    wasmPath: 'tree-sitter-agda.wasm',
    sampleCode: 'module Foo where\n\ndata Bar : Set where\n  baz : Bar',
  },
  arduino: {
    name: 'arduino',
    displayName: 'Arduino',
    wasmPath: 'tree-sitter-arduino.wasm',
    sampleCode:
      'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n}',
  },
  bash: {
    name: 'bash',
    displayName: 'Bash',
    wasmPath: 'tree-sitter-bash.wasm',
    sampleCode: 'for name in foo bar; do\n  echo "hello, $name"\ndone',
  },
  beancount: {
    name: 'beancount',
    displayName: 'Beancount',
    wasmPath: 'tree-sitter-beancount.wasm',
    sampleCode: '2024-01-01 open Assets:Foo',
  },
  bicep: {
    name: 'bicep',
    displayName: 'Bicep',
    wasmPath: 'tree-sitter-bicep.wasm',
    sampleCode:
      "param foo string\nresource bar 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: foo\n  location: resourceGroup().location\n}",
  },
  c: {
    name: 'c',
    displayName: 'C',
    wasmPath: 'tree-sitter-c.wasm',
    sampleCode:
      '#include <stdio.h>\n' +
      '\n' +
      'int main(void) {\n' +
      '  puts("hello, world");\n' +
      '  return 0;\n' +
      '}',
  },
  'c-sharp': {
    name: 'c-sharp',
    displayName: 'C#',
    wasmPath: 'tree-sitter-c-sharp.wasm',
    sampleCode:
      'using System;\n\nclass Foo {\n  static void Main() {\n    Console.WriteLine("bar");\n  }\n}',
  },
  chatito: {
    name: 'chatito',
    displayName: 'Chatito',
    wasmPath: 'tree-sitter-chatito.wasm',
    sampleCode: '%[foo]\n  bar',
  },
  cmake: {
    name: 'cmake',
    displayName: 'CMake',
    wasmPath: 'tree-sitter-cmake.wasm',
    sampleCode:
      'cmake_minimum_required(VERSION 3.20)\nproject(foo)\nadd_executable(bar bar.c)',
  },
  commonlisp: {
    name: 'commonlisp',
    displayName: 'Common Lisp',
    wasmPath: 'tree-sitter-commonlisp.wasm',
    sampleCode: '(defun foo (bar)\n  (print bar))',
  },
  cpp: {
    name: 'cpp',
    displayName: 'C++',
    wasmPath: 'tree-sitter-cpp.wasm',
    sampleCode:
      '#include <iostream>\n' +
      '\n' +
      'int main() {\n' +
      '  std::cout << "hello, world" << std::endl;\n' +
      '  return 0;\n' +
      '}',
  },
  css: {
    name: 'css',
    displayName: 'CSS',
    wasmPath: 'tree-sitter-css.wasm',
    sampleCode: 'body::before {\n  content: "hello, world";\n}',
  },
  cuda: {
    name: 'cuda',
    displayName: 'CUDA',
    wasmPath: 'tree-sitter-cuda.wasm',
    sampleCode: '__global__ void foo(int *bar) {\n  bar[threadIdx.x] = 1;\n}',
  },
  cyberchef: {
    name: 'cyberchef',
    displayName: 'CyberChef',
    wasmPath: 'tree-sitter-cyberchef.wasm',
    sampleCode: "From_Hex('Auto')\nTo_Base64('A-Za-z0-9+/=')",
  },
  dart: {
    name: 'dart',
    displayName: 'Dart',
    wasmPath: 'tree-sitter-dart.wasm',
    sampleCode: "void main() {\n  print('foo');\n}",
  },
  diff: {
    name: 'diff',
    displayName: 'Diff',
    wasmPath: 'tree-sitter-diff.wasm',
    sampleCode: 'diff --git a/foo b/foo\n+bar',
  },
  dockerfile: {
    name: 'dockerfile',
    displayName: 'Dockerfile',
    wasmPath: 'tree-sitter-dockerfile.wasm',
    sampleCode: 'FROM alpine\nRUN echo foo',
  },
  elixir: {
    name: 'elixir',
    displayName: 'Elixir',
    wasmPath: 'tree-sitter-elixir.wasm',
    sampleCode:
      'defmodule Foo do\n  def bar do\n    IO.puts("baz")\n  end\nend',
  },
  elm: {
    name: 'elm',
    displayName: 'Elm',
    wasmPath: 'tree-sitter-elm.wasm',
    sampleCode: 'module Foo exposing (bar)\n\nbar =\n    "baz"',
  },
  'embedded-template': {
    name: 'embedded-template',
    displayName: 'Embedded Template',
    wasmPath: 'tree-sitter-embedded-template.wasm',
    sampleCode: '<p><%= foo %></p>',
  },
  fennel: {
    name: 'fennel',
    displayName: 'Fennel',
    wasmPath: 'tree-sitter-fennel.wasm',
    sampleCode: '(fn foo [bar]\n  (print bar))',
  },
  fortran: {
    name: 'fortran',
    displayName: 'Fortran',
    wasmPath: 'tree-sitter-fortran.wasm',
    sampleCode: 'program foo\n  print *, "bar"\nend program foo',
  },
  gdscript: {
    name: 'gdscript',
    displayName: 'GDScript',
    wasmPath: 'tree-sitter-gdscript.wasm',
    sampleCode: 'func foo(bar):\n  print(bar)',
  },
  gitattributes: {
    name: 'gitattributes',
    displayName: 'Git Attributes',
    wasmPath: 'tree-sitter-gitattributes.wasm',
    sampleCode: '*.foo text',
  },
  gleam: {
    name: 'gleam',
    displayName: 'Gleam',
    wasmPath: 'tree-sitter-gleam.wasm',
    sampleCode: 'pub fn main() {\n  "foo"\n}',
  },
  glsl: {
    name: 'glsl',
    displayName: 'GLSL',
    wasmPath: 'tree-sitter-glsl.wasm',
    sampleCode: 'void main() {\n  gl_Position = vec4(1.0);\n}',
  },
  go: {
    name: 'go',
    displayName: 'Go',
    wasmPath: 'tree-sitter-go.wasm',
    sampleCode:
      'package main\n' +
      '\n' +
      'import "fmt"\n' +
      '\n' +
      'func main() {\n' +
      '  fmt.Println("hello, world")\n' +
      '}',
  },
  'go-sum': {
    name: 'go-sum',
    displayName: 'go.sum',
    wasmPath: 'tree-sitter-go-sum.wasm',
    sampleCode: 'foo v1.0.0 h1:bar',
  },
  'gpg-config': {
    name: 'gpg-config',
    displayName: 'GPG Config',
    wasmPath: 'tree-sitter-gpg-config.wasm',
    sampleCode: 'keyserver foo',
  },
  graphql: {
    name: 'graphql',
    displayName: 'GraphQL',
    wasmPath: 'tree-sitter-graphql.wasm',
    sampleCode: 'query Foo {\n  bar {\n    baz\n  }\n}',
  },
  haskell: {
    name: 'haskell',
    displayName: 'Haskell',
    wasmPath: 'tree-sitter-haskell.wasm',
    sampleCode: 'module Main where\n\nmain :: IO ()\nmain = putStrLn "foo"',
  },
  hcl: {
    name: 'hcl',
    displayName: 'HCL',
    wasmPath: 'tree-sitter-hcl.wasm',
    sampleCode: 'resource "foo" "bar" {\n  name = "baz"\n}',
  },
  hlsl: {
    name: 'hlsl',
    displayName: 'HLSL',
    wasmPath: 'tree-sitter-hlsl.wasm',
    sampleCode: 'float4 foo() : SV_Target {\n  return float4(1, 0, 0, 1);\n}',
  },
  html: {
    name: 'html',
    displayName: 'HTML',
    wasmPath: 'tree-sitter-html.wasm',
    sampleCode:
      '<!doctype html>\n' +
      '<html>\n' +
      '  <body>\n' +
      '    <p>hello, world</p>\n' +
      '  </body>\n' +
      '</html>',
  },
  hyprlang: {
    name: 'hyprlang',
    displayName: 'Hyprlang',
    wasmPath: 'tree-sitter-hyprlang.wasm',
    sampleCode: '$foo = bar\nmonitor = , preferred, auto, 1',
  },
  ini: {
    name: 'ini',
    displayName: 'INI',
    wasmPath: 'tree-sitter-ini.wasm',
    sampleCode: '[foo]\nbar = baz',
  },
  java: {
    name: 'java',
    displayName: 'Java',
    wasmPath: 'tree-sitter-java.wasm',
    sampleCode:
      'public class Main {\n' +
      '  public static void main(String[] args) {\n' +
      '    System.out.println("hello, world");\n' +
      '  }\n' +
      '}',
  },
  javascript: {
    name: 'javascript',
    displayName: 'JavaScript',
    wasmPath: 'tree-sitter-javascript.wasm',
    sampleCode: 'console.log("hello, world");',
  },
  jsdoc: {
    name: 'jsdoc',
    displayName: 'JSDoc',
    wasmPath: 'tree-sitter-jsdoc.wasm',
    sampleCode: '/**\n * @param {string} foo\n * @returns {string}\n */',
  },
  json: {
    name: 'json',
    displayName: 'JSON',
    wasmPath: 'tree-sitter-json.wasm',
    sampleCode: '{\n  "message": "hello, world"\n}',
  },
  julia: {
    name: 'julia',
    displayName: 'Julia',
    wasmPath: 'tree-sitter-julia.wasm',
    sampleCode: 'function foo(bar)\n  println(bar)\nend\n\nfoo("baz")',
  },
  just: {
    name: 'just',
    displayName: 'Just',
    wasmPath: 'tree-sitter-just.wasm',
    sampleCode: 'default:\n  echo "hello, world"',
  },
  kconfig: {
    name: 'kconfig',
    displayName: 'Kconfig',
    wasmPath: 'tree-sitter-kconfig.wasm',
    sampleCode: 'config FOO\n  bool "bar"',
  },
  kotlin: {
    name: 'kotlin',
    displayName: 'Kotlin',
    wasmPath: 'tree-sitter-kotlin.wasm',
    sampleCode: 'fun main() {\n  println("foo")\n}',
  },
  llvm: {
    name: 'llvm',
    displayName: 'LLVM',
    wasmPath: 'tree-sitter-llvm.wasm',
    sampleCode: 'define i32 @foo() {\nentry:\n  ret i32 0\n}',
  },
  lua: {
    name: 'lua',
    displayName: 'Lua',
    wasmPath: 'tree-sitter-lua.wasm',
    sampleCode: 'local function foo(bar)\n  print(bar)\nend\n\nfoo("baz")',
  },
  luau: {
    name: 'luau',
    displayName: 'Luau',
    wasmPath: 'tree-sitter-luau.wasm',
    sampleCode: 'local function foo(bar)\n  return bar\nend',
  },
  make: {
    name: 'make',
    displayName: 'Make',
    wasmPath: 'tree-sitter-make.wasm',
    sampleCode: 'foo:\n\techo bar',
  },
  markdown: {
    name: 'markdown',
    displayName: 'Markdown',
    wasmPath: 'tree-sitter-markdown.wasm',
    sampleCode: '# Foo\n\nbar baz',
  },
  meson: {
    name: 'meson',
    displayName: 'Meson',
    wasmPath: 'tree-sitter-meson.wasm',
    sampleCode: "project('foo', 'c')\nexecutable('bar', 'bar.c')",
  },
  nginx: {
    name: 'nginx',
    displayName: 'Nginx',
    wasmPath: 'tree-sitter-nginx.wasm',
    sampleCode: 'server {\n  listen 80;\n  server_name foo;\n}',
  },
  nix: {
    name: 'nix',
    displayName: 'Nix',
    wasmPath: 'tree-sitter-nix.wasm',
    sampleCode: '{ foo = "bar"; }',
  },
  objc: {
    name: 'objc',
    displayName: 'Objective-C',
    wasmPath: 'tree-sitter-objc.wasm',
    sampleCode: '@interface Foo\n- (void)bar;\n@end',
  },
  ocaml: {
    name: 'ocaml',
    displayName: 'OCaml',
    wasmPath: 'tree-sitter-ocaml.wasm',
    sampleCode: 'let foo bar =\n  print_endline bar\n\nlet () = foo "baz"',
  },
  odin: {
    name: 'odin',
    displayName: 'Odin',
    wasmPath: 'tree-sitter-odin.wasm',
    sampleCode: 'package foo\n\nbar :: proc() {}',
  },
  pem: {
    name: 'pem',
    displayName: 'PEM',
    wasmPath: 'tree-sitter-pem.wasm',
    sampleCode: '-----BEGIN FOO-----\nbar\n-----END FOO-----',
  },
  php: {
    name: 'php',
    displayName: 'PHP',
    wasmPath: 'tree-sitter-php.wasm',
    sampleCode: '<?php\n\necho "hello, world\\n";\n',
  },
  'poe-filter': {
    name: 'poe-filter',
    displayName: 'PoE Filter',
    wasmPath: 'tree-sitter-poe-filter.wasm',
    sampleCode: 'Show\n  Class "foo"',
  },
  powershell: {
    name: 'powershell',
    displayName: 'PowerShell',
    wasmPath: 'tree-sitter-powershell.wasm',
    sampleCode: 'function Foo {\n  Write-Output "bar"\n}\n\nFoo',
  },
  printf: {
    name: 'printf',
    displayName: 'Printf',
    wasmPath: 'tree-sitter-printf.wasm',
    sampleCode: '%s %d',
  },
  prisma: {
    name: 'prisma',
    displayName: 'Prisma',
    wasmPath: 'tree-sitter-prisma.wasm',
    sampleCode: 'model Foo {\n  id Int @id\n  bar String\n}',
  },
  properties: {
    name: 'properties',
    displayName: 'Properties',
    wasmPath: 'tree-sitter-properties.wasm',
    sampleCode: 'foo=bar',
  },
  puppet: {
    name: 'puppet',
    displayName: 'Puppet',
    wasmPath: 'tree-sitter-puppet.wasm',
    sampleCode: "file { 'foo':\n  ensure => present,\n}",
  },
  purescript: {
    name: 'purescript',
    displayName: 'PureScript',
    wasmPath: 'tree-sitter-purescript.wasm',
    sampleCode: 'module Foo where\n\nbar = "baz"',
  },
  pymanifest: {
    name: 'pymanifest',
    displayName: 'Python Manifest',
    wasmPath: 'tree-sitter-pymanifest.wasm',
    sampleCode: 'include foo',
  },
  python: {
    name: 'python',
    displayName: 'Python',
    wasmPath: 'tree-sitter-python.wasm',
    sampleCode: 'print("hello, world")',
  },
  ql: {
    name: 'ql',
    displayName: 'QL',
    wasmPath: 'tree-sitter-ql.wasm',
    sampleCode: 'from string foo\nselect foo',
  },
  'ql-dbscheme': {
    name: 'ql-dbscheme',
    displayName: 'QL Dbscheme',
    wasmPath: 'tree-sitter-ql-dbscheme.wasm',
    sampleCode: 'class foo extends string',
  },
  query: {
    name: 'query',
    displayName: 'Query',
    wasmPath: 'tree-sitter-query.wasm',
    sampleCode: '(function_item\n  name: (identifier) @function)',
  },
  r: {
    name: 'r',
    displayName: 'R',
    wasmPath: 'tree-sitter-r.wasm',
    sampleCode: 'foo <- function(bar) {\n  print(bar)\n}\n\nfoo("baz")',
  },
  racket: {
    name: 'racket',
    displayName: 'Racket',
    wasmPath: 'tree-sitter-racket.wasm',
    sampleCode: '#lang racket\n\n(define (foo bar)\n  bar)',
  },
  readline: {
    name: 'readline',
    displayName: 'Readline',
    wasmPath: 'tree-sitter-readline.wasm',
    sampleCode: 'set editing-mode vi',
  },
  regex: {
    name: 'regex',
    displayName: 'Regex',
    wasmPath: 'tree-sitter-regex.wasm',
    sampleCode: '^(foo|bar)+$',
  },
  requirements: {
    name: 'requirements',
    displayName: 'Requirements',
    wasmPath: 'tree-sitter-requirements.wasm',
    sampleCode: 'foo==1.0.0',
  },
  rescript: {
    name: 'rescript',
    displayName: 'ReScript',
    wasmPath: 'tree-sitter-rescript.wasm',
    sampleCode: 'let foo = bar => bar',
  },
  ruby: {
    name: 'ruby',
    displayName: 'Ruby',
    wasmPath: 'tree-sitter-ruby.wasm',
    sampleCode: 'def foo(bar)\n  puts bar\nend\n\nfoo("baz")',
  },
  rust: {
    name: 'rust',
    displayName: 'Rust',
    wasmPath: 'tree-sitter-rust.wasm',
    sampleCode: 'fn main() {\n  println!("hello, world");\n}',
  },
  scala: {
    name: 'scala',
    displayName: 'Scala',
    wasmPath: 'tree-sitter-scala.wasm',
    sampleCode:
      'object Foo {\n  def main(args: Array[String]): Unit = {\n    println("bar")\n  }\n}',
  },
  slang: {
    name: 'slang',
    displayName: 'Slang',
    wasmPath: 'tree-sitter-slang.wasm',
    sampleCode: 'void foo() {}',
  },
  solidity: {
    name: 'solidity',
    displayName: 'Solidity',
    wasmPath: 'tree-sitter-solidity.wasm',
    sampleCode: 'contract Foo {\n  function bar() public {}\n}',
  },
  typescript: {
    name: 'typescript',
    displayName: 'TypeScript',
    wasmPath: 'tree-sitter-typescript.wasm',
    sampleCode:
      'type Message = {\n' +
      '  text: string;\n' +
      '};\n' +
      '\n' +
      'const message: Message = {\n' +
      '  text: "hello, world",\n' +
      '};\n' +
      '\n' +
      'console.log(message.text);',
  },
  udev: {
    name: 'udev',
    displayName: 'udev',
    wasmPath: 'tree-sitter-udev.wasm',
    sampleCode: 'ACTION=="add", NAME="foo"',
  },
  verilog: {
    name: 'verilog',
    displayName: 'Verilog',
    wasmPath: 'tree-sitter-verilog.wasm',
    sampleCode:
      'module foo(input bar, output baz);\n  assign baz = bar;\nendmodule',
  },
  vim: {
    name: 'vim',
    displayName: 'Vimscript',
    wasmPath: 'tree-sitter-vim.wasm',
    sampleCode: 'function Foo(bar)\n  echo a:bar\nendfunction',
  },
  xcompose: {
    name: 'xcompose',
    displayName: 'XCompose',
    wasmPath: 'tree-sitter-xcompose.wasm',
    sampleCode: '<Multi_key> <f> <o> <o> : "foo"',
  },
  yaml: {
    name: 'yaml',
    displayName: 'YAML',
    wasmPath: 'tree-sitter-yaml.wasm',
    sampleCode: 'message: hello, world\nitems:\n  - foo\n  - bar',
  },
  toml: {
    name: 'toml',
    displayName: 'TOML',
    wasmPath: 'tree-sitter-toml.wasm',
    sampleCode: 'message = "hello, world"\nitems = ["foo", "bar"]',
  },
  xml: {
    name: 'xml',
    displayName: 'XML',
    wasmPath: 'tree-sitter-xml.wasm',
    sampleCode:
      '<?xml version="1.0"?>\n' +
      '<message>\n' +
      '  <text>hello, world</text>\n' +
      '</message>',
  },
  sql: {
    name: 'sql',
    displayName: 'SQL',
    wasmPath: 'tree-sitter-sql.wasm',
    sampleCode: 'select foo\nfrom bar\nwhere baz = 1;',
  },
  'ssh-config': {
    name: 'ssh-config',
    displayName: 'SSH Config',
    wasmPath: 'tree-sitter-ssh-config.wasm',
    sampleCode: 'Host foo\n  HostName bar',
  },
  starlark: {
    name: 'starlark',
    displayName: 'Starlark',
    wasmPath: 'tree-sitter-starlark.wasm',
    sampleCode: 'def foo(bar):\n    return bar',
  },
  tcl: {
    name: 'tcl',
    displayName: 'Tcl',
    wasmPath: 'tree-sitter-tcl.wasm',
    sampleCode: 'proc foo {bar} {\n  puts $bar\n}',
  },
  tsx: {
    name: 'tsx',
    displayName: 'TSX',
    wasmPath: 'tree-sitter-tsx.wasm',
    sampleCode:
      'type Props = {\n' +
      '  text: string;\n' +
      '};\n' +
      '\n' +
      'export function Message({ text }: Props) {\n' +
      '  return <span>{text}</span>;\n' +
      '}',
  },
  zig: {
    name: 'zig',
    displayName: 'Zig',
    wasmPath: 'tree-sitter-zig.wasm',
    sampleCode:
      'const std = @import("std");\n\npub fn main() void {\n  std.debug.print("foo\\n", .{});\n}',
  },
};

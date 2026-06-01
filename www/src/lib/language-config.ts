import { Language, LanguageConfig } from './types';

type BaseLanguageConfig = Omit<
  LanguageConfig,
  'highlightQueryPath' | 'wasmPath'
>;

const baseLanguageConfig: Record<Language, BaseLanguageConfig> = {
  ada: {
    name: 'ada',
    displayName: 'Ada',
    sampleCode: 'procedure Foo is\nbegin\n  null;\nend Foo;',
  },
  agda: {
    name: 'agda',
    displayName: 'Agda',
    sampleCode: 'module Foo where\n\ndata Bar : Set where\n  baz : Bar',
  },
  apex: {
    name: 'apex',
    displayName: 'Apex',
    sampleCode: 'public class Foo {\n  public void bar() {}\n}',
  },
  arduino: {
    name: 'arduino',
    displayName: 'Arduino',
    sampleCode:
      'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n}',
  },
  asm: {
    name: 'asm',
    displayName: 'Assembly',
    sampleCode: 'section .text\nfoo:\n  nop\n',
  },
  astro: {
    name: 'astro',
    displayName: 'Astro',
    sampleCode: '---\nconst foo = "bar";\n---\n<div>{foo}</div>',
  },
  authzed: {
    name: 'authzed',
    displayName: 'Authzed',
    sampleCode:
      'definition user {}\ndefinition document {\n  relation viewer: user\n}',
  },
  awk: {
    name: 'awk',
    displayName: 'Awk',
    sampleCode: 'BEGIN { print "foo" }',
  },
  bash: {
    name: 'bash',
    displayName: 'Bash',
    sampleCode: 'for name in foo bar; do\n  echo "hello, $name"\ndone',
  },
  beancount: {
    name: 'beancount',
    displayName: 'Beancount',
    sampleCode: '2024-01-01 open Assets:Foo\n',
  },
  bicep: {
    name: 'bicep',
    displayName: 'Bicep',
    sampleCode:
      "param foo string\nresource bar 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: foo\n  location: resourceGroup().location\n}",
  },
  bibtex: {
    name: 'bibtex',
    displayName: 'BibTeX',
    sampleCode: '@article{foo,\n  title = {bar},\n}',
  },
  bitbake: {
    name: 'bitbake',
    displayName: 'BitBake',
    sampleCode: 'FOO = "bar"\n',
  },
  brightscript: {
    name: 'brightscript',
    displayName: 'BrightScript',
    sampleCode: 'function foo()\n  print "bar"\nend function',
  },
  c: {
    name: 'c',
    displayName: 'C',
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
    sampleCode:
      'using System;\n\nclass Foo {\n  static void Main() {\n    Console.WriteLine("bar");\n  }\n}',
  },
  caddy: {
    name: 'caddy',
    displayName: 'Caddy',
    sampleCode: 'example.com {\n  respond "foo"\n}\n',
  },
  cairo: {
    name: 'cairo',
    displayName: 'Cairo',
    sampleCode: 'fn foo() -> felt252 {\n  return 1;\n}',
  },
  capnp: {
    name: 'capnp',
    displayName: "Cap'n Proto",
    sampleCode: '@0xabcdefabcdefabcd;\nstruct Foo {\n  bar @0 :Text;\n}',
  },
  cel: {
    name: 'cel',
    displayName: 'CEL',
    sampleCode: 'foo == "bar"',
  },
  chatito: {
    name: 'chatito',
    displayName: 'Chatito',
    sampleCode: '%[foo]\n    bar\n',
  },
  clojure: {
    name: 'clojure',
    displayName: 'Clojure',
    sampleCode: '(defn foo [bar]\n  bar)',
  },
  cmake: {
    name: 'cmake',
    displayName: 'CMake',
    sampleCode:
      'cmake_minimum_required(VERSION 3.20)\nproject(foo)\nadd_executable(bar bar.c)',
  },
  comment: {
    name: 'comment',
    displayName: 'Comment',
    sampleCode: '// foo\n',
  },
  commonlisp: {
    name: 'commonlisp',
    displayName: 'Common Lisp',
    sampleCode: '(defun foo (bar)\n  (print bar))',
  },
  cooklang: {
    name: 'cooklang',
    displayName: 'Cooklang',
    sampleCode: 'Add @foo{1%bar}\n',
  },
  cpon: {
    name: 'cpon',
    displayName: 'CPON',
    sampleCode: '<"foo":"bar">1',
  },
  cpp: {
    name: 'cpp',
    displayName: 'C++',
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
    sampleCode: 'body::before {\n  content: "hello, world";\n}',
  },
  cuda: {
    name: 'cuda',
    displayName: 'CUDA',
    sampleCode: '__global__ void foo(int *bar) {\n  bar[threadIdx.x] = 1;\n}',
  },
  cyberchef: {
    name: 'cyberchef',
    displayName: 'CyberChef',
    sampleCode: 'From_Hex()\nTo_Base64()\n',
  },
  d: {
    name: 'd',
    displayName: 'D',
    sampleCode: 'void main() {\n  writeln("foo");\n}',
  },
  dart: {
    name: 'dart',
    displayName: 'Dart',
    sampleCode: "void main() {\n  print('foo');\n}",
  },
  diff: {
    name: 'diff',
    displayName: 'Diff',
    sampleCode: 'diff --git a/foo b/foo\n+bar',
  },
  dockerfile: {
    name: 'dockerfile',
    displayName: 'Dockerfile',
    sampleCode: 'FROM alpine\nRUN echo foo\n',
  },
  dot: {
    name: 'dot',
    displayName: 'DOT',
    sampleCode: 'digraph foo {\n  bar -> baz\n}',
  },
  eex: {
    name: 'eex',
    displayName: 'EEx',
    sampleCode: '<%= @foo %>',
  },
  elixir: {
    name: 'elixir',
    displayName: 'Elixir',
    sampleCode:
      'defmodule Foo do\n  def bar do\n    IO.puts("baz")\n  end\nend',
  },
  elm: {
    name: 'elm',
    displayName: 'Elm',
    sampleCode: 'module Foo exposing (bar)\n\nbar =\n    "baz"',
  },
  'embedded-template': {
    name: 'embedded-template',
    displayName: 'Embedded Template',
    sampleCode: '<p><%= foo %></p>',
  },
  erlang: {
    name: 'erlang',
    displayName: 'Erlang',
    sampleCode: '-module(foo).\n-export([bar/0]).\nbar() -> ok.',
  },
  fennel: {
    name: 'fennel',
    displayName: 'Fennel',
    sampleCode: '(fn foo [bar]\n  (print bar))',
  },
  firrtl: {
    name: 'firrtl',
    displayName: 'FIRRTL',
    sampleCode: 'circuit Foo :\n  module Foo :\n    input clock : Clock\n',
  },
  fish: {
    name: 'fish',
    displayName: 'fish',
    sampleCode: 'function foo\n  echo bar\nend\n',
  },
  fortran: {
    name: 'fortran',
    displayName: 'Fortran',
    sampleCode: 'program foo\n  print *, "bar"\nend program foo',
  },
  fsharp: {
    name: 'fsharp',
    displayName: 'F#',
    sampleCode: 'let foo bar =\n  printfn "%s" bar',
  },
  func: {
    name: 'func',
    displayName: 'FunC',
    sampleCode: '() recv_internal() {\n}',
  },
  gdscript: {
    name: 'gdscript',
    displayName: 'GDScript',
    sampleCode: 'func foo(bar):\n  print(bar)',
  },
  gitattributes: {
    name: 'gitattributes',
    displayName: 'Git Attributes',
    sampleCode: '*.foo text\n',
  },
  gleam: {
    name: 'gleam',
    displayName: 'Gleam',
    sampleCode: 'pub fn main() {\n  "foo"\n}',
  },
  glsl: {
    name: 'glsl',
    displayName: 'GLSL',
    sampleCode: 'void main() {\n  gl_Position = vec4(1.0);\n}',
  },
  gn: {
    name: 'gn',
    displayName: 'GN',
    sampleCode: 'executable("foo") {\n  sources = [ "bar.cc" ]\n}',
  },
  go: {
    name: 'go',
    displayName: 'Go',
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
    sampleCode: 'foo v1.0.0 h1:bar',
  },
  gowork: {
    name: 'gowork',
    displayName: 'go.work',
    sampleCode: 'go 1.22\n\nuse ./foo\n',
  },
  'gpg-config': {
    name: 'gpg-config',
    displayName: 'GPG Config',
    sampleCode: 'no-greeting\n',
  },
  graphql: {
    name: 'graphql',
    displayName: 'GraphQL',
    sampleCode: 'query Foo {\n  bar {\n    baz\n  }\n}',
  },
  gstlaunch: {
    name: 'gstlaunch',
    displayName: 'GStreamer Launch',
    sampleCode: 'videotestsrc ! autovideosink',
  },
  hare: {
    name: 'hare',
    displayName: 'Hare',
    sampleCode: 'export fn main() void = {\n	let foo = "bar";\n};',
  },
  haskell: {
    name: 'haskell',
    displayName: 'Haskell',
    sampleCode: 'module Main where\n\nmain :: IO ()\nmain = putStrLn "foo"',
  },
  hcl: {
    name: 'hcl',
    displayName: 'HCL',
    sampleCode: 'resource "foo" "bar" {\n  name = "baz"\n}',
  },
  hlsl: {
    name: 'hlsl',
    displayName: 'HLSL',
    sampleCode: 'float4 foo() : SV_Target {\n  return float4(1, 0, 0, 1);\n}',
  },
  html: {
    name: 'html',
    displayName: 'HTML',
    sampleCode:
      '<!doctype html>\n' +
      '<html>\n' +
      '  <body>\n' +
      '    <p>hello, world</p>\n' +
      '  </body>\n' +
      '</html>',
  },
  http: {
    name: 'http',
    displayName: 'HTTP',
    sampleCode: 'GET http://example.com\n',
  },
  hurl: {
    name: 'hurl',
    displayName: 'Hurl',
    sampleCode: 'GET http://example.com\nHTTP 200\n',
  },
  hyprlang: {
    name: 'hyprlang',
    displayName: 'Hyprlang',
    sampleCode: '$foo = bar\nmonitor = , preferred, auto, 1\n',
  },
  ini: {
    name: 'ini',
    displayName: 'INI',
    sampleCode: '[foo]\nbar = baz\n',
  },
  ispc: {
    name: 'ispc',
    displayName: 'ISPC',
    sampleCode: 'export void foo(uniform int bar) {\n  int baz = bar;\n}',
  },
  java: {
    name: 'java',
    displayName: 'Java',
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
    sampleCode: 'console.log("hello, world");',
  },
  jq: {
    name: 'jq',
    displayName: 'jq',
    sampleCode: '.foo | length',
  },
  jsdoc: {
    name: 'jsdoc',
    displayName: 'JSDoc',
    sampleCode: '/**\n * @param {string} foo\n * @returns {string}\n */',
  },
  json: {
    name: 'json',
    displayName: 'JSON',
    sampleCode: '{\n  "message": "hello, world"\n}',
  },
  json5: {
    name: 'json5',
    displayName: 'JSON5',
    sampleCode: '{\n  message: "hello, world",\n}',
  },
  jsonnet: {
    name: 'jsonnet',
    displayName: 'Jsonnet',
    sampleCode: '{ foo: "bar" }',
  },
  julia: {
    name: 'julia',
    displayName: 'Julia',
    sampleCode: 'function foo(bar)\n  println(bar)\nend\n\nfoo("baz")',
  },
  just: {
    name: 'just',
    displayName: 'Just',
    sampleCode: 'default:\n  echo "hello, world"',
  },
  kconfig: {
    name: 'kconfig',
    displayName: 'Kconfig',
    sampleCode: 'config FOO\n  bool "bar"\n',
  },
  kdl: {
    name: 'kdl',
    displayName: 'KDL',
    sampleCode: 'foo bar="baz"\n',
  },
  kotlin: {
    name: 'kotlin',
    displayName: 'Kotlin',
    sampleCode: 'fun main() {\n  println("foo")\n}',
  },
  linkerscript: {
    name: 'linkerscript',
    displayName: 'Linker Script',
    sampleCode: 'SECTIONS { .text : { *(.text) } }',
  },
  liquid: {
    name: 'liquid',
    displayName: 'Liquid',
    sampleCode: '{% assign foo = "bar" %}\n{{ foo }}',
  },
  llvm: {
    name: 'llvm',
    displayName: 'LLVM',
    sampleCode: 'define i32 @foo() {\nentry:\n  ret i32 0\n}',
  },
  lua: {
    name: 'lua',
    displayName: 'Lua',
    sampleCode: 'local function foo(bar)\n  print(bar)\nend\n\nfoo("baz")',
  },
  luadoc: {
    name: 'luadoc',
    displayName: 'LuaDoc',
    sampleCode: '@param foo string\n@return string',
  },
  luap: {
    name: 'luap',
    displayName: 'Lua Patterns',
    sampleCode: '[a-z]+',
  },
  luau: {
    name: 'luau',
    displayName: 'Luau',
    sampleCode: 'local function foo(bar)\n  return bar\nend',
  },
  make: {
    name: 'make',
    displayName: 'Make',
    sampleCode: 'foo:\n\techo bar\n',
  },
  markdown: {
    name: 'markdown',
    displayName: 'Markdown',
    sampleCode: '# Foo\n\nbar baz',
  },
  mermaid: {
    name: 'mermaid',
    displayName: 'Mermaid',
    sampleCode: 'flowchart TB\n  Foo --> Bar\n',
  },
  meson: {
    name: 'meson',
    displayName: 'Meson',
    sampleCode: "project('foo', 'c')\nexecutable('bar', 'bar.c')",
  },
  move: {
    name: 'move',
    displayName: 'Move',
    sampleCode: 'module 0x1::foo {\n  fun bar() {}\n}\n',
  },
  nginx: {
    name: 'nginx',
    displayName: 'Nginx',
    sampleCode: 'server {\n  listen 80;\n  server_name foo;\n}\n',
  },
  nix: {
    name: 'nix',
    displayName: 'Nix',
    sampleCode: '{ foo = "bar"; }',
  },
  nqc: {
    name: 'nqc',
    displayName: 'NQC',
    sampleCode: 'task main() {\n  OnFwd(OUT_A, 75);\n}',
  },
  objc: {
    name: 'objc',
    displayName: 'Objective-C',
    sampleCode: '@interface Foo\n- (void)bar;\n@end',
  },
  ocaml: {
    name: 'ocaml',
    displayName: 'OCaml',
    sampleCode: 'let foo bar =\n  print_endline bar\n\nlet () = foo "baz"',
  },
  odin: {
    name: 'odin',
    displayName: 'Odin',
    sampleCode: 'package foo\n\nbar :: proc() {}',
  },
  pem: {
    name: 'pem',
    displayName: 'PEM',
    sampleCode: '-----BEGIN FOO-----\nbar\n-----END FOO-----',
  },
  php: {
    name: 'php',
    displayName: 'PHP',
    sampleCode: '<?php\n\necho "hello, world\\n";\n',
  },
  po: {
    name: 'po',
    displayName: 'PO',
    sampleCode: 'msgid "foo"\nmsgstr "bar"\n',
  },
  'poe-filter': {
    name: 'poe-filter',
    displayName: 'PoE Filter',
    sampleCode: 'Show\n  Class "foo"\n',
  },
  pony: {
    name: 'pony',
    displayName: 'Pony',
    sampleCode:
      'actor Main\n  new create(env: Env) =>\n    env.out.print("foo")',
  },
  powershell: {
    name: 'powershell',
    displayName: 'PowerShell',
    sampleCode: 'function Foo {\n  Write-Output "bar"\n}\n\nFoo',
  },
  printf: {
    name: 'printf',
    displayName: 'Printf',
    sampleCode: '%s %d',
  },
  prisma: {
    name: 'prisma',
    displayName: 'Prisma',
    sampleCode: 'model Foo {\n  id Int @id\n  bar String\n}',
  },
  properties: {
    name: 'properties',
    displayName: 'Properties',
    sampleCode: 'foo=bar',
  },
  pug: {
    name: 'pug',
    displayName: 'Pug',
    sampleCode: 'html\n  body\n    p foo\n',
  },
  puppet: {
    name: 'puppet',
    displayName: 'Puppet',
    sampleCode: "file { 'foo':\n  ensure => present,\n}",
  },
  purescript: {
    name: 'purescript',
    displayName: 'PureScript',
    sampleCode: 'module Foo where\n\nbar = "baz"',
  },
  pymanifest: {
    name: 'pymanifest',
    displayName: 'Python Manifest',
    sampleCode: 'include foo\n',
  },
  python: {
    name: 'python',
    displayName: 'Python',
    sampleCode: 'print("hello, world")',
  },
  ql: {
    name: 'ql',
    displayName: 'QL',
    sampleCode: 'from string foo\nselect foo',
  },
  'ql-dbscheme': {
    name: 'ql-dbscheme',
    displayName: 'QL Dbscheme',
    sampleCode: '@foo = @bar | @baz;',
  },
  qmljs: {
    name: 'qmljs',
    displayName: 'QMLJS',
    sampleCode: 'Item {\n  property string foo: "bar"\n}',
  },
  query: {
    name: 'query',
    displayName: 'Query',
    sampleCode: '(function_item\n  name: (identifier) @function)',
  },
  r: {
    name: 'r',
    displayName: 'R',
    sampleCode: 'foo <- function(bar) {\n  print(bar)\n}\n\nfoo("baz")',
  },
  racket: {
    name: 'racket',
    displayName: 'Racket',
    sampleCode: '#lang racket\n\n(define (foo bar)\n  bar)',
  },
  re2c: {
    name: 're2c',
    displayName: 're2c',
    sampleCode: '/*!re2c\n  * { return 0; }\n*/',
  },
  readline: {
    name: 'readline',
    displayName: 'Readline',
    sampleCode: 'set editing-mode vi\n',
  },
  regex: {
    name: 'regex',
    displayName: 'Regex',
    sampleCode: '^(foo|bar)+$',
  },
  requirements: {
    name: 'requirements',
    displayName: 'Requirements',
    sampleCode: 'foo==1.0.0\n',
  },
  rescript: {
    name: 'rescript',
    displayName: 'ReScript',
    sampleCode: 'let foo = bar => bar',
  },
  ron: {
    name: 'ron',
    displayName: 'RON',
    sampleCode: '(foo: "bar")',
  },
  ruby: {
    name: 'ruby',
    displayName: 'Ruby',
    sampleCode: 'def foo(bar)\n  puts bar\nend\n\nfoo("baz")',
  },
  rust: {
    name: 'rust',
    displayName: 'Rust',
    sampleCode: 'fn main() {\n  println!("hello, world");\n}',
  },
  scala: {
    name: 'scala',
    displayName: 'Scala',
    sampleCode:
      'object Foo {\n  def main(args: Array[String]): Unit = {\n    println("bar")\n  }\n}',
  },
  scss: {
    name: 'scss',
    displayName: 'SCSS',
    sampleCode: '$foo: #fff;\n.bar {\n  color: $foo;\n}',
  },
  slang: {
    name: 'slang',
    displayName: 'Slang',
    sampleCode: 'void foo() {}',
  },
  smali: {
    name: 'smali',
    displayName: 'Smali',
    sampleCode: '.class public Lfoo;\n.super Ljava/lang/Object;\n',
  },
  solidity: {
    name: 'solidity',
    displayName: 'Solidity',
    sampleCode: 'contract Foo {\n  function bar() public {}\n}',
  },
  squirrel: {
    name: 'squirrel',
    displayName: 'Squirrel',
    sampleCode: 'function foo(bar) {\n  return bar\n}',
  },
  svelte: {
    name: 'svelte',
    displayName: 'Svelte',
    sampleCode:
      '<script>\n' +
      '  let foo = "bar";\n' +
      '</script>\n' +
      '\n' +
      '<h1>{foo}</h1>',
  },
  tablegen: {
    name: 'tablegen',
    displayName: 'TableGen',
    sampleCode: 'class Foo<string bar> {\n  string baz = bar;\n}',
  },
  terraform: {
    name: 'terraform',
    displayName: 'Terraform',
    sampleCode: 'resource "foo" "bar" {\n  baz = "qux"\n}',
  },
  thrift: {
    name: 'thrift',
    displayName: 'Thrift',
    sampleCode: 'namespace rs foo\nstruct Bar {\n  1: string baz\n}\n',
  },
  typescript: {
    name: 'typescript',
    displayName: 'TypeScript',
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
    sampleCode: 'ACTION=="add", NAME="foo"\n',
  },
  ungrammar: {
    name: 'ungrammar',
    displayName: 'Ungrammar',
    sampleCode: "Foo = 'bar'\n",
  },
  uxntal: {
    name: 'uxntal',
    displayName: 'Uxntal',
    sampleCode: '|0100 @foo BRK\n',
  },
  vala: {
    name: 'vala',
    displayName: 'Vala',
    sampleCode: 'void main() {\n  print("foo");\n}',
  },
  verilog: {
    name: 'verilog',
    displayName: 'Verilog',
    sampleCode:
      'module foo(input bar, output baz);\n  assign baz = bar;\nendmodule',
  },
  vim: {
    name: 'vim',
    displayName: 'Vimscript',
    sampleCode: 'function Foo(bar)\n  echo a:bar\nendfunction\n',
  },
  wgsl: {
    name: 'wgsl',
    displayName: 'WGSL',
    sampleCode:
      '@fragment\nfn foo() -> @location(0) vec4<f32> {\n  return vec4<f32>(1.0);\n}',
  },
  'wgsl-bevy': {
    name: 'wgsl-bevy',
    displayName: 'WGSL Bevy',
    sampleCode:
      '@fragment\nfn foo() -> @location(0) vec4<f32> {\n  return vec4<f32>(1.0);\n}',
  },
  xcompose: {
    name: 'xcompose',
    displayName: 'XCompose',
    sampleCode: '<Multi_key> <f> <o> <o> : "foo"\n',
  },
  yaml: {
    name: 'yaml',
    displayName: 'YAML',
    sampleCode: 'message: hello, world\nitems:\n  - foo\n  - bar',
  },
  toml: {
    name: 'toml',
    displayName: 'TOML',
    sampleCode: 'message = "hello, world"\nitems = ["foo", "bar"]',
  },
  xml: {
    name: 'xml',
    displayName: 'XML',
    sampleCode:
      '<?xml version="1.0"?>\n' +
      '<message>\n' +
      '  <text>hello, world</text>\n' +
      '</message>',
  },
  sql: {
    name: 'sql',
    displayName: 'SQL',
    sampleCode: 'select foo\nfrom bar\nwhere baz = 1;',
  },
  'ssh-config': {
    name: 'ssh-config',
    displayName: 'SSH Config',
    sampleCode: 'Host foo\n  HostName bar\n',
  },
  starlark: {
    name: 'starlark',
    displayName: 'Starlark',
    sampleCode: 'def foo(bar):\n    return bar',
  },
  tcl: {
    name: 'tcl',
    displayName: 'Tcl',
    sampleCode: 'proc foo {bar} {\n  puts $bar\n}\n',
  },
  tsx: {
    name: 'tsx',
    displayName: 'TSX',
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
    sampleCode:
      'const std = @import("std");\n\npub fn main() void {\n  std.debug.print("foo\\n", .{});\n}',
  },
  zsh: {
    name: 'zsh',
    displayName: 'Zsh',
    sampleCode: 'for foo in bar; do\n  echo $foo\ndone',
  },
};

export const languageConfig = Object.fromEntries(
  Object.entries(baseLanguageConfig).map(([name, config]) => [
    name,
    {
      ...config,
      highlightQueryPath: `tree-sitter-${config.name}.highlights.scm`,
      wasmPath: `tree-sitter-${config.name}.wasm`,
    },
  ])
) as Record<Language, LanguageConfig>;

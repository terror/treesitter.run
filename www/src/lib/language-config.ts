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
  angular: {
    name: 'angular',
    displayName: 'Angular',
    sampleCode: '<div>{{ foo }}</div>',
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
  bass: {
    name: 'bass',
    displayName: 'Bass',
    sampleCode: '(def foo "bar")',
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
  blade: {
    name: 'blade',
    displayName: 'Blade',
    sampleCode: '@if ($foo)\n  {{ $bar }}\n@endif',
  },
  bpftrace: {
    name: 'bpftrace',
    displayName: 'bpftrace',
    sampleCode: 'BEGIN {\n  printf("foo\\n");\n}',
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
  c3: {
    name: 'c3',
    displayName: 'C3',
    sampleCode: 'module foo;\nfn void bar() {}',
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
  circom: {
    name: 'circom',
    displayName: 'Circom',
    sampleCode:
      'pragma circom 2.0.0;\ntemplate Foo() {\n  signal input bar;\n  signal output baz;\n  baz <== bar;\n}',
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
  corn: {
    name: 'corn',
    displayName: 'Corn',
    sampleCode: '{ foo = "bar" }',
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
  csv: {
    name: 'csv',
    displayName: 'CSV',
    sampleCode: 'foo,bar\nbaz,qux\n',
  },
  cuda: {
    name: 'cuda',
    displayName: 'CUDA',
    sampleCode: '__global__ void foo(int *bar) {\n  bar[threadIdx.x] = 1;\n}',
  },
  cue: {
    name: 'cue',
    displayName: 'CUE',
    sampleCode: 'foo: "bar"\n',
  },
  cyberchef: {
    name: 'cyberchef',
    displayName: 'CyberChef',
    sampleCode: 'From_Hex()\nTo_Base64()\n',
  },
  cylc: {
    name: 'cylc',
    displayName: 'Cylc',
    sampleCode: '[scheduler]\n    allow implicit tasks = True\n',
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
  desktop: {
    name: 'desktop',
    displayName: 'Desktop Entry',
    sampleCode: '[Desktop Entry]\nType=Application\nName=foo\nExec=bar\n',
  },
  devicetree: {
    name: 'devicetree',
    displayName: 'Device Tree',
    sampleCode: '/dts-v1/;\n/ {\n  compatible = "foo";\n};\n',
  },
  dhall: {
    name: 'dhall',
    displayName: 'Dhall',
    sampleCode: 'let foo = "bar" in foo',
  },
  diff: {
    name: 'diff',
    displayName: 'Diff',
    sampleCode: 'diff --git a/foo b/foo\n+bar',
  },
  disassembly: {
    name: 'disassembly',
    displayName: 'Disassembly',
    sampleCode: '0x00000000: nop\n',
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
  dtd: {
    name: 'dtd',
    displayName: 'DTD',
    sampleCode: '<!ELEMENT foo (#PCDATA)>',
  },
  ebnf: {
    name: 'ebnf',
    displayName: 'EBNF',
    sampleCode: 'foo = "bar" ;',
  },
  editorconfig: {
    name: 'editorconfig',
    displayName: 'EditorConfig',
    sampleCode: 'root = true\n\n[foo]\nindent_style = space\n',
  },
  eds: {
    name: 'eds',
    displayName: 'EDS',
    sampleCode: '[FileInfo]\nFileName=foo.eds\n',
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
  elsa: {
    name: 'elsa',
    displayName: 'Elsa',
    sampleCode: 'let foo = \\bar -> bar',
  },
  elvish: {
    name: 'elvish',
    displayName: 'Elvish',
    sampleCode: 'var foo = bar\necho $foo',
  },
  'embedded-template': {
    name: 'embedded-template',
    displayName: 'Embedded Template',
    sampleCode: '<p><%= foo %></p>',
  },
  enforce: {
    name: 'enforce',
    displayName: 'Enforce Script',
    sampleCode: 'class Foo {\n  void Bar() {}\n}',
  },
  erlang: {
    name: 'erlang',
    displayName: 'Erlang',
    sampleCode: '-module(foo).\n-export([bar/0]).\nbar() -> ok.',
  },
  facility: {
    name: 'facility',
    displayName: 'Facility',
    sampleCode: 'service Foo {\n  method bar {}: {}\n}',
  },
  faust: {
    name: 'faust',
    displayName: 'Faust',
    sampleCode: 'foo = 1;\nprocess = foo;',
  },
  fennel: {
    name: 'fennel',
    displayName: 'Fennel',
    sampleCode: '(fn foo [bar]\n  (print bar))',
  },
  fidl: {
    name: 'fidl',
    displayName: 'FIDL',
    sampleCode: 'library foo.bar;',
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
  foam: {
    name: 'foam',
    displayName: 'OpenFOAM',
    sampleCode:
      'FoamFile\n{\n  version 2.0;\n  format ascii;\n  class dictionary;\n  object foo;\n}\n',
  },
  fortran: {
    name: 'fortran',
    displayName: 'Fortran',
    sampleCode: 'program foo\n  print *, "bar"\nend program foo',
  },
  fsh: {
    name: 'fsh',
    displayName: 'FHIR Shorthand',
    sampleCode: 'Alias: $foo = http://example.com/bar\n',
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
  gap: {
    name: 'gap',
    displayName: 'GAP',
    sampleCode: 'foo := function(bar)\n  return bar;\nend;\n',
  },
  gdscript: {
    name: 'gdscript',
    displayName: 'GDScript',
    sampleCode: 'func foo(bar):\n  print(bar)',
  },
  gdshader: {
    name: 'gdshader',
    displayName: 'GDShader',
    sampleCode:
      'shader_type canvas_item;\nvoid fragment() {\n  COLOR = vec4(1.0);\n}',
  },
  'git-rebase': {
    name: 'git-rebase',
    displayName: 'Git Rebase',
    sampleCode: 'pick abcdef0 foo\nreword 1234567 bar\n',
  },
  gitattributes: {
    name: 'gitattributes',
    displayName: 'Git Attributes',
    sampleCode: '*.foo text\n',
  },
  gitcommit: {
    name: 'gitcommit',
    displayName: 'Git Commit',
    sampleCode: 'foo\n\nbar\n',
  },
  gleam: {
    name: 'gleam',
    displayName: 'Gleam',
    sampleCode: 'pub fn main() {\n  "foo"\n}',
  },
  glimmer: {
    name: 'glimmer',
    displayName: 'Glimmer',
    sampleCode: '<div>{{foo}}</div>',
  },
  'glimmer-javascript': {
    name: 'glimmer-javascript',
    displayName: 'Glimmer JavaScript',
    sampleCode: 'const foo = <template><div>bar</div></template>;',
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
  gnuplot: {
    name: 'gnuplot',
    displayName: 'Gnuplot',
    sampleCode: 'set title "foo"\nplot sin(x)\n',
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
  goctl: {
    name: 'goctl',
    displayName: 'goctl',
    sampleCode: 'syntax = "v1"\n\ntype Foo {\n  Bar string\n}\n',
  },
  gomod: {
    name: 'gomod',
    displayName: 'go.mod',
    sampleCode: 'module foo\n\ngo 1.22\n',
  },
  gotmpl: {
    name: 'gotmpl',
    displayName: 'Go Template',
    sampleCode: '{{ range .Foo }}{{ .Bar }}{{ end }}',
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
  gren: {
    name: 'gren',
    displayName: 'Gren',
    sampleCode: 'module Foo exposing (bar)\n\nbar = "baz"\n',
  },
  groovy: {
    name: 'groovy',
    displayName: 'Groovy',
    sampleCode: "def foo() {\n  println 'bar'\n}\n",
  },
  groq: {
    name: 'groq',
    displayName: 'GROQ',
    sampleCode: '*[_type == "foo"] { bar }',
  },
  gstlaunch: {
    name: 'gstlaunch',
    displayName: 'GStreamer Launch',
    sampleCode: 'videotestsrc ! autovideosink',
  },
  hack: {
    name: 'hack',
    displayName: 'Hack',
    sampleCode: '<?hh\nfunction foo(): string {\n  return "bar";\n}\n',
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
  'haskell-persistent': {
    name: 'haskell-persistent',
    displayName: 'Haskell Persistent',
    sampleCode: 'Foo\n  bar Text\n',
  },
  hcl: {
    name: 'hcl',
    displayName: 'HCL',
    sampleCode: 'resource "foo" "bar" {\n  name = "baz"\n}',
  },
  heex: {
    name: 'heex',
    displayName: 'HEEx',
    sampleCode: '<div><%= @foo %></div>',
  },
  helm: {
    name: 'helm',
    displayName: 'Helm',
    sampleCode: '{{ .Values.foo | quote }}',
  },
  hjson: {
    name: 'hjson',
    displayName: 'Hjson',
    sampleCode: '{\n  "foo": "bar"\n  "baz": 1\n}',
  },
  hlsl: {
    name: 'hlsl',
    displayName: 'HLSL',
    sampleCode: 'float4 foo() : SV_Target {\n  return float4(1, 0, 0, 1);\n}',
  },
  hocon: {
    name: 'hocon',
    displayName: 'HOCON',
    sampleCode: 'foo {\n  bar = "baz"\n}',
  },
  hoon: {
    name: 'hoon',
    displayName: 'Hoon',
    sampleCode: '|=  foo=@\n(add foo 1)\n',
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
  htmldjango: {
    name: 'htmldjango',
    displayName: 'Django HTML',
    sampleCode: '<div>{% if foo %}{{ bar }}{% endif %}</div>',
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
  idl: {
    name: 'idl',
    displayName: 'IDL',
    sampleCode: 'module Foo {\n  interface Bar {\n    void baz();\n  };\n};',
  },
  ini: {
    name: 'ini',
    displayName: 'INI',
    sampleCode: '[foo]\nbar = baz\n',
  },
  inko: {
    name: 'inko',
    displayName: 'Inko',
    sampleCode: 'let foo = "bar"',
  },
  ispc: {
    name: 'ispc',
    displayName: 'ISPC',
    sampleCode: 'export void foo(uniform int bar) {\n  int baz = bar;\n}',
  },
  'janet-simple': {
    name: 'janet-simple',
    displayName: 'Janet',
    sampleCode: '(def foo "bar")\n(print foo)',
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
  javadoc: {
    name: 'javadoc',
    displayName: 'Javadoc',
    sampleCode: '/**\n * foo\n * @param bar baz\n */',
  },
  javascript: {
    name: 'javascript',
    displayName: 'JavaScript',
    sampleCode: 'console.log("hello, world");',
  },
  jinja: {
    name: 'jinja',
    displayName: 'Jinja',
    sampleCode: '{% set foo = "bar" %}{{ foo }}',
  },
  'jinja-inline': {
    name: 'jinja-inline',
    displayName: 'Jinja Inline',
    sampleCode: '{# foo #}',
  },
  jjdescription: {
    name: 'jjdescription',
    displayName: 'Jujutsu Description',
    sampleCode: 'foo\n\nJJ: bar\n',
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
  kcl: {
    name: 'kcl',
    displayName: 'KCL',
    sampleCode: 'schema Foo:\n    bar: str\n\nfoo = Foo {bar = "baz"}\n',
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
  kitty: {
    name: 'kitty',
    displayName: 'Kitty Config',
    sampleCode: 'font_family foo\nfont_size 12\n',
  },
  kos: {
    name: 'kos',
    displayName: 'Kos',
    sampleCode: 'const foo = "bar";',
  },
  kotlin: {
    name: 'kotlin',
    displayName: 'Kotlin',
    sampleCode: 'fun main() {\n  println("foo")\n}',
  },
  koto: {
    name: 'koto',
    displayName: 'Koto',
    sampleCode: 'foo = |bar| bar\nfoo "baz"\n',
  },
  lean: {
    name: 'lean',
    displayName: 'Lean',
    sampleCode: 'def foo : Nat := 1\n',
  },
  ledger: {
    name: 'ledger',
    displayName: 'Ledger',
    sampleCode: '2026/01/01 foo\n    bar    1 USD\n    baz\n',
  },
  leo: {
    name: 'leo',
    displayName: 'Leo',
    sampleCode:
      'program foo.aleo {\n  transition bar(public baz: u32) -> u32 {\n    return baz;\n  }\n}',
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
  liquidsoap: {
    name: 'liquidsoap',
    displayName: 'Liquidsoap',
    sampleCode: 'foo = "bar"\nprint(foo)\n',
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
  m68k: {
    name: 'm68k',
    displayName: 'Motorola 68000',
    sampleCode: 'foo:\n  move.l #1,d0\n  rts\n',
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
  'markdown-inline': {
    name: 'markdown-inline',
    displayName: 'Markdown Inline',
    sampleCode: '*foo* and [bar](https://example.com)',
  },
  matlab: {
    name: 'matlab',
    displayName: 'MATLAB',
    sampleCode: 'function y = foo(x)\ny = x + 1;\nend\n',
  },
  menhir: {
    name: 'menhir',
    displayName: 'Menhir',
    sampleCode: '%token FOO\n%start <unit> foo\n%%\nfoo: FOO { () }\n',
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
  mlir: {
    name: 'mlir',
    displayName: 'MLIR',
    sampleCode: 'module {\n  func.func @foo() {\n    return\n  }\n}',
  },
  move: {
    name: 'move',
    displayName: 'Move',
    sampleCode: 'module 0x1::foo {\n  fun bar() {}\n}\n',
  },
  nasm: {
    name: 'nasm',
    displayName: 'NASM',
    sampleCode: 'section .text\nfoo:\n  mov eax, 1\n  ret\n',
  },
  nginx: {
    name: 'nginx',
    displayName: 'Nginx',
    sampleCode: 'server {\n  listen 80;\n  server_name foo;\n}\n',
  },
  nickel: {
    name: 'nickel',
    displayName: 'Nickel',
    sampleCode: '{ foo = "bar" }',
  },
  nim: {
    name: 'nim',
    displayName: 'Nim',
    sampleCode: 'proc foo(): string =\n  "bar"\n',
  },
  'nim-format-string': {
    name: 'nim-format-string',
    displayName: 'Nim Format String',
    sampleCode: 'foo {bar}',
  },
  ninja: {
    name: 'ninja',
    displayName: 'Ninja',
    sampleCode: 'rule foo\n  command = echo bar\nbuild baz: foo\n',
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
  nu: {
    name: 'nu',
    displayName: 'Nushell',
    sampleCode: 'def foo [] { echo bar }\n',
  },
  objc: {
    name: 'objc',
    displayName: 'Objective-C',
    sampleCode: '@interface Foo\n- (void)bar;\n@end',
  },
  objdump: {
    name: 'objdump',
    displayName: 'Objdump',
    sampleCode: '0000000000000000 <foo>:\n   0:\t90\tnop\n',
  },
  ocaml: {
    name: 'ocaml',
    displayName: 'OCaml',
    sampleCode: 'let foo bar =\n  print_endline bar\n\nlet () = foo "baz"',
  },
  ocamllex: {
    name: 'ocamllex',
    displayName: 'OCamllex',
    sampleCode: 'rule foo = parse\n  | "bar" { () }\n',
  },
  odin: {
    name: 'odin',
    displayName: 'Odin',
    sampleCode: 'package foo\n\nbar :: proc() {}',
  },
  pascal: {
    name: 'pascal',
    displayName: 'Pascal',
    sampleCode: "program foo;\nbegin\n  writeln('bar');\nend.\n",
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
  'php-only': {
    name: 'php-only',
    displayName: 'PHP Only',
    sampleCode: 'function foo($bar) {\n  return $bar;\n}',
  },
  phpdoc: {
    name: 'phpdoc',
    displayName: 'PHPDoc',
    sampleCode: '/**\n * @param string $foo\n * @return string\n */',
  },
  pioasm: {
    name: 'pioasm',
    displayName: 'PIO Assembly',
    sampleCode: '.program foo\n    set pins, 1\n',
  },
  pkl: {
    name: 'pkl',
    displayName: 'Pkl',
    sampleCode: 'foo = "bar"\n',
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
  promql: {
    name: 'promql',
    displayName: 'PromQL',
    sampleCode: 'foo{bar="baz"}',
  },
  properties: {
    name: 'properties',
    displayName: 'Properties',
    sampleCode: 'foo=bar',
  },
  proto: {
    name: 'proto',
    displayName: 'Protocol Buffers',
    sampleCode: 'syntax = "proto3";\nmessage Foo {\n  string bar = 1;\n}\n',
  },
  prql: {
    name: 'prql',
    displayName: 'PRQL',
    sampleCode: 'from foo\nfilter bar == "baz"\ntake 10\n',
  },
  psv: {
    name: 'psv',
    displayName: 'PSV',
    sampleCode: 'foo|bar\nbaz|qux\n',
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
  qmldir: {
    name: 'qmldir',
    displayName: 'QML Directory',
    sampleCode: 'module Foo\nBar 1.0 Bar.qml\n',
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
  ralph: {
    name: 'ralph',
    displayName: 'Ralph',
    sampleCode:
      'Contract Foo() {\n  pub fn bar() -> U256 {\n    return 1\n  }\n}',
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
  rego: {
    name: 'rego',
    displayName: 'Rego',
    sampleCode: 'package foo\n\nallow {\n  input.bar\n}\n',
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
  robot: {
    name: 'robot',
    displayName: 'Robot Framework',
    sampleCode: '*** Test Cases ***\nFoo\n    Log    bar\n',
  },
  roc: {
    name: 'roc',
    displayName: 'Roc',
    sampleCode: 'foo = "bar"\n',
  },
  ron: {
    name: 'ron',
    displayName: 'RON',
    sampleCode: '(foo: "bar")',
  },
  rst: {
    name: 'rst',
    displayName: 'reStructuredText',
    sampleCode: 'Foo\n===\n\n**bar**\n',
  },
  ruby: {
    name: 'ruby',
    displayName: 'Ruby',
    sampleCode: 'def foo(bar)\n  puts bar\nend\n\nfoo("baz")',
  },
  runescript: {
    name: 'runescript',
    displayName: 'RuneScript',
    sampleCode: '[proc,foo]\nreturn;\n',
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
  scfg: {
    name: 'scfg',
    displayName: 'SCFG',
    sampleCode: 'foo bar {\n  baz qux\n}\n',
  },
  scss: {
    name: 'scss',
    displayName: 'SCSS',
    sampleCode: '$foo: #fff;\n.bar {\n  color: $foo;\n}',
  },
  sflog: {
    name: 'sflog',
    displayName: 'Salesforce Log',
    sampleCode: '60.0 APEX_CODE,DEBUG\n12:00:00.0 (1)|EXECUTION_STARTED\n',
  },
  slang: {
    name: 'slang',
    displayName: 'Slang',
    sampleCode: 'void foo() {}',
  },
  slim: {
    name: 'slim',
    displayName: 'Slim',
    sampleCode: 'div\n  p foo\n',
  },
  slint: {
    name: 'slint',
    displayName: 'Slint',
    sampleCode:
      'export component Foo inherits Window {\n  Text { text: "bar"; }\n}',
  },
  smali: {
    name: 'smali',
    displayName: 'Smali',
    sampleCode: '.class public Lfoo;\n.super Ljava/lang/Object;\n',
  },
  snakemake: {
    name: 'snakemake',
    displayName: 'Snakemake',
    sampleCode: 'rule foo:\n    output: "bar"\n    shell: "touch {output}"\n',
  },
  solidity: {
    name: 'solidity',
    displayName: 'Solidity',
    sampleCode: 'contract Foo {\n  function bar() public {}\n}',
  },
  sparql: {
    name: 'sparql',
    displayName: 'SPARQL',
    sampleCode: 'SELECT ?foo WHERE {\n  ?foo ?bar ?baz .\n}',
  },
  squirrel: {
    name: 'squirrel',
    displayName: 'Squirrel',
    sampleCode: 'function foo(bar) {\n  return bar\n}',
  },
  styled: {
    name: 'styled',
    displayName: 'Styled Components',
    sampleCode: 'color: red;\n.foo { display: block; }',
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
  swift: {
    name: 'swift',
    displayName: 'Swift',
    sampleCode: 'func foo(_ bar: String) -> String {\n  return bar\n}\n',
  },
  sxhkdrc: {
    name: 'sxhkdrc',
    displayName: 'sxhkdrc',
    sampleCode: 'super + f\n    echo foo\n',
  },
  systemverilog: {
    name: 'systemverilog',
    displayName: 'SystemVerilog',
    sampleCode: 'module foo;\nendmodule\n',
  },
  t32: {
    name: 't32',
    displayName: 'TRACE32',
    sampleCode: 'PRINT "foo"\nENDDO\n',
  },
  tablegen: {
    name: 'tablegen',
    displayName: 'TableGen',
    sampleCode: 'class Foo<string bar> {\n  string baz = bar;\n}',
  },
  tact: {
    name: 'tact',
    displayName: 'Tact',
    sampleCode: 'contract Foo {\n  init() {}\n}',
  },
  terraform: {
    name: 'terraform',
    displayName: 'Terraform',
    sampleCode: 'resource "foo" "bar" {\n  baz = "qux"\n}',
  },
  textproto: {
    name: 'textproto',
    displayName: 'Text Proto',
    sampleCode: 'foo: "bar"\nbaz { qux: 1 }',
  },
  thrift: {
    name: 'thrift',
    displayName: 'Thrift',
    sampleCode: 'namespace rs foo\nstruct Bar {\n  1: string baz\n}\n',
  },
  tiger: {
    name: 'tiger',
    displayName: 'Tiger',
    sampleCode: 'let\n  var foo := "bar"\nin\n  print(foo)\nend',
  },
  tsv: {
    name: 'tsv',
    displayName: 'TSV',
    sampleCode: 'foo\tbar\nbaz\tqux\n',
  },
  twig: {
    name: 'twig',
    displayName: 'Twig',
    sampleCode: '{% if foo %}{{ bar }}{% endif %}',
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
  typoscript: {
    name: 'typoscript',
    displayName: 'TypoScript',
    sampleCode: 'foo = TEXT\nfoo.value = bar\n',
  },
  typst: {
    name: 'typst',
    displayName: 'Typst',
    sampleCode: '#let foo = "bar"\n#foo\n',
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
  unison: {
    name: 'unison',
    displayName: 'Unison',
    sampleCode: 'foo = "bar"\n',
  },
  uxntal: {
    name: 'uxntal',
    displayName: 'Uxntal',
    sampleCode: '|0100 @foo BRK\n',
  },
  v: {
    name: 'v',
    displayName: 'V',
    sampleCode: 'module main\n\nfn main() {\n  println("foo")\n}',
  },
  vala: {
    name: 'vala',
    displayName: 'Vala',
    sampleCode: 'void main() {\n  print("foo");\n}',
  },
  vento: {
    name: 'vento',
    displayName: 'Vento',
    sampleCode: '{{ if foo }}{{ bar }}{{ /if }}',
  },
  verilog: {
    name: 'verilog',
    displayName: 'Verilog',
    sampleCode:
      'module foo(input bar, output baz);\n  assign baz = bar;\nendmodule',
  },
  vhdl: {
    name: 'vhdl',
    displayName: 'VHDL',
    sampleCode:
      'entity foo is\nend entity;\narchitecture bar of foo is\nbegin\nend architecture;\n',
  },
  vhs: {
    name: 'vhs',
    displayName: 'VHS',
    sampleCode: 'Output foo.gif\nType "echo bar"\nEnter\nSleep 1s\n',
  },
  vim: {
    name: 'vim',
    displayName: 'Vimscript',
    sampleCode: 'function Foo(bar)\n  echo a:bar\nendfunction\n',
  },
  vimdoc: {
    name: 'vimdoc',
    displayName: 'Vim Help',
    sampleCode: '*foo*\n\nbar |baz|\n\n',
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
  wit: {
    name: 'wit',
    displayName: 'WIT',
    sampleCode: 'package foo:bar;\ninterface baz {\n  qux: func();\n}\n',
  },
  wxml: {
    name: 'wxml',
    displayName: 'WXML',
    sampleCode: '<view>{{foo}}</view>',
  },
  xcompose: {
    name: 'xcompose',
    displayName: 'XCompose',
    sampleCode: '<Multi_key> <f> <o> <o> : "foo"\n',
  },
  xresources: {
    name: 'xresources',
    displayName: 'X Resources',
    sampleCode: 'Foo.bar: baz\n',
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
  'ziggy-schema': {
    name: 'ziggy-schema',
    displayName: 'Ziggy Schema',
    sampleCode: '$ = Foo\nstruct Foo {\n  bar: bytes,\n}\n',
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

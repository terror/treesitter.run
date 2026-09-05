import type { Language, LanguageConfig } from './types';

type BaseLanguageConfig = Omit<
  LanguageConfig,
  'name' | 'highlightQueryPath' | 'wasmPath'
>;

export const baseLanguageConfig = {
  ada: {
    displayName: 'Ada',
    sampleCode: 'procedure Foo is\nbegin\n  null;\nend Foo;',
  },
  agda: {
    displayName: 'Agda',
    sampleCode: 'module Foo where\n\ndata Bar : Set where\n  baz : Bar',
  },
  angular: {
    displayName: 'Angular',
    sampleCode: '<div>{{ foo }}</div>',
  },
  apex: {
    displayName: 'Apex',
    sampleCode: 'public class Foo {\n  public void bar() {}\n}',
  },
  arduino: {
    displayName: 'Arduino',
    sampleCode:
      'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n}',
  },
  asm: {
    displayName: 'Assembly',
    sampleCode: 'section .text\nfoo:\n  nop\n',
  },
  astro: {
    displayName: 'Astro',
    sampleCode: '---\nconst foo = "bar";\n---\n<div>{foo}</div>',
  },
  authzed: {
    displayName: 'Authzed',
    sampleCode:
      'definition user {}\ndefinition document {\n  relation viewer: user\n}',
  },
  awk: {
    displayName: 'Awk',
    sampleCode: 'BEGIN { print "foo" }',
  },
  bash: {
    displayName: 'Bash',
    sampleCode: 'for name in foo bar; do\n  echo "hello, $name"\ndone',
  },
  bass: {
    displayName: 'Bass',
    sampleCode: '(def foo "bar")',
  },
  beancount: {
    displayName: 'Beancount',
    sampleCode: '2024-01-01 open Assets:Foo\n',
  },
  bicep: {
    displayName: 'Bicep',
    sampleCode:
      "param foo string\nresource bar 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: foo\n  location: resourceGroup().location\n}",
  },
  bibtex: {
    displayName: 'BibTeX',
    sampleCode: '@article{foo,\n  title = {bar},\n}',
  },
  bitbake: {
    displayName: 'BitBake',
    sampleCode: 'FOO = "bar"\n',
  },
  blade: {
    displayName: 'Blade',
    sampleCode: '@if ($foo)\n  {{ $bar }}\n@endif',
  },
  bp: {
    displayName: 'Blueprint',
    sampleCode: 'cc_library {\n  name: "foo",\n  srcs: ["bar.c"],\n}',
  },
  bpftrace: {
    displayName: 'bpftrace',
    sampleCode: 'BEGIN {\n  printf("foo\\n");\n}',
  },
  brightscript: {
    displayName: 'BrightScript',
    sampleCode: 'function foo()\n  print "bar"\nend function',
  },
  c: {
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
    displayName: 'C#',
    sampleCode:
      'using System;\n\nclass Foo {\n  static void Main() {\n    Console.WriteLine("bar");\n  }\n}',
  },
  c3: {
    displayName: 'C3',
    sampleCode: 'module foo;\nfn void bar() {}',
  },
  caddy: {
    displayName: 'Caddy',
    sampleCode: 'example.com {\n  respond "foo"\n}\n',
  },
  cairo: {
    displayName: 'Cairo',
    sampleCode: 'fn foo() -> felt252 {\n  return 1;\n}',
  },
  capnp: {
    displayName: "Cap'n Proto",
    sampleCode: '@0xabcdefabcdefabcd;\nstruct Foo {\n  bar @0 :Text;\n}',
  },
  cel: {
    displayName: 'CEL',
    sampleCode: 'foo == "bar"',
  },
  chatito: {
    displayName: 'Chatito',
    sampleCode: '%[foo]\n    bar\n',
  },
  circom: {
    displayName: 'Circom',
    sampleCode:
      'pragma circom 2.0.0;\ntemplate Foo() {\n  signal input bar;\n  signal output baz;\n  baz <== bar;\n}',
  },
  clojure: {
    displayName: 'Clojure',
    sampleCode: '(defn foo [bar]\n  bar)',
  },
  cmake: {
    displayName: 'CMake',
    sampleCode:
      'cmake_minimum_required(VERSION 3.20)\nproject(foo)\nadd_executable(bar bar.c)',
  },
  comment: {
    displayName: 'Comment',
    sampleCode: '// foo\n',
  },
  commonlisp: {
    displayName: 'Common Lisp',
    sampleCode: '(defun foo (bar)\n  (print bar))',
  },
  cooklang: {
    displayName: 'Cooklang',
    sampleCode: 'Add @foo{1%bar}\n',
  },
  corn: {
    displayName: 'Corn',
    sampleCode: '{ foo = "bar" }',
  },
  cpon: {
    displayName: 'CPON',
    sampleCode: '<"foo":"bar">1',
  },
  cpp: {
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
    displayName: 'CSS',
    sampleCode: 'body::before {\n  content: "hello, world";\n}',
  },
  csv: {
    displayName: 'CSV',
    sampleCode: 'foo,bar\nbaz,qux\n',
  },
  cuda: {
    displayName: 'CUDA',
    sampleCode: '__global__ void foo(int *bar) {\n  bar[threadIdx.x] = 1;\n}',
  },
  cue: {
    displayName: 'CUE',
    sampleCode: 'foo: "bar"\n',
  },
  cyberchef: {
    displayName: 'CyberChef',
    sampleCode: 'From_Hex()\nTo_Base64()\n',
  },
  cylc: {
    displayName: 'Cylc',
    sampleCode: '[scheduler]\n    allow implicit tasks = True\n',
  },
  d: {
    displayName: 'D',
    sampleCode: 'void main() {\n  writeln("foo");\n}',
  },
  dart: {
    displayName: 'Dart',
    sampleCode: "void main() {\n  print('foo');\n}",
  },
  desktop: {
    displayName: 'Desktop Entry',
    sampleCode: '[Desktop Entry]\nType=Application\nName=foo\nExec=bar\n',
  },
  devicetree: {
    displayName: 'Device Tree',
    sampleCode: '/dts-v1/;\n/ {\n  compatible = "foo";\n};\n',
  },
  dhall: {
    displayName: 'Dhall',
    sampleCode: 'let foo = "bar" in foo',
  },
  diff: {
    displayName: 'Diff',
    sampleCode: 'diff --git a/foo b/foo\n+bar',
  },
  disassembly: {
    displayName: 'Disassembly',
    sampleCode: '0x00000000: nop\n',
  },
  dockerfile: {
    displayName: 'Dockerfile',
    sampleCode: 'FROM alpine\nRUN echo foo\n',
  },
  dot: {
    displayName: 'DOT',
    sampleCode: 'digraph foo {\n  bar -> baz\n}',
  },
  dtd: {
    displayName: 'DTD',
    sampleCode: '<!ELEMENT foo (#PCDATA)>',
  },
  earthfile: {
    displayName: 'Earthfile',
    sampleCode: 'VERSION 0.8\nfoo:\n    FROM alpine\n    RUN echo bar\n',
  },
  ebnf: {
    displayName: 'EBNF',
    sampleCode: 'foo = "bar" ;',
  },
  editorconfig: {
    displayName: 'EditorConfig',
    sampleCode: 'root = true\n\n[foo]\nindent_style = space\n',
  },
  eds: {
    displayName: 'EDS',
    sampleCode: '[FileInfo]\nFileName=foo.eds\n',
  },
  eex: {
    displayName: 'EEx',
    sampleCode: '<%= @foo %>',
  },
  elixir: {
    displayName: 'Elixir',
    sampleCode:
      'defmodule Foo do\n  def bar do\n    IO.puts("baz")\n  end\nend',
  },
  elm: {
    displayName: 'Elm',
    sampleCode: 'module Foo exposing (bar)\n\nbar =\n    "baz"',
  },
  elsa: {
    displayName: 'Elsa',
    sampleCode: 'let foo = \\bar -> bar',
  },
  elvish: {
    displayName: 'Elvish',
    sampleCode: 'var foo = bar\necho $foo',
  },
  'embedded-template': {
    displayName: 'Embedded Template',
    sampleCode: '<p><%= foo %></p>',
  },
  enforce: {
    displayName: 'Enforce Script',
    sampleCode: 'class Foo {\n  void Bar() {}\n}',
  },
  erlang: {
    displayName: 'Erlang',
    sampleCode: '-module(foo).\n-export([bar/0]).\nbar() -> ok.',
  },
  facility: {
    displayName: 'Facility',
    sampleCode: 'service Foo {\n  method bar {}: {}\n}',
  },
  faust: {
    displayName: 'Faust',
    sampleCode: 'foo = 1;\nprocess = foo;',
  },
  fennel: {
    displayName: 'Fennel',
    sampleCode: '(fn foo [bar]\n  (print bar))',
  },
  fidl: {
    displayName: 'FIDL',
    sampleCode: 'library foo.bar;',
  },
  firrtl: {
    displayName: 'FIRRTL',
    sampleCode: 'circuit Foo :\n  module Foo :\n    input clock : Clock\n',
  },
  fish: {
    displayName: 'fish',
    sampleCode: 'function foo\n  echo bar\nend\n',
  },
  foam: {
    displayName: 'OpenFOAM',
    sampleCode:
      'FoamFile\n{\n  version 2.0;\n  format ascii;\n  class dictionary;\n  object foo;\n}\n',
  },
  forth: {
    displayName: 'Forth',
    sampleCode: ': foo 1 2 + ;\nfoo .\n',
  },
  fortran: {
    displayName: 'Fortran',
    sampleCode: 'program foo\n  print *, "bar"\nend program foo',
  },
  fsh: {
    displayName: 'FHIR Shorthand',
    sampleCode: 'Alias: $foo = http://example.com/bar\n',
  },
  fsharp: {
    displayName: 'F#',
    sampleCode: 'let foo bar =\n  printfn "%s" bar',
  },
  func: {
    displayName: 'FunC',
    sampleCode: '() recv_internal() {\n}',
  },
  gap: {
    displayName: 'GAP',
    sampleCode: 'foo := function(bar)\n  return bar;\nend;\n',
  },
  gaptst: {
    displayName: 'GAP Test',
    sampleCode: 'gap> foo := 1;\n1\n',
  },
  gdscript: {
    displayName: 'GDScript',
    sampleCode: 'func foo(bar):\n  print(bar)',
  },
  gdshader: {
    displayName: 'GDShader',
    sampleCode:
      'shader_type canvas_item;\nvoid fragment() {\n  COLOR = vec4(1.0);\n}',
  },
  'git-config': {
    displayName: 'Git Config',
    sampleCode: '[foo]\n  bar = baz\n',
  },
  'git-rebase': {
    displayName: 'Git Rebase',
    sampleCode: 'pick abcdef0 foo\nreword 1234567 bar\n',
  },
  gitattributes: {
    displayName: 'Git Attributes',
    sampleCode: '*.foo text\n',
  },
  gitcommit: {
    displayName: 'Git Commit',
    sampleCode: 'foo\n\nbar\n',
  },
  gitignore: {
    displayName: 'Git Ignore',
    sampleCode: 'foo/\n*.bar\n!baz.bar\n',
  },
  gleam: {
    displayName: 'Gleam',
    sampleCode: 'pub fn main() {\n  "foo"\n}',
  },
  glimmer: {
    displayName: 'Glimmer',
    sampleCode: '<div>{{foo}}</div>',
  },
  'glimmer-javascript': {
    displayName: 'Glimmer JavaScript',
    sampleCode: 'const foo = <template><div>bar</div></template>;',
  },
  'glimmer-typescript': {
    displayName: 'Glimmer TypeScript',
    sampleCode: 'const foo = <template><div>bar</div></template>;',
  },
  glsl: {
    displayName: 'GLSL',
    sampleCode: 'void main() {\n  gl_Position = vec4(1.0);\n}',
  },
  gn: {
    displayName: 'GN',
    sampleCode: 'executable("foo") {\n  sources = [ "bar.cc" ]\n}',
  },
  gnuplot: {
    displayName: 'Gnuplot',
    sampleCode: 'set title "foo"\nplot sin(x)\n',
  },
  go: {
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
    displayName: 'go.sum',
    sampleCode: 'foo v1.0.0 h1:bar',
  },
  goctl: {
    displayName: 'goctl',
    sampleCode: 'syntax = "v1"\n\ntype Foo {\n  Bar string\n}\n',
  },
  'godot-resource': {
    displayName: 'Godot Resource',
    sampleCode:
      '[gd_resource type="Resource" format=3]\n\n[resource]\nresource_name = "foo"\n',
  },
  gomod: {
    displayName: 'go.mod',
    sampleCode: 'module foo\n\ngo 1.22\n',
  },
  gotmpl: {
    displayName: 'Go Template',
    sampleCode: '{{ range .Foo }}{{ .Bar }}{{ end }}',
  },
  gowork: {
    displayName: 'go.work',
    sampleCode: 'go 1.22\n\nuse ./foo\n',
  },
  'gpg-config': {
    displayName: 'GPG Config',
    sampleCode: 'no-greeting\n',
  },
  graphql: {
    displayName: 'GraphQL',
    sampleCode: 'query Foo {\n  bar {\n    baz\n  }\n}',
  },
  gren: {
    displayName: 'Gren',
    sampleCode: 'module Foo exposing (bar)\n\nbar = "baz"\n',
  },
  groovy: {
    displayName: 'Groovy',
    sampleCode: "def foo() {\n  println 'bar'\n}\n",
  },
  groq: {
    displayName: 'GROQ',
    sampleCode: '*[_type == "foo"] { bar }',
  },
  gstlaunch: {
    displayName: 'GStreamer Launch',
    sampleCode: 'videotestsrc ! autovideosink',
  },
  hack: {
    displayName: 'Hack',
    sampleCode: '<?hh\nfunction foo(): string {\n  return "bar";\n}\n',
  },
  hare: {
    displayName: 'Hare',
    sampleCode: 'export fn main() void = {\n	let foo = "bar";\n};',
  },
  haskell: {
    displayName: 'Haskell',
    sampleCode: 'module Main where\n\nmain :: IO ()\nmain = putStrLn "foo"',
  },
  'haskell-persistent': {
    displayName: 'Haskell Persistent',
    sampleCode: 'Foo\n  bar Text\n',
  },
  hcl: {
    displayName: 'HCL',
    sampleCode: 'resource "foo" "bar" {\n  name = "baz"\n}',
  },
  heex: {
    displayName: 'HEEx',
    sampleCode: '<div><%= @foo %></div>',
  },
  helm: {
    displayName: 'Helm',
    sampleCode: '{{ .Values.foo | quote }}',
  },
  hjson: {
    displayName: 'Hjson',
    sampleCode: '{\n  "foo": "bar"\n  "baz": 1\n}',
  },
  hlsl: {
    displayName: 'HLSL',
    sampleCode: 'float4 foo() : SV_Target {\n  return float4(1, 0, 0, 1);\n}',
  },
  hocon: {
    displayName: 'HOCON',
    sampleCode: 'foo {\n  bar = "baz"\n}',
  },
  hoon: {
    displayName: 'Hoon',
    sampleCode: '|=  foo=@\n(add foo 1)\n',
  },
  html: {
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
    displayName: 'Django HTML',
    sampleCode: '<div>{% if foo %}{{ bar }}{% endif %}</div>',
  },
  http: {
    displayName: 'HTTP',
    sampleCode: 'GET http://example.com\n',
  },
  hurl: {
    displayName: 'Hurl',
    sampleCode: 'GET http://example.com\nHTTP 200\n',
  },
  hyprlang: {
    displayName: 'Hyprlang',
    sampleCode: '$foo = bar\nmonitor = , preferred, auto, 1\n',
  },
  idl: {
    displayName: 'IDL',
    sampleCode: 'module Foo {\n  interface Bar {\n    void baz();\n  };\n};',
  },
  idris: {
    displayName: 'Idris',
    sampleCode: 'module Foo\n\nfoo : String\nfoo = "bar"\n',
  },
  ini: {
    displayName: 'INI',
    sampleCode: '[foo]\nbar = baz\n',
  },
  inko: {
    displayName: 'Inko',
    sampleCode: 'let foo = "bar"',
  },
  ispc: {
    displayName: 'ISPC',
    sampleCode: 'export void foo(uniform int bar) {\n  int baz = bar;\n}',
  },
  'janet-simple': {
    displayName: 'Janet',
    sampleCode: '(def foo "bar")\n(print foo)',
  },
  java: {
    displayName: 'Java',
    sampleCode:
      'public class Main {\n' +
      '  public static void main(String[] args) {\n' +
      '    System.out.println("hello, world");\n' +
      '  }\n' +
      '}',
  },
  javadoc: {
    displayName: 'Javadoc',
    sampleCode: '/**\n * foo\n * @param bar baz\n */',
  },
  javascript: {
    displayName: 'JavaScript',
    sampleCode: 'console.log("hello, world");',
  },
  jinja: {
    displayName: 'Jinja',
    sampleCode: '{% set foo = "bar" %}{{ foo }}',
  },
  'jinja-inline': {
    displayName: 'Jinja Inline',
    sampleCode: '{# foo #}',
  },
  jjdescription: {
    displayName: 'Jujutsu Description',
    sampleCode: 'foo\n\nJJ: bar\n',
  },
  jq: {
    displayName: 'jq',
    sampleCode: '.foo | length',
  },
  jsdoc: {
    displayName: 'JSDoc',
    sampleCode: '/**\n * @param {string} foo\n * @returns {string}\n */',
  },
  json: {
    displayName: 'JSON',
    sampleCode: '{\n  "message": "hello, world"\n}',
  },
  json5: {
    displayName: 'JSON5',
    sampleCode: '{\n  message: "hello, world",\n}',
  },
  jsonnet: {
    displayName: 'Jsonnet',
    sampleCode: '{ foo: "bar" }',
  },
  julia: {
    displayName: 'Julia',
    sampleCode: 'function foo(bar)\n  println(bar)\nend\n\nfoo("baz")',
  },
  just: {
    displayName: 'Just',
    sampleCode: 'default:\n  echo "hello, world"',
  },
  kcl: {
    displayName: 'KCL',
    sampleCode: 'schema Foo:\n    bar: str\n\nfoo = Foo {bar = "baz"}\n',
  },
  kconfig: {
    displayName: 'Kconfig',
    sampleCode: 'config FOO\n  bool "bar"\n',
  },
  kdl: {
    displayName: 'KDL',
    sampleCode: 'foo bar="baz"\n',
  },
  kitty: {
    displayName: 'Kitty Config',
    sampleCode: 'font_family foo\nfont_size 12\n',
  },
  kos: {
    displayName: 'Kos',
    sampleCode: 'const foo = "bar";',
  },
  kotlin: {
    displayName: 'Kotlin',
    sampleCode: 'fun main() {\n  println("foo")\n}',
  },
  koto: {
    displayName: 'Koto',
    sampleCode: 'foo = |bar| bar\nfoo "baz"\n',
  },
  kusto: {
    displayName: 'Kusto',
    sampleCode: 'foo\n| where bar == "baz"',
  },
  lalrpop: {
    displayName: 'LALRPOP',
    sampleCode: 'grammar;\npub Foo: () = "bar" => ();',
  },
  latex: {
    displayName: 'LaTeX',
    sampleCode:
      '\\documentclass{article}\n\\begin{document}\nfoo \\textbf{bar}\n\\end{document}\n',
  },
  lean: {
    displayName: 'Lean',
    sampleCode: 'def foo : Nat := 1\n',
  },
  ledger: {
    displayName: 'Ledger',
    sampleCode: '2026/01/01 foo\n    bar    1 USD\n    baz\n',
  },
  leo: {
    displayName: 'Leo',
    sampleCode:
      'program foo.aleo {\n  transition bar(public baz: u32) -> u32 {\n    return baz;\n  }\n}',
  },
  linkerscript: {
    displayName: 'Linker Script',
    sampleCode: 'SECTIONS { .text : { *(.text) } }',
  },
  liquid: {
    displayName: 'Liquid',
    sampleCode: '{% assign foo = "bar" %}\n{{ foo }}',
  },
  liquidsoap: {
    displayName: 'Liquidsoap',
    sampleCode: 'foo = "bar"\nprint(foo)\n',
  },
  llvm: {
    displayName: 'LLVM',
    sampleCode: 'define i32 @foo() {\nentry:\n  ret i32 0\n}',
  },
  lua: {
    displayName: 'Lua',
    sampleCode: 'local function foo(bar)\n  print(bar)\nend\n\nfoo("baz")',
  },
  luadoc: {
    displayName: 'LuaDoc',
    sampleCode: '@param foo string\n@return string',
  },
  luap: {
    displayName: 'Lua Patterns',
    sampleCode: '[a-z]+',
  },
  luau: {
    displayName: 'Luau',
    sampleCode: 'local function foo(bar)\n  return bar\nend',
  },
  m68k: {
    displayName: 'Motorola 68000',
    sampleCode: 'foo:\n  move.l #1,d0\n  rts\n',
  },
  make: {
    displayName: 'Make',
    sampleCode: 'foo:\n\techo bar\n',
  },
  markdown: {
    displayName: 'Markdown',
    sampleCode: '# Foo\n\nbar baz',
  },
  'markdown-inline': {
    displayName: 'Markdown Inline',
    sampleCode: '*foo* and [bar](https://example.com)',
  },
  matlab: {
    displayName: 'MATLAB',
    sampleCode: 'function y = foo(x)\ny = x + 1;\nend\n',
  },
  menhir: {
    displayName: 'Menhir',
    sampleCode: '%token FOO\n%start <unit> foo\n%%\nfoo: FOO { () }\n',
  },
  mermaid: {
    displayName: 'Mermaid',
    sampleCode: 'flowchart TB\n  Foo --> Bar\n',
  },
  meson: {
    displayName: 'Meson',
    sampleCode: "project('foo', 'c')\nexecutable('bar', 'bar.c')",
  },
  mlir: {
    displayName: 'MLIR',
    sampleCode: 'module {\n  func.func @foo() {\n    return\n  }\n}',
  },
  move: {
    displayName: 'Move',
    sampleCode: 'module 0x1::foo {\n  fun bar() {}\n}\n',
  },
  nasm: {
    displayName: 'NASM',
    sampleCode: 'section .text\nfoo:\n  mov eax, 1\n  ret\n',
  },
  nginx: {
    displayName: 'Nginx',
    sampleCode: 'server {\n  listen 80;\n  server_name foo;\n}\n',
  },
  nickel: {
    displayName: 'Nickel',
    sampleCode: '{ foo = "bar" }',
  },
  nim: {
    displayName: 'Nim',
    sampleCode: 'proc foo(): string =\n  "bar"\n',
  },
  'nim-format-string': {
    displayName: 'Nim Format String',
    sampleCode: 'foo {bar}',
  },
  ninja: {
    displayName: 'Ninja',
    sampleCode: 'rule foo\n  command = echo bar\nbuild baz: foo\n',
  },
  nix: {
    displayName: 'Nix',
    sampleCode: '{ foo = "bar"; }',
  },
  nqc: {
    displayName: 'NQC',
    sampleCode: 'task main() {\n  OnFwd(OUT_A, 75);\n}',
  },
  nu: {
    displayName: 'Nushell',
    sampleCode: 'def foo [] { echo bar }\n',
  },
  objc: {
    displayName: 'Objective-C',
    sampleCode: '@interface Foo\n- (void)bar;\n@end',
  },
  objdump: {
    displayName: 'Objdump',
    sampleCode: '0000000000000000 <foo>:\n   0:\t90\tnop\n',
  },
  ocaml: {
    displayName: 'OCaml',
    sampleCode: 'let foo bar =\n  print_endline bar\n\nlet () = foo "baz"',
  },
  'ocaml-interface': {
    displayName: 'OCaml Interface',
    sampleCode: 'val foo : string -> string\n',
  },
  ocamllex: {
    displayName: 'OCamllex',
    sampleCode: 'rule foo = parse\n  | "bar" { () }\n',
  },
  odin: {
    displayName: 'Odin',
    sampleCode: 'package foo\n\nbar :: proc() {}',
  },
  pascal: {
    displayName: 'Pascal',
    sampleCode: "program foo;\nbegin\n  writeln('bar');\nend.\n",
  },
  passwd: {
    displayName: 'Passwd',
    sampleCode: 'foo:x:1000:1000:bar:/home/foo:/bin/sh\n',
  },
  pem: {
    displayName: 'PEM',
    sampleCode: '-----BEGIN FOO-----\nbar\n-----END FOO-----',
  },
  php: {
    displayName: 'PHP',
    sampleCode: '<?php\n\necho "hello, world\\n";\n',
  },
  'php-only': {
    displayName: 'PHP Only',
    sampleCode: 'function foo($bar) {\n  return $bar;\n}',
  },
  phpdoc: {
    displayName: 'PHPDoc',
    sampleCode: '/**\n * @param string $foo\n * @return string\n */',
  },
  pioasm: {
    displayName: 'PIO Assembly',
    sampleCode: '.program foo\n    set pins, 1\n',
  },
  pkl: {
    displayName: 'Pkl',
    sampleCode: 'foo = "bar"\n',
  },
  po: {
    displayName: 'PO',
    sampleCode: 'msgid "foo"\nmsgstr "bar"\n',
  },
  'poe-filter': {
    displayName: 'PoE Filter',
    sampleCode: 'Show\n  Class "foo"\n',
  },
  pony: {
    displayName: 'Pony',
    sampleCode:
      'actor Main\n  new create(env: Env) =>\n    env.out.print("foo")',
  },
  powershell: {
    displayName: 'PowerShell',
    sampleCode: 'function Foo {\n  Write-Output "bar"\n}\n\nFoo',
  },
  printf: {
    displayName: 'Printf',
    sampleCode: '%s %d',
  },
  prisma: {
    displayName: 'Prisma',
    sampleCode: 'model Foo {\n  id Int @id\n  bar String\n}',
  },
  promql: {
    displayName: 'PromQL',
    sampleCode: 'foo{bar="baz"}',
  },
  properties: {
    displayName: 'Properties',
    sampleCode: 'foo=bar',
  },
  proto: {
    displayName: 'Protocol Buffers',
    sampleCode: 'syntax = "proto3";\nmessage Foo {\n  string bar = 1;\n}\n',
  },
  prql: {
    displayName: 'PRQL',
    sampleCode: 'from foo\nfilter bar == "baz"\ntake 10\n',
  },
  psv: {
    displayName: 'PSV',
    sampleCode: 'foo|bar\nbaz|qux\n',
  },
  pug: {
    displayName: 'Pug',
    sampleCode: 'html\n  body\n    p foo\n',
  },
  puppet: {
    displayName: 'Puppet',
    sampleCode: "file { 'foo':\n  ensure => present,\n}",
  },
  purescript: {
    displayName: 'PureScript',
    sampleCode: 'module Foo where\n\nbar = "baz"',
  },
  pymanifest: {
    displayName: 'Python Manifest',
    sampleCode: 'include foo\n',
  },
  python: {
    displayName: 'Python',
    sampleCode: 'print("hello, world")',
  },
  ql: {
    displayName: 'QL',
    sampleCode: 'from string foo\nselect foo',
  },
  'ql-dbscheme': {
    displayName: 'QL Dbscheme',
    sampleCode: '@foo = @bar | @baz;',
  },
  qmldir: {
    displayName: 'QML Directory',
    sampleCode: 'module Foo\nBar 1.0 Bar.qml\n',
  },
  qmljs: {
    displayName: 'QMLJS',
    sampleCode: 'Item {\n  property string foo: "bar"\n}',
  },
  query: {
    displayName: 'Query',
    sampleCode: '(function_item\n  name: (identifier) @function)',
  },
  r: {
    displayName: 'R',
    sampleCode: 'foo <- function(bar) {\n  print(bar)\n}\n\nfoo("baz")',
  },
  racket: {
    displayName: 'Racket',
    sampleCode: '#lang racket\n\n(define (foo bar)\n  bar)',
  },
  ralph: {
    displayName: 'Ralph',
    sampleCode:
      'Contract Foo() {\n  pub fn bar() -> U256 {\n    return 1\n  }\n}',
  },
  rasi: {
    displayName: 'Rasi',
    sampleCode: '* {\n  background-color: #ffffff;\n}',
  },
  razor: {
    displayName: 'Razor',
    sampleCode: '<div>@foo</div>',
  },
  rbs: {
    displayName: 'RBS',
    sampleCode: 'class Foo\n  def bar: (String) -> String\nend\n',
  },
  re2c: {
    displayName: 're2c',
    sampleCode: '/*!re2c\n  * { return 0; }\n*/',
  },
  readline: {
    displayName: 'Readline',
    sampleCode: 'set editing-mode vi\n',
  },
  regex: {
    displayName: 'Regex',
    sampleCode: '^(foo|bar)+$',
  },
  rego: {
    displayName: 'Rego',
    sampleCode: 'package foo\n\nallow {\n  input.bar\n}\n',
  },
  requirements: {
    displayName: 'Requirements',
    sampleCode: 'foo==1.0.0\n',
  },
  rescript: {
    displayName: 'ReScript',
    sampleCode: 'let foo = bar => bar',
  },
  rifleconf: {
    displayName: 'Rifle Config',
    sampleCode: 'ext foo = bar "$@"\n',
  },
  robot: {
    displayName: 'Robot Framework',
    sampleCode: '*** Test Cases ***\nFoo\n    Log    bar\n',
  },
  'robots-txt': {
    displayName: 'Robots.txt',
    sampleCode: 'User-agent: *\nDisallow: /foo/\n',
  },
  roc: {
    displayName: 'Roc',
    sampleCode: 'foo = "bar"\n',
  },
  ron: {
    displayName: 'RON',
    sampleCode: '(foo: "bar")',
  },
  rst: {
    displayName: 'reStructuredText',
    sampleCode: 'Foo\n===\n\n**bar**\n',
  },
  ruby: {
    displayName: 'Ruby',
    sampleCode: 'def foo(bar)\n  puts bar\nend\n\nfoo("baz")',
  },
  runescript: {
    displayName: 'RuneScript',
    sampleCode: '[proc,foo]\nreturn;\n',
  },
  rust: {
    displayName: 'Rust',
    sampleCode: 'fn main() {\n  println!("hello, world");\n}',
  },
  scala: {
    displayName: 'Scala',
    sampleCode:
      'object Foo {\n  def main(args: Array[String]): Unit = {\n    println("bar")\n  }\n}',
  },
  scfg: {
    displayName: 'SCFG',
    sampleCode: 'foo bar {\n  baz qux\n}\n',
  },
  scheme: {
    displayName: 'Scheme',
    sampleCode: '(define (foo bar)\n  bar)\n',
  },
  scss: {
    displayName: 'SCSS',
    sampleCode: '$foo: #fff;\n.bar {\n  color: $foo;\n}',
  },
  sflog: {
    displayName: 'Salesforce Log',
    sampleCode: '60.0 APEX_CODE,DEBUG\n12:00:00.0 (1)|EXECUTION_STARTED\n',
  },
  slang: {
    displayName: 'Slang',
    sampleCode: 'void foo() {}',
  },
  slim: {
    displayName: 'Slim',
    sampleCode: 'div\n  p foo\n',
  },
  slint: {
    displayName: 'Slint',
    sampleCode:
      'export component Foo inherits Window {\n  Text { text: "bar"; }\n}',
  },
  smali: {
    displayName: 'Smali',
    sampleCode: '.class public Lfoo;\n.super Ljava/lang/Object;\n',
  },
  smithy: {
    displayName: 'Smithy',
    sampleCode:
      '$version: "2"\nnamespace foo\n\nstructure Bar {\n  baz: String\n}',
  },
  snakemake: {
    displayName: 'Snakemake',
    sampleCode: 'rule foo:\n    output: "bar"\n    shell: "touch {output}"\n',
  },
  snl: {
    displayName: 'SNL',
    sampleCode:
      'program foo\nss bar {\n  state baz {\n    when () {} state baz\n  }\n}\n',
  },
  solidity: {
    displayName: 'Solidity',
    sampleCode: 'contract Foo {\n  function bar() public {}\n}',
  },
  soql: {
    displayName: 'SOQL',
    sampleCode: "SELECT Id FROM Foo WHERE Bar = 'baz'",
  },
  sosl: {
    displayName: 'SOSL',
    sampleCode: 'FIND {foo} IN ALL FIELDS RETURNING Account(Name)',
  },
  sourcepawn: {
    displayName: 'SourcePawn',
    sampleCode: 'public void foo() {\n  PrintToServer("bar");\n}',
  },
  sparql: {
    displayName: 'SPARQL',
    sampleCode: 'SELECT ?foo WHERE {\n  ?foo ?bar ?baz .\n}',
  },
  sproto: {
    displayName: 'Sproto',
    sampleCode: '.Foo {\n  bar 0 : string\n}\n',
  },
  squirrel: {
    displayName: 'Squirrel',
    sampleCode: 'function foo(bar) {\n  return bar\n}',
  },
  strace: {
    displayName: 'Strace',
    sampleCode: 'write(1, "foo", 3) = 3\n',
  },
  styled: {
    displayName: 'Styled Components',
    sampleCode: 'color: red;\n.foo { display: block; }',
  },
  supercollider: {
    displayName: 'SuperCollider',
    sampleCode: 'var foo = "bar";\nfoo.postln;',
  },
  superhtml: {
    displayName: 'SuperHTML',
    sampleCode: '<div :text="$foo">bar</div>',
  },
  surface: {
    displayName: 'Surface',
    sampleCode: '<div>{ @foo }</div>',
  },
  svelte: {
    displayName: 'Svelte',
    sampleCode:
      '<script>\n' +
      '  let foo = "bar";\n' +
      '</script>\n' +
      '\n' +
      '<h1>{foo}</h1>',
  },
  sway: {
    displayName: 'Sway',
    sampleCode: 'script;\nfn main() -> u64 {\n  1\n}',
  },
  swift: {
    displayName: 'Swift',
    sampleCode: 'func foo(_ bar: String) -> String {\n  return bar\n}\n',
  },
  sxhkdrc: {
    displayName: 'sxhkdrc',
    sampleCode: 'super + f\n    echo foo\n',
  },
  systemtap: {
    displayName: 'SystemTap',
    sampleCode: 'probe begin {\n  printf("foo\\n")\n  exit()\n}',
  },
  systemverilog: {
    displayName: 'SystemVerilog',
    sampleCode: 'module foo;\nendmodule\n',
  },
  t32: {
    displayName: 'TRACE32',
    sampleCode: 'PRINT "foo"\nENDDO\n',
  },
  tablegen: {
    displayName: 'TableGen',
    sampleCode: 'class Foo<string bar> {\n  string baz = bar;\n}',
  },
  tact: {
    displayName: 'Tact',
    sampleCode: 'contract Foo {\n  init() {}\n}',
  },
  teal: {
    displayName: 'Teal',
    sampleCode: 'local foo: string = "bar"\nprint(foo)\n',
  },
  templ: {
    displayName: 'Templ',
    sampleCode: 'package foo\n\ntempl bar() {\n  <div>baz</div>\n}\n',
  },
  tera: {
    displayName: 'Tera',
    sampleCode: '{% if foo %}{{ bar }}{% endif %}',
  },
  terraform: {
    displayName: 'Terraform',
    sampleCode: 'resource "foo" "bar" {\n  baz = "qux"\n}',
  },
  textproto: {
    displayName: 'Text Proto',
    sampleCode: 'foo: "bar"\nbaz { qux: 1 }',
  },
  thrift: {
    displayName: 'Thrift',
    sampleCode: 'namespace rs foo\nstruct Bar {\n  1: string baz\n}\n',
  },
  tiger: {
    displayName: 'Tiger',
    sampleCode: 'let\n  var foo := "bar"\nin\n  print(foo)\nend',
  },
  tlaplus: {
    displayName: 'TLA+',
    sampleCode: '---- MODULE Foo ----\nCONSTANT bar\nBaz == bar\n====\n',
  },
  todotxt: {
    displayName: 'Todo.txt',
    sampleCode: '(A) foo +bar @baz\n',
  },
  tsv: {
    displayName: 'TSV',
    sampleCode: 'foo\tbar\nbaz\tqux\n',
  },
  turtle: {
    displayName: 'Turtle',
    sampleCode: '@prefix foo: <http://example.com/> .\nfoo:bar foo:baz "qux" .',
  },
  twig: {
    displayName: 'Twig',
    sampleCode: '{% if foo %}{{ bar }}{% endif %}',
  },
  typescript: {
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
  typespec: {
    displayName: 'TypeSpec',
    sampleCode: 'model Foo {\n  bar: string;\n}',
  },
  typoscript: {
    displayName: 'TypoScript',
    sampleCode: 'foo = TEXT\nfoo.value = bar\n',
  },
  typst: {
    displayName: 'Typst',
    sampleCode: '#let foo = "bar"\n#foo\n',
  },
  udev: {
    displayName: 'udev',
    sampleCode: 'ACTION=="add", NAME="foo"\n',
  },
  ungrammar: {
    displayName: 'Ungrammar',
    sampleCode: "Foo = 'bar'\n",
  },
  unison: {
    displayName: 'Unison',
    sampleCode: 'foo = "bar"\n',
  },
  usd: {
    displayName: 'USD',
    sampleCode:
      '#usda 1.0\ndef Xform "Foo" {\n  custom string bar = "baz"\n}\n',
  },
  uxntal: {
    displayName: 'Uxntal',
    sampleCode: '|0100 @foo BRK\n',
  },
  v: {
    displayName: 'V',
    sampleCode: 'module main\n\nfn main() {\n  println("foo")\n}',
  },
  vala: {
    displayName: 'Vala',
    sampleCode: 'void main() {\n  print("foo");\n}',
  },
  vento: {
    displayName: 'Vento',
    sampleCode: '{{ if foo }}{{ bar }}{{ /if }}',
  },
  verilog: {
    displayName: 'Verilog',
    sampleCode:
      'module foo(input bar, output baz);\n  assign baz = bar;\nendmodule',
  },
  vhdl: {
    displayName: 'VHDL',
    sampleCode:
      'entity foo is\nend entity;\narchitecture bar of foo is\nbegin\nend architecture;\n',
  },
  vhs: {
    displayName: 'VHS',
    sampleCode: 'Output foo.gif\nType "echo bar"\nEnter\nSleep 1s\n',
  },
  vim: {
    displayName: 'Vimscript',
    sampleCode: 'function Foo(bar)\n  echo a:bar\nendfunction\n',
  },
  vimdoc: {
    displayName: 'Vim Help',
    sampleCode: '*foo*\n\nbar |baz|\n\n',
  },
  vrl: {
    displayName: 'VRL',
    sampleCode: '.foo = "bar"\n',
  },
  vue: {
    displayName: 'Vue',
    sampleCode: '<template>\n  <div>{{ foo }}</div>\n</template>',
  },
  wgsl: {
    displayName: 'WGSL',
    sampleCode:
      '@fragment\nfn foo() -> @location(0) vec4<f32> {\n  return vec4<f32>(1.0);\n}',
  },
  'wgsl-bevy': {
    displayName: 'WGSL Bevy',
    sampleCode:
      '@fragment\nfn foo() -> @location(0) vec4<f32> {\n  return vec4<f32>(1.0);\n}',
  },
  wing: {
    displayName: 'Wing',
    sampleCode: 'let foo = "bar";\nlog(foo);',
  },
  wit: {
    displayName: 'WIT',
    sampleCode: 'package foo:bar;\ninterface baz {\n  qux: func();\n}\n',
  },
  wxml: {
    displayName: 'WXML',
    sampleCode: '<view>{{foo}}</view>',
  },
  xcompose: {
    displayName: 'XCompose',
    sampleCode: '<Multi_key> <f> <o> <o> : "foo"\n',
  },
  xresources: {
    displayName: 'X Resources',
    sampleCode: 'Foo.bar: baz\n',
  },
  yaml: {
    displayName: 'YAML',
    sampleCode: 'message: hello, world\nitems:\n  - foo\n  - bar',
  },
  toml: {
    displayName: 'TOML',
    sampleCode: 'message = "hello, world"\nitems = ["foo", "bar"]',
  },
  xml: {
    displayName: 'XML',
    sampleCode:
      '<?xml version="1.0"?>\n' +
      '<message>\n' +
      '  <text>hello, world</text>\n' +
      '</message>',
  },
  sql: {
    displayName: 'SQL',
    sampleCode: 'select foo\nfrom bar\nwhere baz = 1;',
  },
  'ssh-config': {
    displayName: 'SSH Config',
    sampleCode: 'Host foo\n  HostName bar\n',
  },
  starlark: {
    displayName: 'Starlark',
    sampleCode: 'def foo(bar):\n    return bar',
  },
  tcl: {
    displayName: 'Tcl',
    sampleCode: 'proc foo {bar} {\n  puts $bar\n}\n',
  },
  tsx: {
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
  yang: {
    displayName: 'YANG',
    sampleCode:
      'module foo {\n  namespace "urn:foo";\n  prefix foo;\n  leaf bar { type string; }\n}',
  },
  yuck: {
    displayName: 'Yuck',
    sampleCode: '(defwidget foo []\n  (label :text "bar"))',
  },
  zig: {
    displayName: 'Zig',
    sampleCode:
      'const std = @import("std");\n\npub fn main() void {\n  std.debug.print("foo\\n", .{});\n}',
  },
  ziggy: {
    displayName: 'Ziggy',
    sampleCode: '.foo = "bar",\n',
  },
  'ziggy-schema': {
    displayName: 'Ziggy Schema',
    sampleCode: '$ = Foo\nstruct Foo {\n  bar: bytes,\n}\n',
  },
  zsh: {
    displayName: 'Zsh',
    sampleCode: 'for foo in bar; do\n  echo $foo\ndone',
  },
} satisfies Record<string, BaseLanguageConfig>;

export const languageConfig = Object.fromEntries(
  Object.entries(baseLanguageConfig).map(([name, config]) => [
    name,
    {
      ...config,
      name,
      highlightQueryPath: `tree-sitter-${name}.highlights.scm`,
      wasmPath: `tree-sitter-${name}.wasm`,
    },
  ])
) as Record<Language, LanguageConfig>;

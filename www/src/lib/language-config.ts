import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';

import { Language, LanguageConfig } from './types';

export const languageConfig: Record<Language, LanguageConfig> = {
  agda: {
    name: 'agda',
    displayName: 'Agda',
    wasmPath: 'tree-sitter-agda.wasm',
    sampleCode: 'module Foo where\n\ndata Bar : Set where\n  baz : Bar',
    extension: [],
  },
  arduino: {
    name: 'arduino',
    displayName: 'Arduino',
    wasmPath: 'tree-sitter-arduino.wasm',
    sampleCode:
      'void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n}',
    extension: [],
  },
  bash: {
    name: 'bash',
    displayName: 'Bash',
    wasmPath: 'tree-sitter-bash.wasm',
    sampleCode: 'for name in foo bar; do\n  echo "hello, $name"\ndone',
    extension: [],
  },
  beancount: {
    name: 'beancount',
    displayName: 'Beancount',
    wasmPath: 'tree-sitter-beancount.wasm',
    sampleCode: '2024-01-01 open Assets:Foo',
    extension: [],
  },
  bicep: {
    name: 'bicep',
    displayName: 'Bicep',
    wasmPath: 'tree-sitter-bicep.wasm',
    sampleCode:
      "param foo string\nresource bar 'Microsoft.Storage/storageAccounts@2023-01-01' = {\n  name: foo\n  location: resourceGroup().location\n}",
    extension: [],
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
    extension: cpp(),
  },
  'c-sharp': {
    name: 'c-sharp',
    displayName: 'C#',
    wasmPath: 'tree-sitter-c-sharp.wasm',
    sampleCode:
      'using System;\n\nclass Foo {\n  static void Main() {\n    Console.WriteLine("bar");\n  }\n}',
    extension: [],
  },
  chatito: {
    name: 'chatito',
    displayName: 'Chatito',
    wasmPath: 'tree-sitter-chatito.wasm',
    sampleCode: '%[foo]\n  bar',
    extension: [],
  },
  cmake: {
    name: 'cmake',
    displayName: 'CMake',
    wasmPath: 'tree-sitter-cmake.wasm',
    sampleCode:
      'cmake_minimum_required(VERSION 3.20)\nproject(foo)\nadd_executable(bar bar.c)',
    extension: [],
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
    extension: cpp(),
  },
  css: {
    name: 'css',
    displayName: 'CSS',
    wasmPath: 'tree-sitter-css.wasm',
    sampleCode: 'body::before {\n  content: "hello, world";\n}',
    extension: css(),
  },
  dart: {
    name: 'dart',
    displayName: 'Dart',
    wasmPath: 'tree-sitter-dart.wasm',
    sampleCode: "void main() {\n  print('foo');\n}",
    extension: [],
  },
  dockerfile: {
    name: 'dockerfile',
    displayName: 'Dockerfile',
    wasmPath: 'tree-sitter-dockerfile.wasm',
    sampleCode: 'FROM alpine\nRUN echo foo',
    extension: [],
  },
  elixir: {
    name: 'elixir',
    displayName: 'Elixir',
    wasmPath: 'tree-sitter-elixir.wasm',
    sampleCode:
      'defmodule Foo do\n  def bar do\n    IO.puts("baz")\n  end\nend',
    extension: [],
  },
  'embedded-template': {
    name: 'embedded-template',
    displayName: 'Embedded Template',
    wasmPath: 'tree-sitter-embedded-template.wasm',
    sampleCode: '<p><%= foo %></p>',
    extension: [],
  },
  gleam: {
    name: 'gleam',
    displayName: 'Gleam',
    wasmPath: 'tree-sitter-gleam.wasm',
    sampleCode: 'pub fn main() {\n  "foo"\n}',
    extension: [],
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
    extension: go(),
  },
  graphql: {
    name: 'graphql',
    displayName: 'GraphQL',
    wasmPath: 'tree-sitter-graphql.wasm',
    sampleCode: 'query Foo {\n  bar {\n    baz\n  }\n}',
    extension: [],
  },
  haskell: {
    name: 'haskell',
    displayName: 'Haskell',
    wasmPath: 'tree-sitter-haskell.wasm',
    sampleCode: 'module Main where\n\nmain :: IO ()\nmain = putStrLn "foo"',
    extension: [],
  },
  hcl: {
    name: 'hcl',
    displayName: 'HCL',
    wasmPath: 'tree-sitter-hcl.wasm',
    sampleCode: 'resource "foo" "bar" {\n  name = "baz"\n}',
    extension: [],
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
    extension: html(),
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
    extension: java(),
  },
  javascript: {
    name: 'javascript',
    displayName: 'JavaScript',
    wasmPath: 'tree-sitter-javascript.wasm',
    sampleCode: 'console.log("hello, world");',
    extension: javascript(),
  },
  jsdoc: {
    name: 'jsdoc',
    displayName: 'JSDoc',
    wasmPath: 'tree-sitter-jsdoc.wasm',
    sampleCode: '/**\n * @param {string} foo\n * @returns {string}\n */',
    extension: [],
  },
  json: {
    name: 'json',
    displayName: 'JSON',
    wasmPath: 'tree-sitter-json.wasm',
    sampleCode: '{\n  "message": "hello, world"\n}',
    extension: json(),
  },
  julia: {
    name: 'julia',
    displayName: 'Julia',
    wasmPath: 'tree-sitter-julia.wasm',
    sampleCode: 'function foo(bar)\n  println(bar)\nend\n\nfoo("baz")',
    extension: [],
  },
  just: {
    name: 'just',
    displayName: 'Just',
    wasmPath: 'tree-sitter-just.wasm',
    sampleCode: 'default:\n  echo "hello, world"',
    extension: [],
  },
  kotlin: {
    name: 'kotlin',
    displayName: 'Kotlin',
    wasmPath: 'tree-sitter-kotlin.wasm',
    sampleCode: 'fun main() {\n  println("foo")\n}',
    extension: [],
  },
  lua: {
    name: 'lua',
    displayName: 'Lua',
    wasmPath: 'tree-sitter-lua.wasm',
    sampleCode: 'local function foo(bar)\n  print(bar)\nend\n\nfoo("baz")',
    extension: [],
  },
  make: {
    name: 'make',
    displayName: 'Make',
    wasmPath: 'tree-sitter-make.wasm',
    sampleCode: 'foo:\n\techo bar',
    extension: [],
  },
  markdown: {
    name: 'markdown',
    displayName: 'Markdown',
    wasmPath: 'tree-sitter-markdown.wasm',
    sampleCode: '# Foo\n\nbar baz',
    extension: markdown(),
  },
  nix: {
    name: 'nix',
    displayName: 'Nix',
    wasmPath: 'tree-sitter-nix.wasm',
    sampleCode: '{ foo = "bar"; }',
    extension: [],
  },
  ocaml: {
    name: 'ocaml',
    displayName: 'OCaml',
    wasmPath: 'tree-sitter-ocaml.wasm',
    sampleCode: 'let foo bar =\n  print_endline bar\n\nlet () = foo "baz"',
    extension: [],
  },
  php: {
    name: 'php',
    displayName: 'PHP',
    wasmPath: 'tree-sitter-php.wasm',
    sampleCode: '<?php\n\necho "hello, world\\n";\n',
    extension: php(),
  },
  powershell: {
    name: 'powershell',
    displayName: 'PowerShell',
    wasmPath: 'tree-sitter-powershell.wasm',
    sampleCode: 'function Foo {\n  Write-Output "bar"\n}\n\nFoo',
    extension: [],
  },
  python: {
    name: 'python',
    displayName: 'Python',
    wasmPath: 'tree-sitter-python.wasm',
    sampleCode: 'print("hello, world")',
    extension: python(),
  },
  query: {
    name: 'query',
    displayName: 'Query',
    wasmPath: 'tree-sitter-query.wasm',
    sampleCode: '(function_item\n  name: (identifier) @function)',
    extension: [],
  },
  r: {
    name: 'r',
    displayName: 'R',
    wasmPath: 'tree-sitter-r.wasm',
    sampleCode: 'foo <- function(bar) {\n  print(bar)\n}\n\nfoo("baz")',
    extension: [],
  },
  regex: {
    name: 'regex',
    displayName: 'Regex',
    wasmPath: 'tree-sitter-regex.wasm',
    sampleCode: '^(foo|bar)+$',
    extension: [],
  },
  ruby: {
    name: 'ruby',
    displayName: 'Ruby',
    wasmPath: 'tree-sitter-ruby.wasm',
    sampleCode: 'def foo(bar)\n  puts bar\nend\n\nfoo("baz")',
    extension: [],
  },
  rust: {
    name: 'rust',
    displayName: 'Rust',
    wasmPath: 'tree-sitter-rust.wasm',
    sampleCode: 'fn main() {\n  println!("hello, world");\n}',
    extension: rust(),
  },
  scala: {
    name: 'scala',
    displayName: 'Scala',
    wasmPath: 'tree-sitter-scala.wasm',
    sampleCode:
      'object Foo {\n  def main(args: Array[String]): Unit = {\n    println("bar")\n  }\n}',
    extension: [],
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
    extension: javascript({ typescript: true }),
  },
  verilog: {
    name: 'verilog',
    displayName: 'Verilog',
    wasmPath: 'tree-sitter-verilog.wasm',
    sampleCode:
      'module foo(input bar, output baz);\n  assign baz = bar;\nendmodule',
    extension: [],
  },
  yaml: {
    name: 'yaml',
    displayName: 'YAML',
    wasmPath: 'tree-sitter-yaml.wasm',
    sampleCode: 'message: hello, world\nitems:\n  - foo\n  - bar',
    extension: [],
  },
  toml: {
    name: 'toml',
    displayName: 'TOML',
    wasmPath: 'tree-sitter-toml.wasm',
    sampleCode: 'message = "hello, world"\nitems = ["foo", "bar"]',
    extension: [],
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
    extension: xml(),
  },
  sql: {
    name: 'sql',
    displayName: 'SQL',
    wasmPath: 'tree-sitter-sql.wasm',
    sampleCode: 'select foo\nfrom bar\nwhere baz = 1;',
    extension: sql(),
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
    extension: javascript({ jsx: true, typescript: true }),
  },
  zig: {
    name: 'zig',
    displayName: 'Zig',
    wasmPath: 'tree-sitter-zig.wasm',
    sampleCode:
      'const std = @import("std");\n\npub fn main() void {\n  std.debug.print("foo\\n", .{});\n}',
    extension: [],
  },
};

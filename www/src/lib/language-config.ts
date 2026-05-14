import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';

import { Language, LanguageConfig } from './types';

export const languageConfig: Record<Language, LanguageConfig> = {
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
  json: {
    name: 'json',
    displayName: 'JSON',
    wasmPath: 'tree-sitter-json.wasm',
    sampleCode: '{\n  "message": "hello, world"\n}',
    extension: json(),
  },
  just: {
    name: 'just',
    displayName: 'Just',
    wasmPath: 'tree-sitter-just.wasm',
    sampleCode: 'default:\n  echo "hello, world"',
    extension: [],
  },
  php: {
    name: 'php',
    displayName: 'PHP',
    wasmPath: 'tree-sitter-php.wasm',
    sampleCode: '<?php\n\necho "hello, world\\n";\n',
    extension: php(),
  },
  python: {
    name: 'python',
    displayName: 'Python',
    wasmPath: 'tree-sitter-python.wasm',
    sampleCode: 'print("hello, world")',
    extension: python(),
  },
  rust: {
    name: 'rust',
    displayName: 'Rust',
    wasmPath: 'tree-sitter-rust.wasm',
    sampleCode: 'fn main() {\n  println!("hello, world");\n}',
    extension: rust(),
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
};

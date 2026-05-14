import { Extension } from '@codemirror/state';

export type Language =
  | 'agda'
  | 'bash'
  | 'c'
  | 'c-sharp'
  | 'cpp'
  | 'css'
  | 'dart'
  | 'dockerfile'
  | 'elixir'
  | 'embedded-template'
  | 'gleam'
  | 'go'
  | 'graphql'
  | 'haskell'
  | 'hcl'
  | 'html'
  | 'java'
  | 'javascript'
  | 'jsdoc'
  | 'json'
  | 'julia'
  | 'just'
  | 'kotlin'
  | 'lua'
  | 'make'
  | 'markdown'
  | 'nix'
  | 'ocaml'
  | 'php'
  | 'powershell'
  | 'python'
  | 'query'
  | 'r'
  | 'regex'
  | 'ruby'
  | 'rust'
  | 'scala'
  | 'typescript'
  | 'verilog'
  | 'yaml'
  | 'toml'
  | 'xml'
  | 'sql'
  | 'tsx'
  | 'zig';

export interface LanguageConfig {
  name: Language;
  displayName: string;
  wasmPath: string;
  sampleCode: string;
  extension: Extension;
}

export interface SyntaxNode {
  id?: number;
  type: string;
  text: string;
  startPosition: { row: number; column: number };
  endPosition: { row: number; column: number };
  childCount: number;
  children: SyntaxNode[];
}

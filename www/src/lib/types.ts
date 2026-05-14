import { Extension } from '@codemirror/state';

export type Language =
  | 'agda'
  | 'bash'
  | 'c'
  | 'c-sharp'
  | 'cpp'
  | 'css'
  | 'dockerfile'
  | 'go'
  | 'haskell'
  | 'hcl'
  | 'html'
  | 'java'
  | 'javascript'
  | 'jsdoc'
  | 'json'
  | 'julia'
  | 'just'
  | 'lua'
  | 'make'
  | 'markdown'
  | 'ocaml'
  | 'php'
  | 'python'
  | 'query'
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
  | 'tsx';

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

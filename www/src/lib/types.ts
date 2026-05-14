import { Extension } from '@codemirror/state';

export type Language =
  | 'agda'
  | 'bash'
  | 'c'
  | 'c-sharp'
  | 'cpp'
  | 'css'
  | 'go'
  | 'haskell'
  | 'html'
  | 'java'
  | 'javascript'
  | 'jsdoc'
  | 'json'
  | 'julia'
  | 'just'
  | 'markdown'
  | 'ocaml'
  | 'php'
  | 'python'
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

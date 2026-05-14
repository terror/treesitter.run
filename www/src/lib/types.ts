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
  | 'just'
  | 'php'
  | 'python'
  | 'rust'
  | 'typescript'
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

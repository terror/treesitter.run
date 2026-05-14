import { Extension } from '@codemirror/state';

export type Language =
  | 'bash'
  | 'c'
  | 'cpp'
  | 'css'
  | 'go'
  | 'html'
  | 'java'
  | 'javascript'
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

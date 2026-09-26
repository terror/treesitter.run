import type { Node } from 'web-tree-sitter';

import type { baseLanguageConfig } from './language-config';

export type Language = keyof typeof baseLanguageConfig;

export interface LanguageConfig {
  name: Language;
  displayName: string;
  wasmPath: string;
  highlightQueryPath: string;
  sampleCode: string;
}

export interface ParserMetadata {
  repository: string;
  revision: string;
  sourcePath?: string;
}

export interface SyntaxRange {
  from: number;
  to: number;
}

export interface QueryCapture {
  name: string;
  node: Node;
  range: SyntaxRange;
}

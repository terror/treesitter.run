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

export interface SyntaxNode {
  id?: number;
  typeId: number;
  grammarId: number;
  grammarType: string;
  type: string;
  text: string;
  isNamed: boolean;
  isExtra: boolean;
  isError: boolean;
  isMissing: boolean;
  hasError: boolean;
  hasChanges: boolean;
  startIndex: number;
  endIndex: number;
  startPosition: { row: number; column: number };
  endPosition: { row: number; column: number };
  parseState: number;
  nextParseState: number;
  childCount: number;
  namedChildCount: number;
  descendantCount: number;
  parent: SyntaxNode | null;
  children: SyntaxNode[];
  child: (index: number) => SyntaxNode | null;
  equals: (other: SyntaxNode) => boolean;
  fieldNameForChild: (index: number) => string | null;
}

export interface SyntaxRange {
  from: number;
  to: number;
}

export interface QueryCapture {
  name: string;
  node: SyntaxNode;
  range: SyntaxRange;
}

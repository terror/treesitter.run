import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Language, Parser, Tree } from 'web-tree-sitter';

import type { SyntaxNode } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parse = ({
  parser,
  language,
  code,
}: {
  parser: Parser;
  language: Language;
  code: string;
}): Tree | null => {
  parser.setLanguage(language);
  return parser.parse(code);
};

export const syntaxNodeKey = (node: SyntaxNode): string =>
  `${node.typeId}:${node.startIndex}:${node.endIndex}`;

import type { Text } from '@codemirror/state';

import type { SyntaxNode } from './types';
import { positionToOffset } from './utils';

export type ParseErrorKind = 'error' | 'missing';

export interface ParseErrorRange {
  kind: ParseErrorKind;
  type: string;
  from: number;
  to: number;
}

export const parseErrorKind = (
  node: SyntaxNode
): ParseErrorKind | undefined => {
  if (node.isMissing) {
    return 'missing';
  }

  if (node.isError || node.type === 'ERROR') {
    return 'error';
  }

  return undefined;
};

export const parseErrorLabel = (node: SyntaxNode): string => {
  if (node.isMissing) {
    return `MISSING ${node.type}`;
  }

  return node.type;
};

export const collectParseErrors = (
  root: SyntaxNode,
  doc: Text
): ParseErrorRange[] => {
  const ranges: ParseErrorRange[] = [];

  const walk = (node: SyntaxNode) => {
    const kind = parseErrorKind(node);

    if (kind) {
      const from = positionToOffset(node.startPosition, doc);
      const to = positionToOffset(node.endPosition, doc);

      if (from !== null && to !== null) {
        ranges.push({
          kind,
          type: node.type,
          from,
          to,
        });
      }
    }

    node.children.forEach(walk);
  };

  walk(root);

  return ranges.sort((a, b) => a.from - b.from || a.to - b.to);
};

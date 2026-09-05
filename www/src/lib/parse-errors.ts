import type { SyntaxNode } from './types';

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

export const collectParseErrors = (root: SyntaxNode): ParseErrorRange[] => {
  const ranges: ParseErrorRange[] = [];

  const walk = (node: SyntaxNode) => {
    const kind = parseErrorKind(node);

    if (kind) {
      ranges.push({
        kind,
        type: node.type,
        from: node.startIndex,
        to: node.endIndex,
      });
    }

    node.children.forEach(walk);
  };

  walk(root);

  return ranges.sort((a, b) => a.from - b.from || a.to - b.to);
};

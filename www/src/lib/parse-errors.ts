import type { Node } from 'web-tree-sitter';

export type ParseErrorKind = 'error' | 'missing';

export interface ParseErrorRange {
  kind: ParseErrorKind;
  type: string;
  from: number;
  to: number;
}

export const parseErrorKind = (node: Node): ParseErrorKind | undefined => {
  if (node.isMissing) {
    return 'missing';
  }

  if (node.isError || node.type === 'ERROR') {
    return 'error';
  }

  return undefined;
};

export const collectParseErrors = (root: Node): ParseErrorRange[] => {
  const ranges: ParseErrorRange[] = [];

  const walk = (node: Node | null) => {
    if (!node) {
      return;
    }

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

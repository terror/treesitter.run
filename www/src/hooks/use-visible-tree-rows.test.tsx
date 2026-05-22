import { describe, expect, it } from 'bun:test';

import { collectVisibleTreeNodes } from '../lib/tree-filter';
import type { SyntaxNode } from '../lib/types';
import { syntaxNodeKey } from '../lib/utils';
import { collectVisibleTreeRows } from './use-visible-tree-rows';

let nextNodeId = 0;

const node = ({
  type = 'foo',
  isNamed = true,
  isExtra = false,
  isError = false,
  isMissing = false,
  children = [],
}: Partial<SyntaxNode>): SyntaxNode => {
  const id = nextNodeId++;

  return {
    id,
    typeId: id,
    grammarId: 0,
    grammarType: type,
    type,
    text: '',
    isNamed,
    isExtra,
    isError,
    isMissing,
    hasError: false,
    hasChanges: false,
    startIndex: id,
    endIndex: id + 1,
    startPosition: { row: 0, column: 0 },
    endPosition: { row: 0, column: 0 },
    parseState: 0,
    nextParseState: 0,
    childCount: children.length,
    namedChildCount: children.length,
    descendantCount: children.length + 1,
    parent: null,
    children,
    child: (index) => children[index] ?? null,
    equals: (other) => other.id === id,
    fieldNameForChild: () => null,
  };
};

describe('visible tree rows', () => {
  it('respects expansion state while filters are active', () => {
    const child = node({ type: 'bar', isNamed: false });
    const parent = node({ type: 'foo', children: [child] });
    const root = node({ type: 'root', children: [parent] });

    const visibleTree = collectVisibleTreeNodes({
      root,
      filters: {
        named: false,
        anonymous: true,
        extra: false,
        error: true,
        missing: true,
      },
      search: '',
    });

    const check = (expandedNodes: Set<string>, expected: string[]) => {
      expect(
        collectVisibleTreeRows({ expandedNodes, root, visibleTree }).map(
          (row) => row.node.type
        )
      ).toEqual(expected);
    };

    check(new Set([syntaxNodeKey(root)]), ['root', 'foo']);
    check(new Set([syntaxNodeKey(root), syntaxNodeKey(parent)]), [
      'root',
      'foo',
      'bar',
    ]);
  });
});

import { describe, expect, it } from 'bun:test';
import assert from 'node:assert/strict';

import { collectVisibleTreeNodes } from '../lib/tree-filter';
import { syntaxNodeKey } from '../lib/utils';
import { createTestParser } from '../test/parser';
import { type TreeRow, collectVisibleTreeRows } from './use-visible-tree-rows';

const parse = createTestParser();

describe('visible tree rows', () => {
  it('respects expansion state and skips null children while filters are active', () => {
    const root = parse('foo;');
    const parent = root.children[0];

    assert(parent);

    const child = parent.children[1];

    assert(child);

    root.children.unshift(null);
    parent.children.push(null);
    child.children.push(null);

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

    const check = (collapsedNodes: Set<string>, expected: TreeRow[]) => {
      expect(
        collectVisibleTreeRows({ collapsedNodes, root, visibleTree })
      ).toEqual(expected);
    };

    check(new Set([syntaxNodeKey(parent)]), [
      { node: root, hasChildren: true, isExpanded: true, level: 0 },
      { node: parent, hasChildren: true, isExpanded: false, level: 1 },
    ]);
    check(new Set(), [
      { node: root, hasChildren: true, isExpanded: true, level: 0 },
      { node: parent, hasChildren: true, isExpanded: true, level: 1 },
      { node: child, hasChildren: false, isExpanded: true, level: 2 },
    ]);
  });
});

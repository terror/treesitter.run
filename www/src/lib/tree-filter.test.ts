import { describe, expect, it } from 'bun:test';

import {
  collectVisibleTreeNodes,
  defaultTreeNodeFilters,
  treeNodeMatchesFilters,
} from './tree-filter';
import type { SyntaxNode } from './types';

const node = ({
  type = 'foo',
  isNamed = true,
  isExtra = false,
  children = [],
}: Partial<SyntaxNode>): SyntaxNode => ({
  id: 0,
  type,
  text: '',
  isNamed,
  isExtra,
  isError: false,
  isMissing: false,
  hasError: false,
  startPosition: { row: 0, column: 0 },
  endPosition: { row: 0, column: 0 },
  childCount: children.length,
  children,
});

describe('tree filters', () => {
  it('filters anonymous nodes without losing ancestor context', () => {
    const anonymous = node({ type: 'bar', isNamed: false });
    const named = node({ type: 'baz' });
    const root = node({ type: 'root', children: [anonymous, named] });

    const { visibleNodes } = collectVisibleTreeNodes({
      root,
      filters: {
        named: false,
        anonymous: true,
        extra: false,
      },
      search: '',
    });

    expect(visibleNodes.has(root)).toBe(true);
    expect(visibleNodes.has(anonymous)).toBe(true);
    expect(visibleNodes.has(named)).toBe(false);
  });

  it('keeps ancestors of search matches visible', () => {
    const match = node({ type: 'bar' });
    const parent = node({ type: 'foo', children: [match] });
    const sibling = node({ type: 'baz' });
    const root = node({ type: 'root', children: [parent, sibling] });

    const { visibleNodes, searchMatches, searchActive } =
      collectVisibleTreeNodes({
        root,
        filters: defaultTreeNodeFilters,
        search: 'bar',
      });

    expect(searchActive).toBe(true);
    expect(visibleNodes.has(root)).toBe(true);
    expect(visibleNodes.has(parent)).toBe(true);
    expect(visibleNodes.has(match)).toBe(true);
    expect(visibleNodes.has(sibling)).toBe(false);
    expect(searchMatches.has(match)).toBe(true);
    expect(searchMatches.has(parent)).toBe(false);
  });

  it('matches named, anonymous, and extra filters', () => {
    const filters = {
      named: true,
      anonymous: false,
      extra: false,
    };

    expect(treeNodeMatchesFilters(node({ isNamed: true }), filters)).toBe(true);
    expect(treeNodeMatchesFilters(node({ isNamed: false }), filters)).toBe(
      false
    );
    expect(
      treeNodeMatchesFilters(node({ isNamed: true, isExtra: true }), filters)
    ).toBe(false);
  });
});

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
  isError = false,
  isMissing = false,
  children = [],
}: Partial<SyntaxNode>): SyntaxNode => ({
  id: 0,
  typeId: 0,
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
  startIndex: 0,
  endIndex: 0,
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
  equals: (other) => other.id === 0,
  fieldNameForChild: () => null,
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
        error: true,
        missing: true,
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
      error: true,
      missing: true,
    };

    expect(treeNodeMatchesFilters(node({ isNamed: true }), filters)).toBe(true);
    expect(treeNodeMatchesFilters(node({ isNamed: false }), filters)).toBe(
      false
    );
    expect(
      treeNodeMatchesFilters(node({ isNamed: true, isExtra: true }), filters)
    ).toBe(false);
  });

  it('matches error and missing filters before node kind filters', () => {
    const filters = {
      named: true,
      anonymous: true,
      extra: true,
      error: false,
      missing: false,
    };

    expect(treeNodeMatchesFilters(node({ isError: true }), filters)).toBe(
      false
    );
    expect(treeNodeMatchesFilters(node({ type: 'ERROR' }), filters)).toBe(
      false
    );
    expect(treeNodeMatchesFilters(node({ isMissing: true }), filters)).toBe(
      false
    );
    expect(treeNodeMatchesFilters(node({ isNamed: true }), filters)).toBe(true);
  });

  it('filters error subtrees without keeping error nodes as ancestors', () => {
    const child = node({ type: 'identifier' });
    const error = node({ type: 'ERROR', children: [child] });
    const root = node({ type: 'root', children: [error] });

    const { visibleNodes } = collectVisibleTreeNodes({
      root,
      filters: {
        named: true,
        anonymous: true,
        extra: true,
        error: false,
        missing: true,
      },
      search: '',
    });

    expect(visibleNodes.has(root)).toBe(true);
    expect(visibleNodes.has(error)).toBe(false);
    expect(visibleNodes.has(child)).toBe(false);
  });
});

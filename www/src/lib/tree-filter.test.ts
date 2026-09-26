import { describe, expect, it } from 'bun:test';
import assert from 'node:assert/strict';

import { createTestParser } from '../test/parser';
import {
  collectVisibleTreeNodes,
  defaultTreeNodeFilters,
  treeNodeMatchesFilters,
} from './tree-filter';

const parse = createTestParser();

describe('tree filters', () => {
  it('filters anonymous nodes without losing ancestor context', () => {
    const root = parse('foo;');
    const parent = root.children[0];

    assert(parent);

    const anonymous = parent.children[1];

    assert(anonymous);

    expect(
      collectVisibleTreeNodes({
        root,
        filters: {
          named: false,
          anonymous: true,
          extra: false,
          error: true,
          missing: true,
        },
        search: '',
      })
    ).toEqual({
      visibleNodes: new Set([anonymous, parent, root]),
      searchMatches: new Set(),
    });
  });

  it('keeps ancestors of search matches visible and skips null children', () => {
    const root = parse('foo; {}');
    const parent = root.children[0];

    assert(parent);

    const match = parent.children[0];

    assert(match);

    root.children.unshift(null);
    parent.children.push(null);

    expect(
      collectVisibleTreeNodes({
        root,
        filters: defaultTreeNodeFilters,
        search: 'identifier',
      })
    ).toEqual({
      visibleNodes: new Set([match, parent, root]),
      searchMatches: new Set([match]),
    });
  });

  it('matches named, anonymous, and extra filters', () => {
    const root = parse('foo; /* bar */');
    const [named, extra] = root.children;

    assert(named && extra);

    const anonymous = named.children[1];

    assert(anonymous);

    const filters = {
      named: true,
      anonymous: false,
      extra: false,
      error: true,
      missing: true,
    };

    expect(
      [named, anonymous, extra].map((node) =>
        treeNodeMatchesFilters(node, filters)
      )
    ).toEqual([true, false, false]);
  });

  it('matches error and missing filters before node kind filters', () => {
    const root = parse('const foo = ; {bar;');
    const error = root.descendantsOfType('ERROR')[0];
    const missing = root.descendantsOfType('}')[0];

    assert(error && missing);

    const filters = {
      named: true,
      anonymous: true,
      extra: true,
      error: false,
      missing: false,
    };

    expect(
      [error, missing, root].map((node) =>
        treeNodeMatchesFilters(node, filters)
      )
    ).toEqual([false, false, true]);
  });

  it('filters error subtrees without keeping error nodes as ancestors', () => {
    const root = parse('foo bar');
    const [error, statement] = root.children;

    assert(error && statement);

    expect(error.isError).toBe(true);

    expect(
      collectVisibleTreeNodes({
        root,
        filters: {
          named: true,
          anonymous: true,
          extra: true,
          error: false,
          missing: true,
        },
        search: '',
      })
    ).toEqual({
      visibleNodes: new Set([
        root,
        statement,
        ...statement.children.filter((node) => node !== null),
      ]),
      searchMatches: new Set(),
    });
  });
});

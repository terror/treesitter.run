import { CompletionContext } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { describe, expect, it } from 'bun:test';

import {
  collectQueryCompletionBuckets,
  queryCompletionSource,
} from './query-completions';
import type { SyntaxNode } from './types';

const node = ({
  children = [],
  fields = [],
  isNamed = true,
  type = 'foo',
}: {
  children?: SyntaxNode[];
  fields?: (string | null)[];
  isNamed?: boolean;
  type?: string;
}): SyntaxNode => ({
  id: 0,
  typeId: 0,
  grammarId: 0,
  grammarType: type,
  type,
  text: '',
  isNamed,
  isExtra: false,
  isError: false,
  isMissing: false,
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
  fieldNameForChild: (index) => fields[index] ?? null,
});

describe('query completions', () => {
  it('collects node, field, anonymous node, and capture options', () => {
    const root = node({
      type: 'source_file',
      fields: ['body'],
      children: [
        node({
          type: 'function_item',
          fields: ['name'],
          children: [node({ type: 'identifier' })],
        }),
        node({ type: '{', isNamed: false }),
      ],
    });

    expect(collectQueryCompletionBuckets({ root })).toEqual({
      captures: [
        { label: '@function_item', type: 'variable', detail: 'capture' },
        { label: '@identifier', type: 'variable', detail: 'capture' },
        { label: '@source_file', type: 'variable', detail: 'capture' },
      ],
      fields: [
        { label: 'body:', type: 'property', detail: 'field' },
        { label: 'name:', type: 'property', detail: 'field' },
      ],
      namedNodes: [
        { label: 'function_item', type: 'type', detail: 'node' },
        { label: 'identifier', type: 'type', detail: 'node' },
        { label: 'source_file', type: 'type', detail: 'node' },
      ],
      anonymousNodes: [
        { label: '"{"', type: 'constant', detail: 'anonymous node' },
      ],
    });
  });

  it('completes captures after an at sign', () => {
    const root = node({ type: 'function_item' });
    const state = EditorState.create({ doc: '@fun' });
    const source = queryCompletionSource({ root });

    expect(source(new CompletionContext(state, 4, false))).toMatchObject({
      from: 0,
      options: [
        { label: '@function_item', type: 'variable', detail: 'capture' },
      ],
    });
  });

  it('completes anonymous nodes inside strings', () => {
    const root = node({
      children: [node({ type: '=>', isNamed: false })],
    });
    const state = EditorState.create({ doc: '"' });
    const source = queryCompletionSource({ root });

    expect(source(new CompletionContext(state, 1, false))).toMatchObject({
      from: 0,
      options: [{ label: '"=>"', type: 'constant', detail: 'anonymous node' }],
    });
  });
});

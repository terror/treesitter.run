import { CompletionContext } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { describe, expect, it } from 'bun:test';
import assert from 'node:assert/strict';

import { createTestParser } from '../test/parser';
import {
  collectQueryCompletionBuckets,
  queryCompletionSource,
} from './query-completions';

const parse = createTestParser();

describe('query completions', () => {
  it('collects node, field, anonymous node, and capture options', () => {
    const root = parse('foo.bar').descendantsOfType('member_expression')[0];

    assert(root);

    root.children.splice(1, 0, null);

    expect(collectQueryCompletionBuckets({ root })).toEqual({
      captures: [
        { label: '@identifier', type: 'variable', detail: 'capture' },
        { label: '@member_expression', type: 'variable', detail: 'capture' },
        { label: '@property_identifier', type: 'variable', detail: 'capture' },
      ],
      fields: [
        { label: 'object:', type: 'property', detail: 'field' },
        { label: 'property:', type: 'property', detail: 'field' },
      ],
      namedNodes: [
        { label: 'identifier', type: 'type', detail: 'node' },
        { label: 'member_expression', type: 'type', detail: 'node' },
        { label: 'property_identifier', type: 'type', detail: 'node' },
      ],
      anonymousNodes: [
        { label: '"."', type: 'constant', detail: 'anonymous node' },
      ],
    });
  });

  it('completes captures after an at sign', () => {
    const root = parse('foo').descendantsOfType('identifier')[0];

    assert(root);

    const state = EditorState.create({ doc: '@ide' });
    const source = queryCompletionSource({ root });

    expect(source(new CompletionContext(state, 4, false))).toEqual({
      from: 0,
      options: [{ label: '@identifier', type: 'variable', detail: 'capture' }],
      validFor: /@[\w.-]*$/,
    });
  });

  it('completes anonymous nodes inside strings', () => {
    const root = parse('foo => foo');
    const state = EditorState.create({ doc: '"' });
    const source = queryCompletionSource({ root });

    expect(source(new CompletionContext(state, 1, false))).toEqual({
      from: 0,
      options: [{ label: '"=>"', type: 'constant', detail: 'anonymous node' }],
      validFor: /"[^"\n]*$/,
    });
  });
});

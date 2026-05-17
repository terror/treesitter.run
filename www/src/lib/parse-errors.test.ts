import { Text } from '@codemirror/state';
import { describe, expect, it } from 'bun:test';

import {
  collectParseErrors,
  parseErrorKind,
  parseErrorLabel,
} from './parse-errors';
import type { SyntaxNode } from './types';

const node = ({
  type = 'program',
  isError = false,
  isMissing = false,
  startPosition = { row: 0, column: 0 },
  endPosition = { row: 0, column: 0 },
  children = [],
}: Partial<SyntaxNode>): SyntaxNode => ({
  id: 0,
  typeId: 0,
  grammarId: 0,
  grammarType: type,
  type,
  text: '',
  isNamed: true,
  isExtra: false,
  isError,
  isMissing,
  hasError: isError || isMissing || children.some((child) => child.hasError),
  hasChanges: false,
  startIndex: 0,
  endIndex: 0,
  startPosition,
  endPosition,
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

describe('parse errors', () => {
  it('identifies parse error node kinds', () => {
    expect(parseErrorKind(node({ type: 'ERROR' }))).toBe('error');
    expect(parseErrorKind(node({ isError: true }))).toBe('error');
    expect(parseErrorKind(node({ isMissing: true }))).toBe('missing');
    expect(parseErrorKind(node({ type: 'identifier' }))).toBeUndefined();
  });

  it('labels missing nodes', () => {
    expect(parseErrorLabel(node({ type: ';', isMissing: true }))).toBe(
      'MISSING ;'
    );

    expect(parseErrorLabel(node({ type: 'ERROR', isError: true }))).toBe(
      'ERROR'
    );
  });

  it('collects sorted parse error ranges', () => {
    const doc = Text.of(['foo bar', 'baz']);

    const root = node({
      children: [
        node({
          type: 'ERROR',
          isError: true,
          startPosition: { row: 0, column: 4 },
          endPosition: { row: 0, column: 7 },
        }),
        node({
          type: ';',
          isMissing: true,
          startPosition: { row: 0, column: 3 },
          endPosition: { row: 0, column: 3 },
        }),
      ],
    });

    expect(collectParseErrors(root, doc)).toEqual([
      {
        kind: 'missing',
        type: ';',
        from: 3,
        to: 3,
      },
      {
        kind: 'error',
        type: 'ERROR',
        from: 4,
        to: 7,
      },
    ]);
  });
});

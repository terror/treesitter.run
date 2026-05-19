import { describe, expect, it } from 'bun:test';

import {
  byteIndexToOffset,
  captureClassName,
  normalizeHighlightRanges,
} from './tree-sitter-highlight';

describe('captureClassName', () => {
  it('maps highlight captures to classes', () => {
    expect(captureClassName('keyword')).toBe('cm-ts-keyword');
    expect(captureClassName('function.call')).toBe('cm-ts-function');
    expect(captureClassName('string.special')).toBe('cm-ts-string');
    expect(captureClassName('type.builtin')).toBe('cm-ts-type');
    expect(captureClassName('comment')).toBe('cm-ts-comment');
    expect(captureClassName('foo')).toBeUndefined();
  });
});

describe('byteIndexToOffset', () => {
  it('converts utf8 byte indices to document offsets', () => {
    const value = 'foo é 𐐷 bar';

    expect(byteIndexToOffset(value, 0)).toBe(0);
    expect(byteIndexToOffset(value, 4)).toBe(4);
    expect(byteIndexToOffset(value, 6)).toBe(5);
    expect(byteIndexToOffset(value, 7)).toBe(6);
    expect(byteIndexToOffset(value, 11)).toBe(8);
    expect(byteIndexToOffset(value, 15)).toBe(12);
    expect(byteIndexToOffset(value, 100)).toBe(value.length);
  });
});

describe('normalizeHighlightRanges', () => {
  it('splits overlapping ranges so later captures win', () => {
    expect(
      normalizeHighlightRanges([
        { className: 'cm-ts-type', from: 0, to: 10 },
        { className: 'cm-ts-function', from: 2, to: 5 },
      ])
    ).toEqual([
      { className: 'cm-ts-type', from: 0, to: 2 },
      { className: 'cm-ts-function', from: 2, to: 5 },
      { className: 'cm-ts-type', from: 5, to: 10 },
    ]);
  });

  it('merges adjacent ranges with the same class', () => {
    expect(
      normalizeHighlightRanges([
        { className: 'cm-ts-type', from: 0, to: 2 },
        { className: 'cm-ts-type', from: 2, to: 4 },
      ])
    ).toEqual([{ className: 'cm-ts-type', from: 0, to: 4 }]);
  });

  it('ignores empty ranges', () => {
    expect(
      normalizeHighlightRanges([
        { className: 'cm-ts-type', from: 0, to: 0 },
        { className: 'cm-ts-keyword', from: 1, to: 1 },
      ])
    ).toEqual([]);
  });
});

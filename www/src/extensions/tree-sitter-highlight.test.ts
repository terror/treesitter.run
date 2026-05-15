import { describe, expect, it } from 'bun:test';

import { byteIndexToOffset, captureClassName } from './tree-sitter-highlight';

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

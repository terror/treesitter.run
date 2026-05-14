import { describe, expect, it } from 'bun:test';

import { highlightExtension } from './highlight';

describe('highlightExtension', () => {
  it('handles empty ranges', () => {
    expect(() => highlightExtension({ from: 1, to: 1 })).not.toThrow();
  });

  it('ignores reversed ranges', () => {
    expect(highlightExtension({ from: 2, to: 1 })).toEqual([]);
  });

  it('handles highlighted ranges', () => {
    expect(() => highlightExtension({ from: 1, to: 2 })).not.toThrow();
  });
});

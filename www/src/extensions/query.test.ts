import { describe, expect, it } from 'bun:test';

import { queryExtension } from './query';

describe('queryExtension', () => {
  it('ignores empty ranges', () => {
    expect(queryExtension([])).toEqual([]);
  });

  it('handles query ranges', () => {
    expect(() => queryExtension([{ from: 1, to: 2 }])).not.toThrow();
  });

  it('handles query ranges without scrolling', () => {
    expect(() => queryExtension([{ from: 1, to: 2 }], false)).not.toThrow();
  });
});

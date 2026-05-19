import { describe, expect, it } from 'bun:test';

import { queryExtension } from './query';

describe('queryExtension', () => {
  it('handles empty ranges', () => {
    expect(queryExtension([])).toEqual([]);
  });

  it('handles query ranges', () => {
    expect(() => queryExtension([{ from: 1, to: 2 }])).not.toThrow();
  });
});

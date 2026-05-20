import { describe, expect, it } from 'bun:test';

import { selectedNodeHighlightExtension } from './selected-node-highlight';

describe('selectedNodeHighlightExtension', () => {
  it('handles empty ranges', () => {
    expect(() =>
      selectedNodeHighlightExtension({ from: 1, to: 1 })
    ).not.toThrow();
  });

  it('ignores reversed ranges', () => {
    expect(selectedNodeHighlightExtension({ from: 2, to: 1 })).toEqual([]);
  });

  it('handles highlighted ranges', () => {
    expect(() =>
      selectedNodeHighlightExtension({ from: 1, to: 2 })
    ).not.toThrow();
  });
});

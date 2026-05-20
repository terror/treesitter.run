import { describe, expect, it } from 'bun:test';

import { queryCaptureHighlightExtension } from './query-capture-highlight';

describe('queryCaptureHighlightExtension', () => {
  it('ignores empty ranges', () => {
    expect(queryCaptureHighlightExtension([])).toEqual([]);
  });

  it('handles query ranges', () => {
    expect(() =>
      queryCaptureHighlightExtension([{ from: 1, to: 2 }])
    ).not.toThrow();
  });

  it('handles query ranges without scrolling', () => {
    expect(() =>
      queryCaptureHighlightExtension([{ from: 1, to: 2 }], false)
    ).not.toThrow();
  });
});

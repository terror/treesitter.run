import { describe, expect, it } from 'bun:test';

import { scrollIntoViewExtension } from './scroll-into-view';

describe('scrollIntoViewExtension', () => {
  it('handles offsets', () => {
    expect(() => scrollIntoViewExtension(1)).not.toThrow();
  });
});

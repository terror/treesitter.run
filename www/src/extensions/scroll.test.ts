import { describe, expect, it } from 'bun:test';

import { scrollExtension } from './scroll';

describe('scrollExtension', () => {
  it('handles offsets', () => {
    expect(() => scrollExtension(1)).not.toThrow();
  });
});

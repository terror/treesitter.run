import { describe, expect, it } from 'bun:test';

import { languageConfig } from './language-config';
import {
  commitUrl,
  parserMetadata,
  parserMetadataFromManifest,
} from './parser-metadata';

describe('parserMetadata', () => {
  it('covers configured languages', () => {
    expect(Object.keys(parserMetadata).sort()).toEqual(
      Object.keys(languageConfig).sort()
    );
  });

  it('derives metadata from a manifest', () => {
    expect(
      parserMetadataFromManifest([
        {
          name: 'foo',
          repository: 'bar',
          revision: 'baz',
        },
        {
          name: 'qux',
          path: 'foo',
          repository: 'bar',
          revision: 'baz',
        },
      ])
    ).toEqual({
      foo: {
        repository: 'bar',
        revision: 'baz',
      },
      qux: {
        repository: 'bar',
        revision: 'baz',
        sourcePath: 'foo',
      },
    });
  });

  it('builds commit links', () => {
    expect(
      commitUrl({
        repository: 'https://github.com/foo/bar',
        revision: 'baz',
      })
    ).toBe('https://github.com/foo/bar/commit/baz');
  });
});

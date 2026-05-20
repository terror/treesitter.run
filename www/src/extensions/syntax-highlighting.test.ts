import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { Language, Parser, Query } from 'web-tree-sitter';

import {
  captureClassName,
  highlightRanges,
  normalizeHighlightRanges,
} from './syntax-highlighting';

const publicPath = (path: string): string =>
  new URL(`../../public/${path}`, import.meta.url).pathname;

let language: Language;
let parser: Parser;

beforeAll(async () => {
  await Parser.init({
    locateFile(scriptName: string) {
      return publicPath(scriptName);
    },
  });

  language = await Language.load(publicPath('tree-sitter-javascript.wasm'));
  parser = new Parser();
  parser.setLanguage(language);
});

afterAll(() => {
  parser.delete();
});

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

describe('highlightRanges', () => {
  it('uses tree-sitter node offsets directly', () => {
    const code = 'const é = foo;';
    const query = new Query(language, '(identifier) @variable');
    const tree = parser.parse(code);

    try {
      expect(highlightRanges({ query, tree })).toEqual([
        { className: 'cm-ts-variable', from: 6, to: 7 },
        { className: 'cm-ts-variable', from: 10, to: 13 },
      ]);
    } finally {
      query.delete();
      tree?.delete();
    }
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

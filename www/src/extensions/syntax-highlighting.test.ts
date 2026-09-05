import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { Language, Parser, Query } from 'web-tree-sitter';

import {
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

describe('highlightRanges', () => {
  it('uses tree-sitter node offsets directly', () => {
    const code = 'const é = "😀";\nfoo;';

    const query = new Query(
      language,
      `
        "const" @keyword
        (identifier) @variable.builtin
        (string) @string
      `
    );

    const tree = parser.parse(code);

    try {
      expect(highlightRanges({ query, tree })).toEqual([
        { className: 'cm-ts-keyword', from: 0, to: 5 },
        { className: 'cm-ts-variable', from: 6, to: 7 },
        { className: 'cm-ts-string', from: 10, to: 14 },
        { className: 'cm-ts-variable', from: 16, to: 19 },
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

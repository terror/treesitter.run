import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { Language, Parser } from 'web-tree-sitter';

import {
  type ParseErrorRange,
  collectParseErrors,
  parseErrorKind,
} from './parse-errors';
import type { SyntaxNode } from './types';

const publicPath = (path: string): string =>
  new URL(`../../public/${path}`, import.meta.url).pathname;

let parser: Parser;

beforeAll(async () => {
  await Parser.init({ locateFile: publicPath });

  const language = await Language.load(
    publicPath('tree-sitter-javascript.wasm')
  );

  parser = new Parser();
  parser.setLanguage(language);
});

afterAll(() => {
  parser.delete();
});

const node = ({
  type = 'program',
  isError = false,
  isMissing = false,
  startIndex = 0,
  endIndex = 0,
  children = [],
}: Partial<SyntaxNode>): SyntaxNode => ({
  id: 0,
  typeId: 0,
  grammarId: 0,
  grammarType: type,
  type,
  text: '',
  isNamed: true,
  isExtra: false,
  isError,
  isMissing,
  hasError: isError || isMissing || children.some((child) => child.hasError),
  hasChanges: false,
  startIndex,
  endIndex,
  startPosition: { row: 0, column: 0 },
  endPosition: { row: 0, column: 0 },
  parseState: 0,
  nextParseState: 0,
  childCount: children.length,
  namedChildCount: children.length,
  descendantCount: children.length + 1,
  parent: null,
  children,
  child: (index) => children[index] ?? null,
  equals: (other) => other.id === 0,
  fieldNameForChild: () => null,
});

describe('parse errors', () => {
  it('identifies parse error node kinds', () => {
    expect(parseErrorKind(node({ type: 'ERROR' }))).toBe('error');
    expect(parseErrorKind(node({ isError: true }))).toBe('error');
    expect(parseErrorKind(node({ isMissing: true }))).toBe('missing');
    expect(parseErrorKind(node({ type: 'identifier' }))).toBeUndefined();
  });

  it('collects sorted parse error ranges', () => {
    const root = node({
      children: [
        node({
          type: 'ERROR',
          isError: true,
          startIndex: 4,
          endIndex: 7,
        }),
        node({
          type: ';',
          isMissing: true,
          startIndex: 3,
          endIndex: 3,
        }),
      ],
    });

    expect(collectParseErrors(root)).toEqual([
      {
        kind: 'missing',
        type: ';',
        from: 3,
        to: 3,
      },
      {
        kind: 'error',
        type: 'ERROR',
        from: 4,
        to: 7,
      },
    ]);
  });

  it('uses node offsets after multiline non-ASCII text', () => {
    const check = (code: string, expected: ParseErrorRange[]) => {
      const tree = parser.parse(code);

      if (!tree) {
        throw new Error('Parse failed');
      }

      try {
        expect(
          collectParseErrors(tree.rootNode as unknown as SyntaxNode)
        ).toEqual(expected);
      } finally {
        tree.delete();
      }
    };

    check('const foo = "é😀";\nconst bar = ;', [
      { kind: 'error', type: 'ERROR', from: 29, to: 30 },
    ]);
    check('const foo = "é😀";\n{bar;', [
      { kind: 'missing', type: '}', from: 24, to: 24 },
    ]);
  });
});

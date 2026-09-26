import { describe, expect, it } from 'bun:test';
import assert from 'node:assert/strict';

import { createTestParser } from '../test/parser';
import {
  type ParseErrorRange,
  collectParseErrors,
  parseErrorKind,
} from './parse-errors';

const parse = createTestParser();

describe('parse errors', () => {
  it('identifies parse error node kinds', () => {
    const root = parse('const foo = ; {bar;');
    const error = root.descendantsOfType('ERROR')[0];
    const missing = root.descendantsOfType('}')[0];

    assert(error && missing);

    expect(parseErrorKind(error)).toBe('error');
    expect(parseErrorKind(missing)).toBe('missing');
    expect(parseErrorKind(root)).toBeUndefined();

    Object.defineProperty(error, 'isError', { value: false });

    expect(parseErrorKind(error)).toBe('error');
  });

  it('collects sorted parse error ranges and skips null children', () => {
    const root = parse('const foo = ; {bar;');

    root.children.reverse();
    root.children.splice(1, 0, null);

    expect(collectParseErrors(root)).toEqual([
      { kind: 'error', type: 'ERROR', from: 10, to: 11 },
      { kind: 'missing', type: '}', from: 19, to: 19 },
    ]);
  });

  it('uses node offsets after multiline non-ASCII text', () => {
    const check = (code: string, expected: ParseErrorRange[]) => {
      expect(collectParseErrors(parse(code))).toEqual(expected);
    };

    check('const foo = "é😀";\nconst bar = ;', [
      { kind: 'error', type: 'ERROR', from: 29, to: 30 },
    ]);
    check('const foo = "é😀";\n{bar;', [
      { kind: 'missing', type: '}', from: 24, to: 24 },
    ]);
  });
});

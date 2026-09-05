import type { LintSource } from '@codemirror/lint';
import { EditorState } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { describe, expect, it } from 'bun:test';

import { parseDiagnosticsExtension } from './parse-diagnostics';

describe('parseDiagnosticsExtension', () => {
  it('keeps valid diagnostics, including missing nodes at EOF', async () => {
    const [config] = parseDiagnosticsExtension([
      { kind: 'error', type: 'foo', from: 0, to: 2 },
      { kind: 'missing', type: 'bar', from: 3, to: 3 },
      { kind: 'error', type: 'foo', from: -1, to: 1 },
      { kind: 'error', type: 'foo', from: 2, to: 1 },
      { kind: 'error', type: 'foo', from: 2, to: 4 },
    ]) as unknown as { value: { source: LintSource } }[];

    const state = EditorState.create({ doc: 'foo' });

    expect(await config.value.source({ state } as EditorView)).toEqual([
      {
        from: 0,
        to: 2,
        severity: 'error',
        source: 'tree-sitter',
        message: 'Parse error',
        markClass: 'cm-parse-error',
      },
      {
        from: 3,
        to: 3,
        severity: 'error',
        source: 'tree-sitter',
        message: 'Missing bar',
        markClass: 'cm-parse-missing',
      },
    ]);
  });
});

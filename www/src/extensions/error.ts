import type { ParseErrorRange } from '@/lib/parse-errors';
import type { Diagnostic } from '@codemirror/lint';
import { lintGutter, linter } from '@codemirror/lint';
import type { Extension } from '@codemirror/state';

export const errorExtension = (parseErrors: ParseErrorRange[]): Extension => [
  linter(
    () =>
      parseErrors.map(
        ({ kind, type, from, to }): Diagnostic => ({
          from,
          to,
          severity: 'error',
          source: 'tree-sitter',
          message: kind === 'missing' ? `Missing ${type}` : 'Parse error',
          markClass: kind === 'missing' ? 'cm-parse-missing' : 'cm-parse-error',
        })
      ),
    {
      delay: 100,
    }
  ),
  lintGutter(),
];

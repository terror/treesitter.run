import type { ParseErrorRange } from '@/lib/parse-errors';
import type { Diagnostic } from '@codemirror/lint';
import { linter } from '@codemirror/lint';
import type { Extension } from '@codemirror/state';

export const parseDiagnosticsExtension = (
  parseErrors: ParseErrorRange[]
): Extension =>
  linter(
    (view) =>
      parseErrors
        .filter(
          ({ from, to }) =>
            from >= 0 && from <= to && to <= view.state.doc.length
        )
        .map(
          ({ kind, type, from, to }): Diagnostic => ({
            from,
            to,
            severity: 'error',
            source: 'tree-sitter',
            message: kind === 'missing' ? `Missing ${type}` : 'Parse error',
            markClass:
              kind === 'missing' ? 'cm-parse-missing' : 'cm-parse-error',
          })
        ),
    {
      delay: 100,
    }
  );

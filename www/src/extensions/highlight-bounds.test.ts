import { EditorState, type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { describe, expect, it } from 'bun:test';
import type { Query, Tree } from 'web-tree-sitter';

import type { SyntaxRange } from '../lib/types';
import { queryCaptureHighlightExtension } from './query-capture-highlight';
import { selectedNodeHighlightExtension } from './selected-node-highlight';
import { syntaxHighlightingExtension } from './syntax-highlighting';

describe('highlight bounds', () => {
  const extensions: Record<string, (range: SyntaxRange) => Extension> = {
    query: (range) => queryCaptureHighlightExtension([range], false),
    selected: (range) => selectedNodeHighlightExtension(range, false),
    syntax: (range) =>
      syntaxHighlightingExtension({
        query: {
          captures: () => [
            {
              name: 'variable',
              node: { startIndex: range.from, endIndex: range.to },
            },
          ],
        } as unknown as Query,
        tree: { rootNode: {} } as Tree,
      }),
  };

  for (const [name, extension] of Object.entries(extensions)) {
    it(`bounds ${name} highlights to the current editor document`, () => {
      const check = (range: SyntaxRange, expected: SyntaxRange[]) => {
        const state = EditorState.create({
          doc: 'foo',
          extensions: extension(range),
        });

        const ranges: SyntaxRange[] = [];

        for (const decorations of state.facet(EditorView.decorations)) {
          const set =
            typeof decorations === 'function'
              ? decorations({ state } as EditorView)
              : decorations;

          for (const cursor = set.iter(); cursor.value; cursor.next()) {
            ranges.push({ from: cursor.from, to: cursor.to });
          }
        }

        expect(ranges).toEqual(expected);
      };

      check({ from: 1, to: 2 }, [{ from: 1, to: 2 }]);
      check({ from: -1, to: 4 }, [{ from: 0, to: 3 }]);
      check({ from: 4, to: 5 }, []);
      check({ from: -2, to: -1 }, []);
      check({ from: 1, to: 1 }, []);
      check({ from: 2, to: 1 }, []);
    });
  }
});

import { useEditorSettings } from '@/contexts/editor-settings-context';
import { parseDiagnosticsExtension } from '@/extensions/parse-diagnostics';
import { syntaxHighlightingExtension } from '@/extensions/syntax-highlighting';
import type { ParseErrorRange } from '@/lib/parse-errors';
import { EditorState, type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useMemo } from 'react';
import { type Query, type Tree } from 'web-tree-sitter';

interface UseEditorExtensionsOptions {
  extensions: Extension[];
  syntaxHighlightQuery: Query | null | undefined;
  parseErrors: ParseErrorRange[];
  tree: Tree | null;
}

export function useEditorExtensions({
  extensions,
  syntaxHighlightQuery,
  parseErrors,
  tree,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  return useMemo(() => {
    const result: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      syntaxHighlightingExtension({ query: syntaxHighlightQuery, tree }),
      parseDiagnosticsExtension(parseErrors),
      ...extensions,
    ];

    if (settings.keybindings === 'vim') {
      result.push(vim());
    }

    if (settings.lineWrapping) {
      result.push(EditorView.lineWrapping);
    }

    return result;
  }, [
    extensions,
    syntaxHighlightQuery,
    parseErrors,
    settings.keybindings,
    settings.lineWrapping,
    settings.tabSize,
    tree,
  ]);
}

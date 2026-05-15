import { useEditorSettings } from '@/contexts/editor-settings-context';
import { errorExtension } from '@/extensions/error';
import { highlightExtension } from '@/extensions/highlight';
import { treeSitterHighlightExtension } from '@/extensions/tree-sitter-highlight';
import type { ParseErrorRange } from '@/lib/parse-errors';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useMemo } from 'react';
import { type Query, type Tree } from 'web-tree-sitter';

interface UseEditorExtensionsOptions {
  code: string;
  query: Query | null | undefined;
  tree: Tree | null;
  highlight: { from: number; to: number } | undefined;
  parseErrors: ParseErrorRange[];
}

export function useEditorExtensions({
  code,
  query,
  tree,
  highlight,
  parseErrors,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      treeSitterHighlightExtension({ code, query, tree }),
      errorExtension(parseErrors),
      highlightExtension(highlight),
    ];

    if (settings.keybindings === 'vim') {
      extensions.push(vim());
    }

    if (settings.lineWrapping) {
      extensions.push(EditorView.lineWrapping);
    }

    return extensions;
  }, [
    settings.tabSize,
    settings.keybindings,
    settings.lineWrapping,
    code,
    query,
    tree,
    parseErrors,
    highlight,
  ]);
}

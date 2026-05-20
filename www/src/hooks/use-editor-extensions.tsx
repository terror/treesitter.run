import { useEditorSettings } from '@/contexts/editor-settings-context';
import { errorExtension } from '@/extensions/error';
import { highlightExtension } from '@/extensions/highlight';
import { queryExtension } from '@/extensions/query';
import { treeSitterHighlightExtension } from '@/extensions/tree-sitter-highlight';
import { usePreviousValue } from '@/hooks/use-previous-value';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { SyntaxRange } from '@/lib/types';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useMemo } from 'react';
import { type Query, type Tree } from 'web-tree-sitter';

interface UseEditorExtensionsOptions {
  code: string;
  highlight: { from: number; to: number } | undefined;
  highlightQuery: Query | null | undefined;
  parseErrors: ParseErrorRange[];
  query: string;
  queryHighlights: SyntaxRange[];
  tree: Tree | null;
}

export function useEditorExtensions({
  code,
  highlight,
  highlightQuery,
  parseErrors,
  query,
  queryHighlights,
  tree,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  const previousHighlight = usePreviousValue(highlight);
  const previousQuery = usePreviousValue(query);

  const scrollToHighlight =
    previousHighlight?.from !== highlight?.from ||
    previousHighlight?.to !== highlight?.to;

  const scrollToQueryHighlight = previousQuery !== query;

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      treeSitterHighlightExtension({ code, query: highlightQuery, tree }),
      errorExtension(parseErrors),
      queryExtension(queryHighlights, scrollToQueryHighlight),
      highlightExtension(highlight, scrollToHighlight),
    ];

    if (settings.keybindings === 'vim') {
      extensions.push(vim());
    }

    if (settings.lineWrapping) {
      extensions.push(EditorView.lineWrapping);
    }

    return extensions;
  }, [
    code,
    highlight,
    highlightQuery,
    parseErrors,
    queryHighlights,
    scrollToHighlight,
    scrollToQueryHighlight,
    settings.keybindings,
    settings.lineWrapping,
    settings.tabSize,
    tree,
  ]);
}

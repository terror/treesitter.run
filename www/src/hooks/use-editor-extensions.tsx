import { useEditorSettings } from '@/contexts/editor-settings-context';
import { errorExtension } from '@/extensions/error';
import { highlightExtension } from '@/extensions/highlight';
import { queryExtension } from '@/extensions/query';
import { treeSitterHighlightExtension } from '@/extensions/tree-sitter-highlight';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { SyntaxRange } from '@/lib/types';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useEffect, useMemo, useRef } from 'react';
import { type Query, type Tree } from 'web-tree-sitter';

interface UseEditorExtensionsOptions {
  code: string;
  highlight: { from: number; to: number } | undefined;
  highlightQuery: Query | null | undefined;
  query: string;
  queryHighlights: SyntaxRange[];
  parseErrors: ParseErrorRange[];
  tree: Tree | null;
}

export function useEditorExtensions({
  code,
  highlight,
  highlightQuery,
  query,
  queryHighlights,
  parseErrors,
  tree,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  const previousHighlight = useRef<SyntaxRange>();
  const previousQuery = useRef<string>();

  const scrollToHighlight =
    previousHighlight.current?.from !== highlight?.from ||
    previousHighlight.current?.to !== highlight?.to;

  const scrollToQueryHighlight = previousQuery.current !== query;

  useEffect(() => {
    previousHighlight.current = highlight;
  }, [highlight]);

  useEffect(() => {
    previousQuery.current = query;
  }, [query]);

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
    settings.tabSize,
    settings.keybindings,
    settings.lineWrapping,
    code,
    highlightQuery,
    tree,
    parseErrors,
    highlight,
    queryHighlights,
    scrollToHighlight,
    scrollToQueryHighlight,
  ]);
}

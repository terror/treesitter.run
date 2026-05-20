import { useEditorSettings } from '@/contexts/editor-settings-context';
import { parseDiagnosticsExtension } from '@/extensions/parse-diagnostics';
import { queryCaptureHighlightExtension } from '@/extensions/query-capture-highlight';
import { selectedNodeHighlightExtension } from '@/extensions/selected-node-highlight';
import { syntaxHighlightingExtension } from '@/extensions/syntax-highlighting';
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
  selectedNodeRange: { from: number; to: number } | undefined;
  syntaxHighlightQuery: Query | null | undefined;
  parseErrors: ParseErrorRange[];
  queryText: string;
  queryCaptureRanges: SyntaxRange[];
  tree: Tree | null;
}

export function useEditorExtensions({
  code,
  selectedNodeRange,
  syntaxHighlightQuery,
  parseErrors,
  queryText,
  queryCaptureRanges,
  tree,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  const previousSelectedNodeRange = usePreviousValue(selectedNodeRange);
  const previousQueryText = usePreviousValue(queryText);

  const scrollToSelectedNode =
    previousSelectedNodeRange?.from !== selectedNodeRange?.from ||
    previousSelectedNodeRange?.to !== selectedNodeRange?.to;

  const scrollToQueryCapture = previousQueryText !== queryText;

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      syntaxHighlightingExtension({ code, query: syntaxHighlightQuery, tree }),
      parseDiagnosticsExtension(parseErrors),
      queryCaptureHighlightExtension(queryCaptureRanges, scrollToQueryCapture),
      selectedNodeHighlightExtension(selectedNodeRange, scrollToSelectedNode),
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
    selectedNodeRange,
    syntaxHighlightQuery,
    parseErrors,
    queryCaptureRanges,
    scrollToSelectedNode,
    scrollToQueryCapture,
    settings.keybindings,
    settings.lineWrapping,
    settings.tabSize,
    tree,
  ]);
}

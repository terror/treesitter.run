import { useEditorSettings } from '@/contexts/editor-settings-context';
import { parseDiagnosticsExtension } from '@/extensions/parse-diagnostics';
import { queryCaptureHighlightExtension } from '@/extensions/query-capture-highlight';
import { selectedNodeHighlightExtension } from '@/extensions/selected-node-highlight';
import { usePreviousValue } from '@/hooks/use-previous-value';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { QueryCapture, SyntaxRange } from '@/lib/types';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useMemo } from 'react';

interface UseEditorExtensionsOptions {
  selectedNodeRange: { from: number; to: number } | undefined;
  parseErrors: ParseErrorRange[];
  queryText: string;
  queryCaptures: QueryCapture[];
}

export function useEditorExtensions({
  selectedNodeRange,
  parseErrors,
  queryText,
  queryCaptures,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  const previousSelectedNodeRange = usePreviousValue(selectedNodeRange);
  const previousQueryText = usePreviousValue(queryText);

  const scrollToSelectedNode =
    previousSelectedNodeRange?.from !== selectedNodeRange?.from ||
    previousSelectedNodeRange?.to !== selectedNodeRange?.to;

  const scrollToQueryCapture = previousQueryText !== queryText;

  return useMemo(() => {
    const queryCaptureRanges = queryCaptures.map(
      (capture): SyntaxRange => capture.range
    );

    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
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
    selectedNodeRange,
    parseErrors,
    queryCaptures,
    scrollToSelectedNode,
    scrollToQueryCapture,
    settings.keybindings,
    settings.lineWrapping,
    settings.tabSize,
  ]);
}

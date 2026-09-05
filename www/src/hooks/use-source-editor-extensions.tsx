import { queryCaptureHighlightExtension } from '@/extensions/query-capture-highlight';
import { selectedNodeHighlightExtension } from '@/extensions/selected-node-highlight';
import { useEditorExtensions } from '@/hooks/use-editor-extensions';
import { usePreviousValue } from '@/hooks/use-previous-value';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { QueryCapture } from '@/lib/types';
import type { Extension } from '@codemirror/state';
import { useMemo } from 'react';
import type { Query, Tree } from 'web-tree-sitter';

interface UseSourceEditorExtensionsOptions {
  selectedNodeRange: { from: number; to: number } | undefined;
  syntaxHighlightQuery: Query | null | undefined;
  parseErrors: ParseErrorRange[];
  queryText: string;
  tree: Tree | null;
  queryCaptures: QueryCapture[];
}

export function useSourceEditorExtensions({
  selectedNodeRange,
  syntaxHighlightQuery,
  parseErrors,
  queryText,
  tree,
  queryCaptures,
}: UseSourceEditorExtensionsOptions): Extension[] {
  const previousSelectedNodeRange = usePreviousValue(selectedNodeRange);
  const previousQueryText = usePreviousValue(queryText);

  const scrollToSelectedNode =
    previousSelectedNodeRange?.from !== selectedNodeRange?.from ||
    previousSelectedNodeRange?.to !== selectedNodeRange?.to;

  const scrollToQueryCapture = previousQueryText !== queryText;

  const extensions = useMemo(() => {
    const queryCaptureRanges = queryCaptures.map((capture) => capture.range);

    return [
      queryCaptureHighlightExtension(queryCaptureRanges, scrollToQueryCapture),
      selectedNodeHighlightExtension(selectedNodeRange, scrollToSelectedNode),
    ];
  }, [
    queryCaptures,
    scrollToQueryCapture,
    scrollToSelectedNode,
    selectedNodeRange,
  ]);

  return useEditorExtensions({
    extensions,
    syntaxHighlightQuery,
    parseErrors,
    tree,
  });
}

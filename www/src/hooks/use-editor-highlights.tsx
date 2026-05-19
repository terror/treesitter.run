import type { QueryCapture, SyntaxRange } from '@/lib/types';
import { useCallback, useMemo, useState } from 'react';

export function useEditorHighlights() {
  const [highlight, setHighlight] = useState<SyntaxRange | undefined>(
    undefined
  );

  const [queryCaptures, setQueryCaptures] = useState<QueryCapture[]>([]);

  const clearHighlights = useCallback(() => {
    setHighlight(undefined);
    setQueryCaptures([]);
  }, []);

  const onHighlightChange = useCallback((range: SyntaxRange | undefined) => {
    setHighlight(range);
  }, []);

  const onQueryCapturesChange = useCallback((captures: QueryCapture[]) => {
    setQueryCaptures(captures);
  }, []);

  const queryHighlights = useMemo(
    () => queryCaptures.map((capture) => capture.range),
    [queryCaptures]
  );

  return {
    clearHighlights,
    highlight,
    onHighlightChange,
    onQueryCapturesChange,
    queryHighlights,
  };
}

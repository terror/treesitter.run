import type { SyntaxRange } from '@/lib/types';
import { useCallback, useState } from 'react';

export function useEditorHighlights() {
  const [highlight, setHighlight] = useState<SyntaxRange | undefined>(
    undefined
  );

  const clearHighlights = useCallback(() => {
    setHighlight(undefined);
  }, []);

  const onHighlightChange = useCallback((range: SyntaxRange | undefined) => {
    setHighlight(range);
  }, []);

  return {
    clearHighlights,
    highlight,
    onHighlightChange,
  };
}

import { useSyntaxTree } from '@/hooks/use-syntax-tree';
import { useTreeQuery } from '@/hooks/use-tree-query';
import type { Language } from '@/lib/types';
import { Text } from '@codemirror/state';
import { useMemo } from 'react';
import { Parser, type Language as TSLanguage } from 'web-tree-sitter';

interface UseTreeWorkbenchOptions {
  code: string;
  language: Language;
  parser: Parser | undefined;
  treeSitterLanguage: TSLanguage | undefined;
}

export function useTreeWorkbench({
  code,
  language,
  parser,
  treeSitterLanguage,
}: UseTreeWorkbenchOptions) {
  const doc = useMemo(() => Text.of(code.split('\n')), [code]);

  const { root, parseErrors, expandedNodes, toggleExpand } = useSyntaxTree({
    code,
    doc,
    language: treeSitterLanguage,
    parser,
  });

  const {
    captures: queryCaptures,
    error: queryError,
    query,
    queryMatchKeys,
    setQuery,
  } = useTreeQuery({
    doc,
    language,
    root,
    treeSitterLanguage,
  });

  const queryHighlights = useMemo(
    () => queryCaptures.map((capture) => capture.range),
    [queryCaptures]
  );

  return {
    doc,
    expandedNodes,
    parseErrors,
    query,
    queryCaptures,
    queryError,
    queryHighlights,
    queryMatchKeys,
    root,
    setQuery,
    toggleExpand,
  };
}

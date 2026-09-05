import { useSyntaxTree } from '@/hooks/use-syntax-tree';
import { useTreeQuery } from '@/hooks/use-tree-query';
import type { Language } from '@/lib/types';
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
  const { tree, root, parseErrors, collapsedNodes, toggleExpand } =
    useSyntaxTree({
      code,
      language: treeSitterLanguage,
      parser,
    });

  const {
    captures: queryCaptures,
    error: queryError,
    query,
    queryCaptureNamesByKey,
    setQuery,
  } = useTreeQuery({
    language,
    root,
    treeSitterLanguage,
  });

  return {
    collapsedNodes,
    parseErrors,
    query,
    queryCaptureNamesByKey,
    queryCaptures,
    queryError,
    root,
    setQuery,
    tree,
    toggleExpand,
  };
}

import { useParsedTree } from '@/hooks/use-parsed-tree';
import { useTreeQuery } from '@/hooks/use-tree-query';
import type { Language, SyntaxNode } from '@/lib/types';
import { syntaxNodeKey } from '@/lib/utils';
import { useCallback, useState } from 'react';
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
  const { tree, root, parseErrors } = useParsedTree({
    code,
    language: treeSitterLanguage,
    parser,
  });

  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(
    () => new Set()
  );

  const toggleExpand = useCallback((node: SyntaxNode) => {
    setCollapsedNodes((collapsedNodes) => {
      const key = syntaxNodeKey(node);
      const next = new Set(collapsedNodes);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }, []);

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

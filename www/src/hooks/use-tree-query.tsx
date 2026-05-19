import { usePersistedState } from '@/hooks/use-persisted-state';
import type { Language, QueryCapture, SyntaxNode } from '@/lib/types';
import { positionToOffset, syntaxNodeKey } from '@/lib/utils';
import type { Text } from '@codemirror/state';
import { useCallback, useMemo } from 'react';
import {
  Query,
  type Language as TSLanguage,
  type Node as TSNode,
  type QueryCapture as TSQueryCapture,
} from 'web-tree-sitter';

interface UseTreeQueryOptions {
  doc: Text;
  language: Language;
  root: SyntaxNode | undefined;
  treeSitterLanguage: TSLanguage | undefined;
}

const TREE_QUERY_STORAGE_KEY = 'treesitter.run:tree-query';

export function useTreeQuery({
  doc,
  language,
  root,
  treeSitterLanguage,
}: UseTreeQueryOptions) {
  const [queries, setQueries] = usePersistedState<
    Partial<Record<Language, string>>
  >(TREE_QUERY_STORAGE_KEY, {});

  const query = queries[language] ?? '';

  const setQuery = useCallback(
    (query: string) => {
      setQueries((queries) => ({
        ...queries,
        [language]: query,
      }));
    },
    [language, setQueries]
  );

  const queryResult = useMemo((): {
    captures: QueryCapture[];
    error: string | undefined;
  } => {
    if (!root || !treeSitterLanguage || query.trim() === '') {
      return {
        captures: [],
        error: undefined,
      };
    }

    let treeQuery: Query | undefined;

    try {
      treeQuery = new Query(treeSitterLanguage, query);

      const captures = treeQuery
        .captures(root as unknown as TSNode)
        .flatMap((capture: TSQueryCapture) => {
          const node = capture.node as unknown as SyntaxNode;
          const from = positionToOffset(node.startPosition, doc);
          const to = positionToOffset(node.endPosition, doc);

          if (from === null || to === null) {
            return [];
          }

          return [
            {
              name: capture.name,
              node,
              range: { from, to },
            },
          ];
        });

      return {
        captures,
        error: undefined,
      };
    } catch (error) {
      return {
        captures: [],
        error: error instanceof Error ? error.message : String(error),
      };
    } finally {
      treeQuery?.delete();
    }
  }, [doc, query, root, treeSitterLanguage]);

  const queryMatchKeys = useMemo(
    () =>
      new Set(
        queryResult.captures.map((capture) => syntaxNodeKey(capture.node))
      ),
    [queryResult.captures]
  );

  return {
    captures: queryResult.captures,
    error: queryResult.error,
    query,
    queryMatchKeys,
    setQuery,
  };
}

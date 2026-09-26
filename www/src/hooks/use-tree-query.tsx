import { usePersistedState } from '@/hooks/use-persisted-state';
import type { Language, QueryCapture } from '@/lib/types';
import { syntaxNodeKey } from '@/lib/utils';
import { useCallback, useMemo } from 'react';
import { type Node, Query, type Language as TSLanguage } from 'web-tree-sitter';

interface UseTreeQueryOptions {
  language: Language;
  root: Node | undefined;
  treeSitterLanguage: TSLanguage | undefined;
}

const TREE_QUERY_STORAGE_KEY = 'treesitter.run:tree-query';

export function useTreeQuery({
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

      const captures = treeQuery.captures(root).map(({ name, node }) => ({
        name,
        node,
        range: { from: node.startIndex, to: node.endIndex },
      }));

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
  }, [query, root, treeSitterLanguage]);

  const queryCaptureNamesByKey = useMemo(() => {
    const namesByKey = new Map<string, string[]>();

    for (const capture of queryResult.captures) {
      const key = syntaxNodeKey(capture.node);

      const names = namesByKey.get(key);

      if (names) {
        if (!names.includes(capture.name)) {
          names.push(capture.name);
        }
      } else {
        namesByKey.set(key, [capture.name]);
      }
    }

    return namesByKey;
  }, [queryResult.captures]);

  return {
    captures: queryResult.captures,
    error: queryResult.error,
    query,
    queryCaptureNamesByKey,
    setQuery,
  };
}

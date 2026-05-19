import type { Language } from '@/lib/types';
import { createContext, useContext, useEffect } from 'react';
import type { Parser, Query, Language as TSLanguage } from 'web-tree-sitter';

export interface TreeSitterContextType {
  parser: Parser | undefined;
  loadedLanguages: Partial<Record<Language, TSLanguage>>;
  loadedQueries: Partial<Record<Language, Query | null>>;
  loadingLanguages: Set<Language>;
  initializing: boolean;
  error: string | undefined;
  loadLanguage: (language: Language) => Promise<void>;
  loadQuery: (language: Language) => Promise<void>;
}

interface UseTreeSitter {
  parser: Parser | undefined;
  language: TSLanguage | undefined;
  query: Query | null | undefined;
  loading: boolean;
  error: string | undefined;
}

export const TreeSitterContext = createContext<
  TreeSitterContextType | undefined
>(undefined);

export const useTreeSitter = (languageName: Language): UseTreeSitter => {
  const context = useContext(TreeSitterContext);

  if (context === undefined) {
    throw new Error('useTreeSitter must be used within a TreeSitterProvider');
  }

  const {
    parser,
    loadedLanguages,
    loadedQueries,
    loadingLanguages,
    initializing,
    error,
    loadLanguage,
    loadQuery,
  } = context;

  useEffect(() => {
    loadLanguage(languageName);
  }, [languageName, loadLanguage]);

  useEffect(() => {
    if (loadedLanguages[languageName]) {
      loadQuery(languageName);
    }
  }, [languageName, loadQuery, loadedLanguages]);

  return {
    parser,
    language: loadedLanguages[languageName],
    query: loadedQueries[languageName],
    loading: initializing || loadingLanguages.has(languageName),
    error,
  };
};

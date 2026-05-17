import type { Language } from '@/lib/types';
import { createContext, useContext, useEffect } from 'react';
import type { Parser, Language as TSLanguage } from 'web-tree-sitter';

export interface TreeSitterContextType {
  parser: Parser | undefined;
  loadedLanguages: Partial<Record<Language, TSLanguage>>;
  loadingLanguages: Set<Language>;
  initializing: boolean;
  error: string | undefined;
  loadLanguage: (language: Language) => Promise<void>;
}

interface UseTreeSitter {
  parser: Parser | undefined;
  language: TSLanguage | undefined;
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
    loadingLanguages,
    initializing,
    error,
    loadLanguage,
  } = context;

  useEffect(() => {
    loadLanguage(languageName);
  }, [languageName, loadLanguage]);

  return {
    parser,
    language: loadedLanguages[languageName],
    loading: initializing || loadingLanguages.has(languageName),
    error,
  };
};

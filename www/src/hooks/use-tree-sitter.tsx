import { useTreeSitterContext } from '@/contexts/tree-sitter-context';
import type { Language } from '@/lib/types';
import { useEffect } from 'react';
import type { Parser, Language as TSLanguage } from 'web-tree-sitter';

interface UseTreeSitter {
  parser: Parser | undefined;
  language: TSLanguage | undefined;
  loading: boolean;
  error: string | undefined;
}

export function useTreeSitter(languageName: Language): UseTreeSitter {
  const {
    parser,
    loadedLanguages,
    loadingLanguages,
    initializing,
    error,
    loadLanguage,
  } = useTreeSitterContext();

  useEffect(() => {
    loadLanguage(languageName);
  }, [languageName, loadLanguage]);

  return {
    parser,
    language: loadedLanguages[languageName],
    loading: initializing || loadingLanguages.has(languageName),
    error,
  };
}

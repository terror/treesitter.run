import type { Language } from '@/lib/types';
import { createContext, useContext } from 'react';
import type { Parser, Language as TSLanguage } from 'web-tree-sitter';

export interface TreeSitterContextType {
  parser: Parser | undefined;
  loadedLanguages: Partial<Record<Language, TSLanguage>>;
  loadingLanguages: Set<Language>;
  initializing: boolean;
  error: string | undefined;
  loadLanguage: (language: Language) => Promise<void>;
}

export const TreeSitterContext = createContext<
  TreeSitterContextType | undefined
>(undefined);

export const useTreeSitterContext = () => {
  const context = useContext(TreeSitterContext);

  if (context === undefined) {
    throw new Error('useTreeSitter must be used within a TreeSitterProvider');
  }

  return context;
};

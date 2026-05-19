import { languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { useCallback } from 'react';

import { usePersistedState } from './use-persisted-state';

const EDITOR_STORAGE_KEY = 'treesitter.run:editor-state';

interface EditorState {
  code: Partial<Record<Language, string>>;
}

export function useEditorBuffer(language: Language) {
  const [editorState, setEditorState] = usePersistedState<EditorState>(
    EDITOR_STORAGE_KEY,
    { code: {} }
  );

  const code =
    editorState.code[language] ?? languageConfig[language].sampleCode;

  const setCode = useCallback(
    (code: string) => {
      setEditorState((editorState) => ({
        code: {
          ...editorState.code,
          [language]: code,
        },
      }));
    },
    [language, setEditorState]
  );

  const resetCode = useCallback(
    (language: Language) => {
      setEditorState((editorState) => ({
        code: {
          ...editorState.code,
          [language]: languageConfig[language].sampleCode,
        },
      }));
    },
    [setEditorState]
  );

  return { code, resetCode, setCode };
}

import { useEditorSettings } from '@/contexts/editor-settings-context';
import { errorExtension } from '@/extensions/error';
import {
  highlightExtension,
  queryHighlightExtension,
} from '@/extensions/highlight';
import { languageConfig } from '@/lib/language-config';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { Language, SyntaxRange } from '@/lib/types';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useMemo } from 'react';

interface UseEditorExtensionsOptions {
  language: Language;
  highlight: { from: number; to: number } | undefined;
  queryHighlights: SyntaxRange[];
  parseErrors: ParseErrorRange[];
}

export function useEditorExtensions({
  language,
  highlight,
  queryHighlights,
  parseErrors,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      languageConfig[language].extension,
      errorExtension(parseErrors),
      queryHighlightExtension(queryHighlights),
      highlightExtension(highlight),
    ];

    if (settings.keybindings === 'vim') {
      extensions.push(vim());
    }

    if (settings.lineWrapping) {
      extensions.push(EditorView.lineWrapping);
    }

    return extensions;
  }, [
    settings.tabSize,
    settings.keybindings,
    settings.lineWrapping,
    language,
    parseErrors,
    highlight,
    queryHighlights,
  ]);
}

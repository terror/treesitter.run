import { useEditorSettings } from '@/contexts/editor-settings-context';
import { highlightExtension } from '@/lib/cm-highlight-extension';
import { languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useMemo } from 'react';

interface UseEditorExtensionsOptions {
  language: Language;
  highlight: { from: number; to: number } | undefined;
}

export function useEditorExtensions({
  language,
  highlight,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      languageConfig[language].extension,
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
    highlight,
  ]);
}

import { useEditorSettings } from '@/contexts/editor-settings-context';
import { errorExtension } from '@/extensions/error';
import { highlightExtension } from '@/extensions/highlight';
import { queryExtension } from '@/extensions/query';
import { languageConfig } from '@/lib/language-config';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { Language, SyntaxRange } from '@/lib/types';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useEffect, useMemo, useRef } from 'react';

interface UseEditorExtensionsOptions {
  language: Language;
  highlight: { from: number; to: number } | undefined;
  query: string;
  queryHighlights: SyntaxRange[];
  parseErrors: ParseErrorRange[];
}

export function useEditorExtensions({
  language,
  highlight,
  query,
  queryHighlights,
  parseErrors,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  const previousHighlight = useRef<SyntaxRange>();
  const previousQuery = useRef<string>();

  const scrollToHighlight =
    previousHighlight.current?.from !== highlight?.from ||
    previousHighlight.current?.to !== highlight?.to;

  const scrollToQueryHighlight = previousQuery.current !== query;

  useEffect(() => {
    previousHighlight.current = highlight;
  }, [highlight]);

  useEffect(() => {
    previousQuery.current = query;
  }, [query]);

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      languageConfig[language].extension,
      errorExtension(parseErrors),
      queryExtension(queryHighlights, scrollToQueryHighlight),
      highlightExtension(highlight, scrollToHighlight),
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
    scrollToHighlight,
    scrollToQueryHighlight,
  ]);
}

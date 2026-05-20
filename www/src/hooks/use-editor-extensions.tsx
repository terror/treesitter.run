import { useEditorSettings } from '@/contexts/editor-settings-context';
import { errorExtension } from '@/extensions/error';
import { highlightExtension } from '@/extensions/highlight';
import { queryExtension } from '@/extensions/query';
import { usePreviousValue } from '@/hooks/use-previous-value';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { SyntaxRange } from '@/lib/types';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useMemo } from 'react';

interface UseEditorExtensionsOptions {
  highlight: { from: number; to: number } | undefined;
  parseErrors: ParseErrorRange[];
  query: string;
  queryHighlights: SyntaxRange[];
}

export function useEditorExtensions({
  highlight,
  parseErrors,
  query,
  queryHighlights,
}: UseEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  const previousHighlight = usePreviousValue(highlight);
  const previousQuery = usePreviousValue(query);

  const scrollToHighlight =
    previousHighlight?.from !== highlight?.from ||
    previousHighlight?.to !== highlight?.to;

  const scrollToQueryHighlight = previousQuery !== query;

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
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
    highlight,
    parseErrors,
    queryHighlights,
    scrollToHighlight,
    scrollToQueryHighlight,
    settings.keybindings,
    settings.lineWrapping,
    settings.tabSize,
  ]);
}

import { useEditorSettings } from '@/contexts/editor-settings-context';
import { parseDiagnosticsExtension } from '@/extensions/parse-diagnostics';
import { syntaxHighlightingExtension } from '@/extensions/syntax-highlighting';
import { collectParseErrors } from '@/lib/parse-errors';
import { queryCompletionSource } from '@/lib/query-completions';
import type { SyntaxNode } from '@/lib/types';
import { parse } from '@/lib/utils';
import { autocompletion } from '@codemirror/autocomplete';
import { EditorState, type Extension, Text } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';
import { useEffect, useMemo } from 'react';
import {
  type Parser,
  type Query,
  type Language as TSLanguage,
} from 'web-tree-sitter';

interface UseQueryEditorExtensionsOptions {
  parser: Parser | undefined;
  queryHighlightQuery: Query | null | undefined;
  queryLanguage: TSLanguage | undefined;
  queryText: string;
  root: SyntaxNode | undefined;
}

export function useQueryEditorExtensions({
  parser,
  queryHighlightQuery,
  queryLanguage,
  queryText,
  root,
}: UseQueryEditorExtensionsOptions): Extension[] {
  const { settings } = useEditorSettings();

  const doc = useMemo(() => Text.of(queryText.split('\n')), [queryText]);

  const queryTree = useMemo(() => {
    if (!parser || !queryLanguage) {
      return null;
    }

    return parse({ parser, language: queryLanguage, code: queryText });
  }, [parser, queryLanguage, queryText]);

  useEffect(
    () => () => {
      queryTree?.delete();
    },
    [queryTree]
  );

  const parseErrors = useMemo(() => {
    const root = queryTree?.rootNode as unknown as SyntaxNode | undefined;

    if (!root) {
      return [];
    }

    return collectParseErrors(root, doc);
  }, [doc, queryTree]);

  return useMemo(() => {
    const extensions: Extension[] = [
      EditorState.tabSize.of(settings.tabSize),
      syntaxHighlightingExtension({
        query: queryHighlightQuery,
        tree: queryTree,
      }),
      parseDiagnosticsExtension(parseErrors),
      autocompletion({
        override: [queryCompletionSource({ root })],
      }),
    ];

    if (settings.keybindings === 'vim') {
      extensions.push(vim());
    }

    if (settings.lineWrapping) {
      extensions.push(EditorView.lineWrapping);
    }

    return extensions;
  }, [
    parseErrors,
    queryHighlightQuery,
    queryTree,
    root,
    settings.keybindings,
    settings.lineWrapping,
    settings.tabSize,
  ]);
}

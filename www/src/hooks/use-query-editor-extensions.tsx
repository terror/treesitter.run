import { useEditorExtensions } from '@/hooks/use-editor-extensions';
import { useParsedTree } from '@/hooks/use-parsed-tree';
import { queryCompletionSource } from '@/lib/query-completions';
import type { SyntaxNode } from '@/lib/types';
import { autocompletion } from '@codemirror/autocomplete';
import type { Extension } from '@codemirror/state';
import { useMemo } from 'react';
import type { Language, Parser, Query } from 'web-tree-sitter';

interface UseQueryEditorExtensionsOptions {
  parser: Parser | undefined;
  queryHighlightQuery: Query | null | undefined;
  queryLanguage: Language | undefined;
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
  const { tree, parseErrors } = useParsedTree({
    code: queryText,
    language: queryLanguage,
    parser,
  });

  const extensions = useMemo(
    () => [
      autocompletion({
        override: [queryCompletionSource({ root })],
      }),
    ],
    [root]
  );

  return useEditorExtensions({
    extensions,
    syntaxHighlightQuery: queryHighlightQuery,
    parseErrors,
    tree,
  });
}

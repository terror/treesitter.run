import { collectParseErrors } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { parse } from '@/lib/utils';
import { useEffect, useMemo } from 'react';
import type { Language, Parser } from 'web-tree-sitter';

interface UseParsedTreeOptions {
  code: string;
  language: Language | undefined;
  parser: Parser | undefined;
}

export function useParsedTree({
  code,
  language,
  parser,
}: UseParsedTreeOptions) {
  const tree = useMemo(() => {
    if (!parser || !language) {
      return null;
    }

    return parse({ parser, language, code });
  }, [parser, language, code]);

  useEffect(
    () => () => {
      tree?.delete();
    },
    [tree]
  );

  const root = useMemo(() => {
    return (tree?.rootNode as unknown as SyntaxNode) ?? undefined;
  }, [tree]);

  const parseErrors = useMemo(() => {
    if (!root) {
      return [];
    }

    return collectParseErrors(root);
  }, [root]);

  return { tree, root, parseErrors };
}

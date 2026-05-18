import { type ParseErrorRange, collectParseErrors } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { parse } from '@/lib/utils';
import { Text } from '@codemirror/state';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type Parser,
  type Language as TSLanguage,
  type Tree,
} from 'web-tree-sitter';

interface UseSyntaxTreeOptions {
  parser: Parser | undefined;
  language: TSLanguage | undefined;
  code: string;
}

interface UseSyntaxTree {
  tree: Tree | null;
  root: SyntaxNode | undefined;
  parseErrors: ParseErrorRange[];
  collapsedNodePaths: Set<string>;
  toggleCollapse: (nodePath: string) => void;
}

export function useSyntaxTree({
  parser,
  language,
  code,
}: UseSyntaxTreeOptions): UseSyntaxTree {
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

    return collectParseErrors(root, Text.of(code.split('\n')));
  }, [root, code]);

  const [collapsedNodePaths, setCollapsedNodePaths] = useState<Set<string>>(
    () => new Set()
  );

  const toggleCollapse = useCallback((nodePath: string) => {
    setCollapsedNodePaths((prev) => {
      const next = new Set(prev);

      if (next.has(nodePath)) {
        next.delete(nodePath);
      } else {
        next.add(nodePath);
      }

      return next;
    });
  }, []);

  return { tree, root, parseErrors, collapsedNodePaths, toggleCollapse };
}

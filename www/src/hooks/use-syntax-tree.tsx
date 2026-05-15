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
  expandedNodes: Set<SyntaxNode>;
  toggleExpand: (node: SyntaxNode) => void;
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

  const [expandedNodes, setExpandedNodes] = useState<Set<SyntaxNode>>(
    () => new Set()
  );

  useEffect(() => {
    if (!root) {
      setExpandedNodes(new Set());
      return;
    }

    const all = new Set<SyntaxNode>();

    const walk = (node: SyntaxNode) => {
      all.add(node);
      node.children.forEach(walk);
    };

    walk(root);

    setExpandedNodes(all);
  }, [root]);

  const toggleExpand = useCallback((node: SyntaxNode) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);

      if (next.has(node)) {
        next.delete(node);
      } else {
        next.add(node);
      }

      return next;
    });
  }, []);

  return { tree, root, parseErrors, expandedNodes, toggleExpand };
}

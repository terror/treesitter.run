import { type ParseErrorRange, collectParseErrors } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { parse, syntaxNodeKey } from '@/lib/utils';
import type { Text } from '@codemirror/state';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type Parser,
  type Language as TSLanguage,
  type Tree,
} from 'web-tree-sitter';

interface UseSyntaxTreeOptions {
  code: string;
  doc: Text;
  language: TSLanguage | undefined;
  parser: Parser | undefined;
}

interface UseSyntaxTree {
  tree: Tree | null;
  root: SyntaxNode | undefined;
  parseErrors: ParseErrorRange[];
  expandedNodes: Set<string>;
  toggleExpand: (node: SyntaxNode) => void;
}

export function useSyntaxTree({
  code,
  doc,
  language,
  parser,
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

    return collectParseErrors(root, doc);
  }, [doc, root]);

  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(
    () => new Set()
  );

  const expandedNodes = useMemo(() => {
    const expandedNodes = new Set<string>();

    if (!root) {
      return expandedNodes;
    }

    const walk = (node: SyntaxNode) => {
      const key = syntaxNodeKey(node);

      if (!collapsedNodes.has(key)) {
        expandedNodes.add(key);
      }

      node.children.forEach(walk);
    };

    walk(root);

    return expandedNodes;
  }, [collapsedNodes, root]);

  const toggleExpand = useCallback((node: SyntaxNode) => {
    setCollapsedNodes((collapsedNodes) => {
      const key = syntaxNodeKey(node);
      const next = new Set(collapsedNodes);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }, []);

  return { tree, root, parseErrors, expandedNodes, toggleExpand };
}

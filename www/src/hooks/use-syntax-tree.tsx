import { type ParseErrorRange, collectParseErrors } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { parse } from '@/lib/utils';
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
  expandedNodes: Set<SyntaxNode>;
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

  const [expandedNodes, setExpandedNodes] = useState<Set<SyntaxNode>>(
    () => new Set()
  );

  useEffect(() => {
    if (!root) {
      setExpandedNodes(new Set());
      return;
    }

    const expandedNodes = new Set<SyntaxNode>();

    const walk = (node: SyntaxNode) => {
      expandedNodes.add(node);
      node.children.forEach(walk);
    };

    walk(root);

    setExpandedNodes(expandedNodes);
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

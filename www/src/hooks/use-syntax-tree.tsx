import {
  type UseParsedTreeOptions,
  useParsedTree,
} from '@/hooks/use-parsed-tree';
import type { ParseErrorRange } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { syntaxNodeKey } from '@/lib/utils';
import { useCallback, useState } from 'react';
import type { Tree } from 'web-tree-sitter';

interface UseSyntaxTree {
  tree: Tree | null;
  root: SyntaxNode | undefined;
  parseErrors: ParseErrorRange[];
  collapsedNodes: Set<string>;
  toggleExpand: (node: SyntaxNode) => void;
}

export function useSyntaxTree(options: UseParsedTreeOptions): UseSyntaxTree {
  const { tree, root, parseErrors } = useParsedTree(options);

  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(
    () => new Set()
  );

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

  return { tree, root, parseErrors, collapsedNodes, toggleExpand };
}

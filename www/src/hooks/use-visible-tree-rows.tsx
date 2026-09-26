import {
  type TreeNodeFilters,
  type VisibleTreeNodes,
  collectVisibleTreeNodes,
} from '@/lib/tree-filter';
import { syntaxNodeKey } from '@/lib/utils';
import { useMemo } from 'react';
import type { Node } from 'web-tree-sitter';

interface UseVisibleTreeRowsOptions {
  collapsedNodes: Set<string>;
  filters: TreeNodeFilters;
  root: Node | undefined;
  search: string;
}

export interface TreeRow {
  hasChildren: boolean;
  isExpanded: boolean;
  level: number;
  node: Node;
}

export function collectVisibleTreeRows({
  collapsedNodes,
  root,
  visibleTree,
}: {
  collapsedNodes: Set<string>;
  root: Node;
  visibleTree: VisibleTreeNodes;
}) {
  const rows: TreeRow[] = [];
  const stack = [{ node: root, level: 0 }];

  while (stack.length > 0) {
    const row = stack.pop();

    if (!row) {
      continue;
    }

    const { node, level } = row;
    const isExpanded = !collapsedNodes.has(syntaxNodeKey(node));

    const hasChildren = node.children.some(
      (child) => child !== null && visibleTree.visibleNodes.has(child)
    );

    rows.push({
      hasChildren,
      isExpanded,
      level,
      node,
    });

    if (isExpanded) {
      for (let index = node.children.length - 1; index >= 0; index--) {
        const child = node.children[index];

        if (child && visibleTree.visibleNodes.has(child)) {
          stack.push({ node: child, level: level + 1 });
        }
      }
    }
  }

  return rows;
}

export function useVisibleTreeRows({
  collapsedNodes,
  filters,
  root,
  search,
}: UseVisibleTreeRowsOptions) {
  const visibleTree = useMemo(() => {
    if (!root) {
      return undefined;
    }

    return collectVisibleTreeNodes({
      root,
      filters,
      search,
    });
  }, [filters, root, search]);

  const rootVisible = Boolean(root && visibleTree?.visibleNodes.has(root));

  const visibleRows = useMemo(() => {
    if (!root || !visibleTree) {
      return [];
    }

    return collectVisibleTreeRows({ collapsedNodes, root, visibleTree });
  }, [collapsedNodes, root, visibleTree]);

  return {
    rootVisible,
    visibleRows,
    visibleTree,
  };
}

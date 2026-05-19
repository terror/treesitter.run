import {
  type TreeNodeFilters,
  collectVisibleTreeNodes,
} from '@/lib/tree-filter';
import type { SyntaxNode } from '@/lib/types';
import { useMemo } from 'react';

interface UseVisibleTreeRowsOptions {
  activeFilterCount: number;
  expandedNodes: Set<SyntaxNode>;
  filters: TreeNodeFilters;
  root: SyntaxNode | undefined;
  search: string;
}

export interface TreeRow {
  hasChildren: boolean;
  isExpanded: boolean;
  level: number;
  node: SyntaxNode;
}

export function useVisibleTreeRows({
  activeFilterCount,
  expandedNodes,
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

  const forceExpanded = Boolean(
    visibleTree?.searchActive || activeFilterCount > 0
  );

  const rootVisible = Boolean(root && visibleTree?.visibleNodes.has(root));

  const visibleRows = useMemo(() => {
    if (!root || !visibleTree) {
      return [];
    }

    const rows: TreeRow[] = [];
    const stack = [{ node: root, level: 0 }];

    while (stack.length > 0) {
      const row = stack.pop();

      if (!row) {
        continue;
      }

      const { node, level } = row;

      const isExpanded = forceExpanded || expandedNodes.has(node);

      const hasChildren = node.children.some((child) =>
        visibleTree.visibleNodes.has(child)
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

          if (visibleTree.visibleNodes.has(child)) {
            stack.push({ node: child, level: level + 1 });
          }
        }
      }
    }

    return rows;
  }, [expandedNodes, forceExpanded, root, visibleTree]);

  return {
    rootVisible,
    visibleRows,
    visibleTree,
  };
}

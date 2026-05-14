import type { SyntaxNode } from './types';

export interface TreeNodeFilters {
  named: boolean;
  anonymous: boolean;
  extra: boolean;
}

export const defaultTreeNodeFilters: TreeNodeFilters = {
  named: true,
  anonymous: true,
  extra: true,
};

interface CollectVisibleTreeNodesOptions {
  root: SyntaxNode;
  filters: TreeNodeFilters;
  search: string;
}

export interface VisibleTreeNodes {
  visibleNodes: Set<SyntaxNode>;
  searchMatches: Set<SyntaxNode>;
  searchActive: boolean;
}

export const treeNodeMatchesFilters = (
  node: SyntaxNode,
  filters: TreeNodeFilters
): boolean => {
  if (node.isExtra) {
    return filters.extra;
  }

  if (node.isNamed) {
    return filters.named;
  }

  return filters.anonymous;
};

export const treeNodeMatchesSearch = (
  node: SyntaxNode,
  search: string
): boolean => {
  const normalizedSearch = search.trim().toLowerCase();

  return (
    normalizedSearch.length === 0 ||
    node.type.toLowerCase().includes(normalizedSearch)
  );
};

export const collectVisibleTreeNodes = ({
  root,
  filters,
  search,
}: CollectVisibleTreeNodesOptions): VisibleTreeNodes => {
  const normalizedSearch = search.trim().toLowerCase();
  const searchActive = normalizedSearch.length > 0;
  const visibleNodes = new Set<SyntaxNode>();
  const searchMatches = new Set<SyntaxNode>();

  const walk = (node: SyntaxNode): boolean => {
    const visibleChildren = node.children.map(walk).some(Boolean);
    const matchingNode =
      treeNodeMatchesFilters(node, filters) &&
      treeNodeMatchesSearch(node, normalizedSearch);
    const visible = matchingNode || visibleChildren;

    if (visible) {
      visibleNodes.add(node);
    }

    if (searchActive && matchingNode) {
      searchMatches.add(node);
    }

    return visible;
  };

  walk(root);

  return {
    visibleNodes,
    searchMatches,
    searchActive,
  };
};

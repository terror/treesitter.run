import type { SyntaxNode } from './types';

interface CollectVisibleTreeNodesOptions {
  root: SyntaxNode;
  filters: TreeNodeFilters;
  search: string;
}

export interface TreeNodeFilters {
  named: boolean;
  anonymous: boolean;
  extra: boolean;
}

export interface VisibleTreeNodes {
  visibleNodes: Set<SyntaxNode>;
  searchMatches: Set<SyntaxNode>;
  searchActive: boolean;
}

export const defaultTreeNodeFilters: TreeNodeFilters = {
  named: true,
  anonymous: true,
  extra: true,
};

/**
 * Collects the syntax tree nodes that should be rendered for the current search
 * and filter state.
 *
 * A node is visible when it directly matches both the filters and search, or
 * when at least one descendant is visible. Keeping ancestors visible preserves
 * tree context for matching descendants and gives the renderer enough
 * information to expand filtered branches.
 *
 * @param options - Inputs used to derive visible tree state.
 * @param options.root - Root syntax node to traverse.
 * @param options.filters - Current enabled state for named, anonymous, and extra nodes.
 * @param options.search - Raw search text entered by the user.
 * @returns Sets of visible nodes and direct search matches, plus whether search is active.
 */
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

/**
 * Determines whether a syntax node is enabled by the current node-type
 * filters.
 *
 * Extra nodes are treated as their own category, even when tree-sitter also
 * reports them as named. Non-extra named nodes are matched against the named
 * filter, and every remaining node is treated as anonymous.
 *
 * @param node - Syntax node to classify.
 * @param filters - Current enabled state for named, anonymous, and extra nodes.
 * @returns Whether the node should be considered visible before search is applied.
 */
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

/**
 * Determines whether a syntax node type matches the current search text.
 *
 * Search text is trimmed and compared case-insensitively against the node's
 * tree-sitter type. An empty search matches every node so callers can compose
 * this helper directly with filter checks.
 *
 * @param node - Syntax node whose type should be searched.
 * @param search - Raw search text entered by the user.
 * @returns Whether the node type contains the normalized search text.
 */
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

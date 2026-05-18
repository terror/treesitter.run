import { usePersistedState } from '@/hooks/use-persisted-state';
import {
  type TreeNodeFilters,
  collectVisibleTreeNodes,
  defaultTreeNodeFilters,
} from '@/lib/tree-filter';
import type { Language, SyntaxNode } from '@/lib/types';
import { Text } from '@codemirror/state';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Loader2, Search } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { ParserMetadataDialog } from './parser-metadata-dialog';
import { TreeFilterDialog } from './tree-filter-dialog';
import { TreeNode } from './tree-node';

interface TreePaneProps {
  root: SyntaxNode | undefined;
  code: string;
  language: Language;
  loading: boolean;
  collapsedNodePaths: Set<string>;
  toggleCollapse: (nodePath: string) => void;
  onDeleteRange: (range: { from: number; to: number }) => void;
  onHighlightChange: (range: { from: number; to: number } | undefined) => void;
}

interface TreeNodeRow {
  expanded: boolean;
  hasChildren: boolean;
  level: number;
  node: SyntaxNode;
  nodePath: string;
}

const treeNodeFilterKeys = Object.keys(
  defaultTreeNodeFilters
) as (keyof TreeNodeFilters)[];

const TREE_FILTER_STORAGE_KEY = 'treesitter.run:tree-filters';
const TREE_ROW_HEIGHT = 28;
const TREE_ROW_OVERSCAN = 8;

export const TreePane = ({
  root,
  code,
  language,
  loading,
  collapsedNodePaths,
  toggleCollapse,
  onDeleteRange,
  onHighlightChange,
}: TreePaneProps) => {
  const doc = useMemo(() => Text.of(code.split('\n')), [code]);
  const scroller = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState<string>('');

  const [filters, setFilters] = usePersistedState<TreeNodeFilters>(
    TREE_FILTER_STORAGE_KEY,
    defaultTreeNodeFilters
  );

  const activeFilterCount = useMemo(
    () =>
      treeNodeFilterKeys.filter(
        (key) => filters[key] !== defaultTreeNodeFilters[key]
      ).length,
    [filters]
  );

  const visibleTree = useMemo(() => {
    if (!root) {
      return undefined;
    }

    if (!search.trim() && activeFilterCount === 0) {
      return {
        visibleNodes: undefined,
        searchMatches: new Set<SyntaxNode>(),
        searchActive: false,
      };
    }

    return collectVisibleTreeNodes({
      root,
      filters,
      search,
    });
  }, [activeFilterCount, filters, root, search]);

  const forceExpanded = Boolean(
    visibleTree?.searchActive || activeFilterCount > 0
  );

  const rootVisible = Boolean(
    root && (!visibleTree?.visibleNodes || visibleTree.visibleNodes.has(root))
  );

  const rows = useMemo(() => {
    if (!root || !visibleTree || !rootVisible) {
      return [];
    }

    const rows: TreeNodeRow[] = [];

    const walk = (node: SyntaxNode, level: number, nodePath: string) => {
      const children = node.children.filter(
        (child) =>
          !visibleTree.visibleNodes || visibleTree.visibleNodes.has(child)
      );
      const hasChildren = children.length > 0;
      const expanded = forceExpanded || !collapsedNodePaths.has(nodePath);

      rows.push({
        expanded,
        hasChildren,
        level,
        node,
        nodePath,
      });

      if (!expanded) {
        return;
      }

      node.children.forEach((child, index) => {
        if (visibleTree.visibleNodes && !visibleTree.visibleNodes.has(child)) {
          return;
        }

        walk(child, level + 1, `${nodePath}/${index}`);
      });
    };

    walk(root, 0, '');

    return rows;
  }, [collapsedNodePaths, forceExpanded, root, rootVisible, visibleTree]);

  const getItemKey = useCallback(
    (index: number) => rows[index]?.nodePath || 'root',
    [rows]
  );

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => TREE_ROW_HEIGHT,
    getItemKey,
    getScrollElement: () => scroller.current,
    overscan: TREE_ROW_OVERSCAN,
  });

  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <div className='flex min-h-9 flex-wrap items-center gap-2 border-b bg-gray-50 px-2 py-1'>
        <div className='relative h-7 min-w-40 flex-1 sm:w-56 sm:flex-none'>
          <Search className='pointer-events-none absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500' />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search...'
            aria-label='Search node types'
            className='border-input h-7 w-full rounded-md border bg-white pr-2 pl-7 font-mono text-xs outline-none'
          />
        </div>
        <TreeFilterDialog
          filters={filters}
          activeFilterCount={activeFilterCount}
          onFiltersChange={setFilters}
        />

        <div className='ml-auto shrink-0'>
          <ParserMetadataDialog language={language} />
        </div>
      </div>

      <div ref={scroller} className='flex-1 overflow-auto p-2'>
        {loading ? (
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          </div>
        ) : root && visibleTree && rootVisible ? (
          <div
            className='relative'
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];

              return (
                <div
                  key={virtualRow.key}
                  className='absolute inset-x-0 top-0'
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <TreeNode
                    doc={doc}
                    expanded={row.expanded}
                    hasChildren={row.hasChildren}
                    level={row.level}
                    node={row.node}
                    nodePath={row.nodePath}
                    searchMatches={visibleTree.searchMatches}
                    toggleCollapse={toggleCollapse}
                    onDeleteRange={onDeleteRange}
                    onHighlightChange={onHighlightChange}
                  />
                </div>
              );
            })}
          </div>
        ) : root && visibleTree ? (
          <p className='p-4 text-center text-gray-500'>No matching nodes</p>
        ) : (
          <p className='p-4 text-center text-gray-500'>
            No parsed tree available
          </p>
        )}
      </div>
    </div>
  );
};

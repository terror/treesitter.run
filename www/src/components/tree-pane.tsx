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
import { useMemo, useRef, useState } from 'react';

import { ParserMetadataDialog } from './parser-metadata-dialog';
import { TreeFilterDialog } from './tree-filter-dialog';
import { TreeNode } from './tree-node';

interface TreePaneProps {
  root: SyntaxNode | undefined;
  code: string;
  language: Language;
  loading: boolean;
  expandedNodes: Set<SyntaxNode>;
  toggleExpand: (node: SyntaxNode) => void;
  onDeleteRange: (range: { from: number; to: number }) => void;
  onHighlightChange: (range: { from: number; to: number } | undefined) => void;
}

interface TreeRow {
  hasChildren: boolean;
  isExpanded: boolean;
  level: number;
  node: SyntaxNode;
}

const treeNodeFilterKeys = Object.keys(
  defaultTreeNodeFilters
) as (keyof TreeNodeFilters)[];

const TREE_FILTER_STORAGE_KEY = 'treesitter.run:tree-filters';

export const TreePane = ({
  root,
  code,
  language,
  loading,
  expandedNodes,
  toggleExpand,
  onDeleteRange,
  onHighlightChange,
}: TreePaneProps) => {
  const doc = useMemo(() => Text.of(code.split('\n')), [code]);

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

  const scrollParentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: visibleRows.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => 28,
    getItemKey: (index) => visibleRows[index]?.node.id ?? index,
    overscan: 20,
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

      <div ref={scrollParentRef} className='flex-1 overflow-auto'>
        {loading ? (
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          </div>
        ) : root && visibleTree && rootVisible ? (
          <div className='p-2'>
            <div
              className='relative min-w-full'
              style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = visibleRows[virtualRow.index];

                return (
                  <div
                    key={virtualRow.key}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    className='absolute top-0 left-0 min-w-full'
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <TreeNode
                      doc={doc}
                      hasChildren={row.hasChildren}
                      isExpanded={row.isExpanded}
                      level={row.level}
                      node={row.node}
                      searchMatches={visibleTree.searchMatches}
                      toggleExpand={toggleExpand}
                      onDeleteRange={onDeleteRange}
                      onHighlightChange={onHighlightChange}
                    />
                  </div>
                );
              })}
            </div>
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

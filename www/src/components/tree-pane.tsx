import {
  type TreeNodeFilters,
  collectVisibleTreeNodes,
  defaultTreeNodeFilters,
} from '@/lib/tree-filter';
import type { Language, SyntaxNode } from '@/lib/types';
import { Text } from '@codemirror/state';
import { Loader2, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ParserMetadataDialog } from './parser-metadata-dialog';
import { TreeNode } from './tree-node';

type TreeNodeFilter = keyof TreeNodeFilters;

const treeNodeFilterLabels: { filter: TreeNodeFilter; label: string }[] = [
  { filter: 'named', label: 'Named' },
  { filter: 'anonymous', label: 'Anonymous' },
  { filter: 'extra', label: 'Extra' },
];

interface TreePaneProps {
  root: SyntaxNode | undefined;
  code: string;
  language: Language;
  loading: boolean;
  expandedNodes: Set<SyntaxNode>;
  toggleExpand: (node: SyntaxNode) => void;
  onHighlightChange: (range: { from: number; to: number } | undefined) => void;
}

export const TreePane = ({
  root,
  code,
  language,
  loading,
  expandedNodes,
  toggleExpand,
  onHighlightChange,
}: TreePaneProps) => {
  const doc = useMemo(() => Text.of(code.split('\n')), [code]);
  const [search, setSearch] = useState<string>('');
  const [filters, setFilters] = useState<TreeNodeFilters>(
    defaultTreeNodeFilters
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

  const filtersActive = !filters.named || !filters.anonymous || !filters.extra;
  const forceExpanded = Boolean(
    visibleTree && (visibleTree.searchActive || filtersActive)
  );
  const rootVisible = Boolean(root && visibleTree?.visibleNodes.has(root));

  const setFilter = (filter: TreeNodeFilter, checked: boolean) => {
    setFilters((filters) => ({
      ...filters,
      [filter]: checked,
    }));
  };

  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <div className='flex min-h-9 flex-wrap items-center gap-2 border-b bg-gray-50 px-2 py-1'>
        <div className='relative h-7 min-w-40 flex-1 sm:w-56 sm:flex-none'>
          <Search className='pointer-events-none absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500' />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search nodes'
            aria-label='Search node types'
            className='border-input h-7 w-full rounded-md border bg-white pr-7 pl-7 font-mono text-xs outline-none'
          />
          {search ? (
            <button
              type='button'
              aria-label='Clear search'
              className='absolute top-1/2 right-1 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              onClick={() => setSearch('')}
            >
              <X className='h-3.5 w-3.5' />
            </button>
          ) : null}
        </div>

        <div className='flex items-center gap-2 overflow-x-auto'>
          {treeNodeFilterLabels.map(({ filter, label }) => (
            <label
              key={filter}
              className='flex h-7 shrink-0 cursor-pointer items-center gap-1.5 px-1 text-xs text-gray-700'
            >
              <input
                type='checkbox'
                checked={filters[filter]}
                onChange={(event) => setFilter(filter, event.target.checked)}
                className='h-3.5 w-3.5 accent-gray-900'
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div className='ml-auto shrink-0'>
          <ParserMetadataDialog language={language} />
        </div>
      </div>

      <div className='flex-1 overflow-auto'>
        {loading ? (
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          </div>
        ) : root && visibleTree && rootVisible ? (
          <div className='p-2'>
            <TreeNode
              node={root}
              level={0}
              doc={doc}
              expandedNodes={expandedNodes}
              visibleNodes={visibleTree.visibleNodes}
              searchMatches={visibleTree.searchMatches}
              forceExpanded={forceExpanded}
              toggleExpand={toggleExpand}
              onHighlightChange={onHighlightChange}
            />
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

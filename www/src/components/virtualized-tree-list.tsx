import type { TreeRow } from '@/hooks/use-visible-tree-rows';
import type { VisibleTreeNodes } from '@/lib/tree-filter';
import type { SyntaxNode } from '@/lib/types';
import { syntaxNodeKey } from '@/lib/utils';
import type { Text } from '@codemirror/state';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Loader2 } from 'lucide-react';
import { useRef } from 'react';

import { TreeNode } from './tree-node';

interface VirtualizedTreeListProps {
  doc: Text;
  loading: boolean;
  onDeleteRange: (range: { from: number; to: number }) => void;
  onHighlightChange: (range: { from: number; to: number } | undefined) => void;
  queryMatchKeys: Set<string>;
  root: SyntaxNode | undefined;
  rootVisible: boolean;
  toggleExpand: (node: SyntaxNode) => void;
  visibleRows: TreeRow[];
  visibleTree: VisibleTreeNodes | undefined;
}

export const VirtualizedTreeList = ({
  doc,
  loading,
  onDeleteRange,
  onHighlightChange,
  queryMatchKeys,
  root,
  rootVisible,
  toggleExpand,
  visibleRows,
  visibleTree,
}: VirtualizedTreeListProps) => {
  const scrollParentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: visibleRows.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => 28,
    getItemKey: (index) => visibleRows[index]?.node.id ?? index,
    overscan: 20,
  });

  return (
    <div ref={scrollParentRef} className='h-full overflow-auto'>
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
                    queryMatch={queryMatchKeys.has(syntaxNodeKey(row.node))}
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
  );
};

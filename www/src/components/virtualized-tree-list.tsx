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
  queryCaptureNamesByKey: Map<string, string[]>;
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
  queryCaptureNamesByKey,
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
    getItemKey: (index) =>
      visibleRows[index] ? syntaxNodeKey(visibleRows[index].node) : index,
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

              const queryCaptureNames =
                queryCaptureNamesByKey.get(syntaxNodeKey(row.node)) ?? [];

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
                    queryCaptureNames={queryCaptureNames}
                    queryMatch={queryCaptureNames.length > 0}
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
        <p className='text-muted-foreground p-4 text-center'>
          No matching nodes
        </p>
      ) : (
        <p className='text-muted-foreground p-4 text-center'>
          No parsed tree available
        </p>
      )}
    </div>
  );
};

import { parseErrorKind, parseErrorLabel } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { cn, positionToOffset } from '@/lib/utils';
import { Text } from '@codemirror/state';
import { ChevronDown, ChevronRight, Copy, Info, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { NodeInspectorDialog } from './node-inspector-dialog';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './ui/context-menu';

interface TreeNodeProps {
  doc: Text;
  expandedNodes: Set<SyntaxNode>;
  forceExpanded: boolean;
  level: number;
  node: SyntaxNode;
  onDeleteRange: (range: { from: number; to: number }) => void;
  onHighlightChange: (range?: { from: number; to: number }) => void;
  searchMatches: Set<SyntaxNode>;
  toggleExpand: (node: SyntaxNode) => void;
  visibleNodes: Set<SyntaxNode>;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  doc,
  expandedNodes,
  forceExpanded,
  level,
  node,
  onDeleteRange,
  onHighlightChange,
  searchMatches,
  toggleExpand,
  visibleNodes,
}) => {
  const children = node.children.filter((child) => visibleNodes.has(child));
  const errorKind = parseErrorKind(node);
  const hasChildren = children.length > 0;
  const isExpanded = forceExpanded || expandedNodes.has(node);
  const searchMatch = searchMatches.has(node);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const from = positionToOffset(node.startPosition, doc);
  const to = positionToOffset(node.endPosition, doc);
  const deletable = from !== null && to !== null && from < to;

  const handleMouseEnter = () => {
    if (from !== null && to !== null) {
      onHighlightChange({ from, to });
    }
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(node.text);
    toast.success('Copied node text to clipboard');
  };

  const inspect = () => {
    window.setTimeout(() => setInspectorOpen(true), 0);
  };

  const deleteNode = () => {
    if (from !== null && to !== null && from < to) {
      onDeleteRange({ from, to });
      toast.success('Deleted node text');
    }
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={cn(
              'tree-node flex cursor-pointer items-center border-l-2 border-transparent py-1 font-mono text-sm whitespace-nowrap hover:bg-blue-50',
              searchMatch && 'bg-yellow-50 text-yellow-900 hover:bg-yellow-100',
              errorKind === 'error' &&
                'border-red-500 bg-red-50 text-red-800 hover:bg-red-100',
              errorKind === 'missing' &&
                'border-amber-500 bg-amber-50 text-amber-800 hover:bg-amber-100'
            )}
            style={{ paddingLeft: `${level * 16 + 4}px` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => onHighlightChange(undefined)}
            onClick={() => hasChildren && toggleExpand(node)}
          >
            <span className='mr-1 flex w-4 justify-center'>
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )
              ) : (
                <span className='w-4'></span>
              )}
            </span>
            <span>{parseErrorLabel(node)}</span>
            <span
              className={cn(
                'ml-2 text-xs text-gray-500',
                errorKind === 'error' && 'text-red-500',
                errorKind === 'missing' && 'text-amber-600'
              )}
            >
              [{node.startPosition.row}: {node.startPosition.column}] [
              {node.endPosition.row}: {node.endPosition.column}]
            </span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={inspect}>
            <Info />
            Inspect
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => void copyText()}>
            <Copy />
            Copy text
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            disabled={!deletable}
            onSelect={deleteNode}
            variant='destructive'
          >
            <Trash2 />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <NodeInspectorDialog
        node={node}
        open={inspectorOpen}
        onOpenChange={setInspectorOpen}
      />
      {isExpanded &&
        hasChildren &&
        children.map((child, index) => (
          <TreeNode
            key={child.id ?? index}
            node={child}
            level={level + 1}
            doc={doc}
            expandedNodes={expandedNodes}
            visibleNodes={visibleNodes}
            searchMatches={searchMatches}
            forceExpanded={forceExpanded}
            toggleExpand={toggleExpand}
            onDeleteRange={onDeleteRange}
            onHighlightChange={onHighlightChange}
          />
        ))}
    </>
  );
};

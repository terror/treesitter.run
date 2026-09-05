import { parseErrorKind } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { cn } from '@/lib/utils';
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
  hasChildren: boolean;
  isExpanded: boolean;
  level: number;
  node: SyntaxNode;
  onDeleteRange: (range: { from: number; to: number }) => void;
  onHighlightChange: (range?: { from: number; to: number }) => void;
  queryCaptureNames: string[];
  queryMatch: boolean;
  searchMatches: Set<SyntaxNode>;
  toggleExpand: (node: SyntaxNode) => void;
}

export const TreeNode = ({
  hasChildren,
  isExpanded,
  level,
  node,
  onDeleteRange,
  onHighlightChange,
  queryCaptureNames,
  queryMatch,
  searchMatches,
  toggleExpand,
}: TreeNodeProps) => {
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const errorKind = parseErrorKind(node);
  const label = node.isMissing ? `MISSING ${node.type}` : node.type;

  const from = node.startIndex;
  const to = node.endIndex;

  const deletable = from < to;

  const handleMouseEnter = () => {
    onHighlightChange({ from, to });
  };

  const copyNodeLabel = async () => {
    await navigator.clipboard.writeText(label);
    toast.success('Copied node label to clipboard');
  };

  const copySourceText = async () => {
    await navigator.clipboard.writeText(node.text);
    toast.success('Copied source text to clipboard');
  };

  const inspect = () => {
    window.setTimeout(() => setInspectorOpen(true), 0);
  };

  const deleteNode = () => {
    if (deletable) {
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
              'tree-node flex cursor-pointer items-center border-l-2 border-transparent py-1 font-mono text-sm whitespace-nowrap hover:bg-blue-50 dark:hover:bg-blue-950/50',
              queryMatch &&
                'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-100 dark:hover:bg-emerald-900/50',
              searchMatches.has(node) &&
                'bg-yellow-50 text-yellow-900 hover:bg-yellow-100 dark:bg-yellow-950/40 dark:text-yellow-200 dark:hover:bg-yellow-950/60',
              errorKind === 'error' &&
                'border-red-500 bg-red-50 text-red-800 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-950/60',
              errorKind === 'missing' &&
                'border-amber-500 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60'
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
            <span>{label}</span>
            {queryCaptureNames.map((name) => (
              <span
                key={name}
                className='ml-2 rounded-sm bg-emerald-600 px-1 text-xs leading-4 text-white'
              >
                {name.startsWith('@') ? name : `@${name}`}
              </span>
            ))}
            <span
              className={cn(
                'text-muted-foreground ml-2 text-xs',
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
          <ContextMenuItem onSelect={() => void copyNodeLabel()}>
            <Copy />
            Copy node label
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => void copySourceText()}>
            <Copy />
            Copy source text
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
    </>
  );
};

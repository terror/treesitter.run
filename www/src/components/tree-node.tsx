import { parseErrorKind, parseErrorLabel } from '@/lib/parse-errors';
import type { SyntaxNode } from '@/lib/types';
import { cn, positionToOffset } from '@/lib/utils';
import { Text } from '@codemirror/state';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TreeNodeProps {
  node: SyntaxNode;
  level: number;
  doc: Text;
  expandedNodes: Set<SyntaxNode>;
  visibleNodes: Set<SyntaxNode>;
  searchMatches: Set<SyntaxNode>;
  forceExpanded: boolean;
  toggleExpand: (node: SyntaxNode) => void;
  onHighlightChange: (range?: { from: number; to: number }) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  doc,
  expandedNodes,
  visibleNodes,
  searchMatches,
  forceExpanded,
  toggleExpand,
  onHighlightChange,
}) => {
  const children = node.children.filter((child) => visibleNodes.has(child));
  const hasChildren = children.length > 0;
  const isExpanded = forceExpanded || expandedNodes.has(node);
  const searchMatch = searchMatches.has(node);
  const errorKind = parseErrorKind(node);

  const handleMouseEnter = () => {
    const from = positionToOffset(node.startPosition, doc);
    const to = positionToOffset(node.endPosition, doc);

    if (from !== null && to !== null) {
      onHighlightChange({ from, to });
    }
  };

  return (
    <>
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
            onHighlightChange={onHighlightChange}
          />
        ))}
    </>
  );
};

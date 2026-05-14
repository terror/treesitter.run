import type { Language, SyntaxNode } from '@/lib/types';
import { Text } from '@codemirror/state';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

import { ParserMetadataDialog } from './parser-metadata-dialog';
import { TreeNode } from './tree-node';

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

  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <div className='flex items-center justify-end border-b bg-gray-50 px-2 py-1'>
        <ParserMetadataDialog language={language} />
      </div>

      <div className='flex-1 overflow-auto'>
        {loading ? (
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
          </div>
        ) : root ? (
          <div className='p-2'>
            <TreeNode
              node={root}
              level={0}
              doc={doc}
              expandedNodes={expandedNodes}
              toggleExpand={toggleExpand}
              onHighlightChange={onHighlightChange}
            />
          </div>
        ) : (
          <p className='p-4 text-center text-gray-500'>
            No parsed tree available
          </p>
        )}
      </div>
    </div>
  );
};

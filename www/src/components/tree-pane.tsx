import { useTreeFilters } from '@/hooks/use-tree-filters';
import { useTreeQuery } from '@/hooks/use-tree-query';
import { useVisibleTreeRows } from '@/hooks/use-visible-tree-rows';
import type { Language, QueryCapture, SyntaxNode } from '@/lib/types';
import { Text } from '@codemirror/state';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';
import { type Language as TSLanguage } from 'web-tree-sitter';

import { QueryBar, QueryPane } from './query-pane';
import { TreeToolbar } from './tree-toolbar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './ui/resizable';
import { VirtualizedTreeList } from './virtualized-tree-list';

interface TreePaneProps {
  code: string;
  expandedNodes: Set<SyntaxNode>;
  language: Language;
  loading: boolean;
  onDeleteRange: (range: { from: number; to: number }) => void;
  onHighlightChange: (range: { from: number; to: number } | undefined) => void;
  onQueryCapturesChange: (captures: QueryCapture[]) => void;
  root: SyntaxNode | undefined;
  toggleExpand: (node: SyntaxNode) => void;
  treeSitterLanguage: TSLanguage | undefined;
}

const TREE_QUERY_LAYOUT_STORAGE_KEY = 'treesitter.run:tree-query-layout';

export const TreePane = ({
  code,
  expandedNodes,
  language,
  loading,
  onDeleteRange,
  onHighlightChange,
  onQueryCapturesChange,
  root,
  toggleExpand,
  treeSitterLanguage,
}: TreePaneProps) => {
  const doc = useMemo(() => Text.of(code.split('\n')), [code]);

  const [search, setSearch] = useState<string>('');
  const [queryCollapsed, setQueryCollapsed] = useState<boolean>(false);

  const queryPanelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  const { activeFilterCount, filters, setFilters } = useTreeFilters();

  const { rootVisible, visibleRows, visibleTree } = useVisibleTreeRows({
    activeFilterCount,
    expandedNodes,
    filters,
    root,
    search,
  });

  const {
    captures,
    error: queryError,
    query,
    queryMatchKeys,
    setQuery,
  } = useTreeQuery({
    doc,
    language,
    root,
    treeSitterLanguage,
  });

  useEffect(() => {
    onQueryCapturesChange(captures);
  }, [captures, onQueryCapturesChange]);

  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <TreeToolbar
        activeFilterCount={activeFilterCount}
        filters={filters}
        language={language}
        onFiltersChange={setFilters}
        onSearchChange={setSearch}
        search={search}
      />

      <ResizablePanelGroup
        autoSaveId={TREE_QUERY_LAYOUT_STORAGE_KEY}
        direction='vertical'
        className='min-h-0 flex-1'
        ref={queryPanelGroupRef}
      >
        <ResizablePanel id='syntax-tree' defaultSize={70} minSize={25}>
          <VirtualizedTreeList
            doc={doc}
            loading={loading}
            onDeleteRange={onDeleteRange}
            onHighlightChange={onHighlightChange}
            queryMatchKeys={queryMatchKeys}
            root={root}
            rootVisible={rootVisible}
            toggleExpand={toggleExpand}
            visibleRows={visibleRows}
            visibleTree={visibleTree}
          />
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel
          id='query'
          defaultSize={30}
          minSize={15}
          collapsible
          collapsedSize={0}
          onCollapse={() => setQueryCollapsed(true)}
          onExpand={() => setQueryCollapsed(false)}
        >
          <QueryPane
            captures={captures}
            error={queryError}
            query={query}
            onQueryChange={setQuery}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      {queryCollapsed ? (
        <QueryBar
          captures={captures}
          className='border-b-0'
          error={queryError}
          onExpand={() => {
            setQueryCollapsed(false);
            queryPanelGroupRef.current?.setLayout([50, 50]);
          }}
        />
      ) : null}
    </div>
  );
};

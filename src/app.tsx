import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useEditorSettings } from '@/contexts/editor-settings-context';
import { languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { Loader2, TentTree } from 'lucide-react';
import { useCallback, useState } from 'react';

import { EditorPane } from './components/editor-pane';
import { TreePane } from './components/tree-pane';
import { useEditorExtensions } from './hooks/use-editor-extensions';
import { useMediaQuery } from './hooks/use-media-query';
import { usePersistedState } from './hooks/use-persisted-state';
import { useSyntaxTree } from './hooks/use-syntax-tree';
import { useTreeSitter } from './hooks/use-tree-sitter';

const EDITOR_STORAGE_KEY = 'treesitter.run:editor-state';
const PANEL_LAYOUT_STORAGE_KEY = 'treesitter.run:panel-layout';
const STACKED_LAYOUT_QUERY = '(max-width: 767px)';

const App = () => {
  const { settings, updateSettings } = useEditorSettings();
  const { parser, language, loading, error } = useTreeSitter(settings.language);

  const stackedLayout = useMediaQuery(STACKED_LAYOUT_QUERY);
  const panelDirection = stackedLayout ? 'vertical' : 'horizontal';

  const [editorState, setEditorState] = usePersistedState<{ code: string }>(
    EDITOR_STORAGE_KEY,
    { code: languageConfig[settings.language].sampleCode }
  );

  const doc = editorState.code;

  const setDoc = useCallback(
    (code: string) => {
      setEditorState({ code });
    },
    [setEditorState]
  );

  const { root, expandedNodes, toggleExpand } = useSyntaxTree({
    parser,
    language,
    code: doc,
  });

  const [highlight, setHighlight] = useState<
    { from: number; to: number } | undefined
  >(undefined);

  const handleHighlightChange = useCallback(
    (range: { from: number; to: number } | undefined) => {
      setHighlight(range);
    },
    []
  );

  const handleLanguageChange = useCallback(
    (language: Language) => {
      updateSettings({ language });
      setDoc(languageConfig[language].sampleCode);
      setHighlight(undefined);
    },
    [setDoc, updateSettings]
  );

  const extensions = useEditorExtensions({
    language: settings.language,
    highlight,
  });

  if (error) {
    return <div className='p-4'>error: {error}</div>;
  }

  if (loading && !parser) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='flex h-screen max-w-full flex-col'>
      <div className='flex items-center gap-x-2 px-4 py-4'>
        <TentTree className='h-4 w-4' />
        <a href='/' className='font-semibold'>
          treesitter.run
        </a>
      </div>

      <div className='flex-1 overflow-hidden p-4'>
        <ResizablePanelGroup
          key={panelDirection}
          autoSaveId={`${PANEL_LAYOUT_STORAGE_KEY}:${panelDirection}`}
          direction={panelDirection}
          className='h-full rounded border'
        >
          <ResizablePanel id='editor-panel' defaultSize={50} minSize={30}>
            <EditorPane
              value={doc}
              onChange={setDoc}
              extensions={extensions}
              language={settings.language}
              onLanguageChange={handleLanguageChange}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel id='tree-panel' defaultSize={50} minSize={30}>
            <TreePane
              root={root}
              code={doc}
              loading={loading || !language}
              expandedNodes={expandedNodes}
              toggleExpand={toggleExpand}
              onHighlightChange={handleHighlightChange}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default App;

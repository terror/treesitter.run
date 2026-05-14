import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useEditorSettings } from '@/contexts/editor-settings-context';
import { languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { Loader2, TentTree } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';

import { AboutDialog } from './components/about-dialog';
import { CommandMenu } from './components/command-menu';
import { EditorPane } from './components/editor-pane';
import { TreePane } from './components/tree-pane';
import { useEditorExtensions } from './hooks/use-editor-extensions';
import { useMediaQuery } from './hooks/use-media-query';
import { usePersistedState } from './hooks/use-persisted-state';
import { useSyntaxTree } from './hooks/use-syntax-tree';
import { useTreeSitter } from './hooks/use-tree-sitter';

const DEFAULT_PANEL_LAYOUT = [50, 50];
const EDITOR_STORAGE_KEY = 'treesitter.run:editor-state';
const PANEL_LAYOUT_STORAGE_DIRECTIONS = ['horizontal', 'vertical'] as const;
const PANEL_LAYOUT_STORAGE_KEY = 'treesitter.run:panel-layout';
const STACKED_LAYOUT_QUERY = '(max-width: 767px)';

const App = () => {
  const { settings, updateSettings } = useEditorSettings();
  const { parser, language, loading, error } = useTreeSitter(settings.language);

  const ready = Boolean(parser && language);

  const stackedLayout = useMediaQuery(STACKED_LAYOUT_QUERY);
  const panelDirection = stackedLayout ? 'vertical' : 'horizontal';
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  const [loaded, setLoaded] = useState<boolean>(false);
  const [panelLayoutVersion, setPanelLayoutVersion] = useState(0);

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

  const { root, parseErrors, expandedNodes, toggleExpand } = useSyntaxTree({
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

  const handleResetPaneLayout = useCallback(() => {
    for (const direction of PANEL_LAYOUT_STORAGE_DIRECTIONS) {
      window.localStorage.removeItem(
        `react-resizable-panels:${PANEL_LAYOUT_STORAGE_KEY}:${direction}`
      );
    }

    setPanelLayoutVersion((panelLayoutVersion) => panelLayoutVersion + 1);
    panelGroupRef.current?.setLayout(DEFAULT_PANEL_LAYOUT);
  }, []);

  const extensions = useEditorExtensions({
    language: settings.language,
    highlight,
    parseErrors,
  });

  useEffect(() => {
    if (ready) {
      setLoaded(true);
    }
  }, [ready]);

  if (error) {
    return <div className='p-4'>error: {error}</div>;
  }

  if (!loaded && !ready) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <div className='flex h-screen max-w-full flex-col'>
      <CommandMenu onResetPaneLayout={handleResetPaneLayout} />

      <div className='flex items-center gap-x-2 px-4 py-4'>
        <TentTree className='h-4 w-4' />
        <a href='/' className='font-semibold'>
          treesitter.run
        </a>
        <div className='ml-auto'>
          <AboutDialog />
        </div>
      </div>

      <div className='flex-1 overflow-hidden p-4'>
        <ResizablePanelGroup
          autoSaveId={`${PANEL_LAYOUT_STORAGE_KEY}:${panelDirection}`}
          className='h-full rounded border'
          direction={panelDirection}
          key={`${panelDirection}:${panelLayoutVersion}`}
          ref={panelGroupRef}
        >
          <ResizablePanel id='editor-panel' defaultSize={50} minSize={30}>
            <EditorPane
              extensions={extensions}
              language={settings.language}
              onChange={setDoc}
              onLanguageChange={handleLanguageChange}
              value={doc}
            />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel id='tree-panel' defaultSize={50} minSize={30}>
            <TreePane
              code={doc}
              expandedNodes={expandedNodes}
              language={settings.language}
              loading={loading || !language}
              onHighlightChange={handleHighlightChange}
              root={root}
              toggleExpand={toggleExpand}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default App;

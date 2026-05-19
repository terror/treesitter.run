import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useEditorSettings } from '@/contexts/editor-settings-context';
import { useTreeSitter } from '@/contexts/tree-sitter-context';
import { languageConfig } from '@/lib/language-config';
import type { Language, QueryCapture } from '@/lib/types';
import { Loader2, TentTree } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';

import { AboutDialog } from './components/about-dialog';
import { CommandMenu } from './components/command-menu';
import { EditorPane } from './components/editor-pane';
import { StatusBar } from './components/status-bar';
import { TreePane } from './components/tree-pane';
import { useEditorExtensions } from './hooks/use-editor-extensions';
import { useMediaQuery } from './hooks/use-media-query';
import { usePersistedState } from './hooks/use-persisted-state';
import { useSyntaxTree } from './hooks/use-syntax-tree';

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

  const [cursorPosition, setCursorPosition] = useState({
    row: 1,
    column: 1,
  });

  const [editorState, setEditorState] = usePersistedState<{
    code: Partial<Record<Language, string>>;
  }>(EDITOR_STORAGE_KEY, { code: {} });

  const doc =
    editorState.code[settings.language] ??
    languageConfig[settings.language].sampleCode;

  const setDoc = useCallback(
    (code: string) => {
      setEditorState((editorState) => ({
        code: {
          ...editorState.code,
          [settings.language]: code,
        },
      }));
    },
    [setEditorState, settings.language]
  );

  const { root, parseErrors, expandedNodes, toggleExpand } = useSyntaxTree({
    parser,
    language,
    code: doc,
  });

  const [highlight, setHighlight] = useState<
    { from: number; to: number } | undefined
  >(undefined);

  const [queryCaptures, setQueryCaptures] = useState<QueryCapture[]>([]);

  const handleHighlightChange = useCallback(
    (range: { from: number; to: number } | undefined) => {
      setHighlight(range);
    },
    []
  );

  const handleDeleteRange = useCallback(
    ({ from, to }: { from: number; to: number }) => {
      setDoc(`${doc.slice(0, from)}${doc.slice(to)}`);
      setHighlight(undefined);
      setQueryCaptures([]);
    },
    [doc, setDoc]
  );

  const handleLanguageChange = useCallback(
    (language: Language) => {
      updateSettings({ language });
      setHighlight(undefined);
      setQueryCaptures([]);
    },
    [updateSettings]
  );

  const handleResetCode = useCallback(
    (language: Language) => {
      setEditorState((editorState) => ({
        code: {
          ...editorState.code,
          [language]: languageConfig[language].sampleCode,
        },
      }));
      setHighlight(undefined);
      setQueryCaptures([]);
    },
    [setEditorState]
  );

  const handleQueryCapturesChange = useCallback((captures: QueryCapture[]) => {
    setQueryCaptures(captures);
  }, []);

  const handleResetPaneLayout = useCallback(() => {
    for (const direction of PANEL_LAYOUT_STORAGE_DIRECTIONS) {
      window.localStorage.removeItem(
        `react-resizable-panels:${PANEL_LAYOUT_STORAGE_KEY}:${direction}`
      );
    }

    setPanelLayoutVersion((panelLayoutVersion) => panelLayoutVersion + 1);
    panelGroupRef.current?.setLayout(DEFAULT_PANEL_LAYOUT);
  }, []);

  const queryHighlights = useMemo(
    () => queryCaptures.map((capture) => capture.range),
    [queryCaptures]
  );

  const extensions = useEditorExtensions({
    language: settings.language,
    highlight,
    queryHighlights,
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

      <div className='flex items-center gap-x-2 px-4 pt-4 pb-2'>
        <TentTree className='h-4 w-4' />
        <a href='/' className='cursor-pointer font-semibold'>
          treesitter.run
        </a>
        <div className='ml-auto'>
          <AboutDialog />
        </div>
      </div>

      <div className='flex-1 overflow-hidden p-2'>
        <div className='flex h-full flex-col overflow-hidden rounded border'>
          <ResizablePanelGroup
            autoSaveId={`${PANEL_LAYOUT_STORAGE_KEY}:${panelDirection}`}
            className='min-h-0 flex-1'
            direction={panelDirection}
            key={`${panelDirection}:${panelLayoutVersion}`}
            ref={panelGroupRef}
          >
            <ResizablePanel id='editor-panel' defaultSize={50} minSize={30}>
              <EditorPane
                extensions={extensions}
                language={settings.language}
                onChange={setDoc}
                onCursorPositionChange={setCursorPosition}
                onLanguageChange={handleLanguageChange}
                onResetCode={handleResetCode}
                value={doc}
              />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel id='tree-panel' defaultSize={50} minSize={30}>
              <TreePane
                code={doc}
                expandedNodes={expandedNodes}
                language={settings.language}
                treeSitterLanguage={language}
                loading={loading || !language}
                onDeleteRange={handleDeleteRange}
                onHighlightChange={handleHighlightChange}
                onQueryCapturesChange={handleQueryCapturesChange}
                root={root}
                toggleExpand={toggleExpand}
              />
            </ResizablePanel>
          </ResizablePanelGroup>

          {ready && !loading ? (
            <StatusBar
              cursorPosition={cursorPosition}
              errorCount={parseErrors.length}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;

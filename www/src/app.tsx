import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useEditorSettings } from '@/contexts/editor-settings-context';
import { useTreeSitter } from '@/contexts/tree-sitter-context';
import type { Language } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';

import { AboutDialog } from './components/about-dialog';
import { CommandMenu } from './components/command-menu';
import { EditorPane } from './components/editor-pane';
import { Logo } from './components/logo';
import { StatusBar } from './components/status-bar';
import { ThemeToggle } from './components/theme-toggle';
import { TreePane } from './components/tree-pane';
import { useCursorPosition } from './hooks/use-cursor-position';
import { useEditorBuffer } from './hooks/use-editor-buffer';
import { useEditorHighlights } from './hooks/use-editor-highlights';
import { useHasLoaded } from './hooks/use-has-loaded';
import { usePanelLayout } from './hooks/use-panel-layout';
import { useQueryEditorExtensions } from './hooks/use-query-editor-extensions';
import { useSourceEditorExtensions } from './hooks/use-source-editor-extensions';
import { useTreeWorkbench } from './hooks/use-tree-workbench';

const App = () => {
  const { settings, updateSettings } = useEditorSettings();
  const {
    parser,
    language,
    query: highlightQuery,
    loading,
    error,
  } = useTreeSitter(settings.language);

  const { language: queryLanguage, query: queryHighlightQuery } =
    useTreeSitter('query');

  const ready = Boolean(parser && language);
  const loaded = useHasLoaded(ready);

  const {
    panelDirection,
    panelGroupRef,
    panelLayoutStorageKey,
    panelLayoutVersion,
    resetPaneLayout,
  } = usePanelLayout();

  const { cursorPosition, setCursorPosition } = useCursorPosition();
  const { code, resetCode, setCode } = useEditorBuffer(settings.language);

  const {
    collapsedNodes,
    parseErrors,
    query,
    queryCaptureNamesByKey,
    queryCaptures,
    queryError,
    root,
    setQuery,
    tree,
    toggleExpand,
  } = useTreeWorkbench({
    code,
    language: settings.language,
    parser,
    treeSitterLanguage: language,
  });

  const { clearHighlights, highlight, onHighlightChange } =
    useEditorHighlights();

  const handleDeleteRange = useCallback(
    ({ from, to }: { from: number; to: number }) => {
      setCode(`${code.slice(0, from)}${code.slice(to)}`);
      clearHighlights();
    },
    [clearHighlights, code, setCode]
  );

  const handleLanguageChange = useCallback(
    (language: Language) => {
      updateSettings({ language });
      clearHighlights();
    },
    [clearHighlights, updateSettings]
  );

  const handleResetCode = useCallback(
    (language: Language) => {
      resetCode(language);
      clearHighlights();
    },
    [clearHighlights, resetCode]
  );

  const extensions = useSourceEditorExtensions({
    selectedNodeRange: highlight,
    syntaxHighlightQuery: highlightQuery,
    queryText: query,
    queryCaptures,
    parseErrors,
    tree,
  });

  const queryExtensions = useQueryEditorExtensions({
    parser,
    queryHighlightQuery,
    queryLanguage,
    queryText: query,
    root,
  });

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
      <CommandMenu onResetPaneLayout={resetPaneLayout} />

      <div className='flex items-center gap-x-2 px-4 pt-4 pb-2'>
        <Logo className='h-4 w-4' />
        <a href='/' className='cursor-pointer font-semibold'>
          treesitter.run
        </a>
        <div className='ml-auto flex items-center gap-1'>
          <ThemeToggle />
          <AboutDialog />
        </div>
      </div>

      <div className='flex-1 overflow-hidden p-2'>
        <div className='flex h-full flex-col overflow-hidden rounded border'>
          <ResizablePanelGroup
            autoSaveId={`${panelLayoutStorageKey}:${panelDirection}`}
            className='min-h-0 flex-1'
            direction={panelDirection}
            key={`${panelDirection}:${panelLayoutVersion}`}
            ref={panelGroupRef}
          >
            <ResizablePanel id='editor-panel' defaultSize={50} minSize={30}>
              <EditorPane
                extensions={extensions}
                language={settings.language}
                onChange={setCode}
                onCursorPositionChange={setCursorPosition}
                onLanguageChange={handleLanguageChange}
                onResetCode={handleResetCode}
                value={code}
              />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel id='tree-panel' defaultSize={50} minSize={30}>
              <TreePane
                collapsedNodes={collapsedNodes}
                language={settings.language}
                loading={loading || !language}
                onDeleteRange={handleDeleteRange}
                onHighlightChange={onHighlightChange}
                query={query}
                queryCaptureNamesByKey={queryCaptureNamesByKey}
                queryCaptures={queryCaptures}
                queryError={queryError}
                queryExtensions={queryExtensions}
                root={root}
                setQuery={setQuery}
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

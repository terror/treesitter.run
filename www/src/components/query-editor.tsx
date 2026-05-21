import { useEditorSettings } from '@/contexts/editor-settings-context';
import { cn } from '@/lib/utils';
import type { Extension } from '@codemirror/state';
import CodeMirror from '@uiw/react-codemirror';

interface QueryEditorProps {
  extensions: Extension[];
  onChange: (query: string) => void;
  value: string;
}

export const QueryEditor = ({
  extensions,
  onChange,
  value,
}: QueryEditorProps) => {
  const { settings } = useEditorSettings();

  return (
    <div
      className={cn(
        'editor-host h-full w-full overflow-hidden',
        `editor-theme-${settings.syntaxTheme}`
      )}
    >
      <CodeMirror
        value={value}
        extensions={extensions}
        basicSetup={{
          lineNumbers: settings.lineNumbers,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          bracketMatching: true,
          history: true,
          indentOnInput: true,
          syntaxHighlighting: false,
          foldGutter: false,
          closeBrackets: false,
          autocompletion: false,
          highlightSelectionMatches: false,
        }}
        onChange={onChange}
        height='100%'
        style={{ height: '100%' }}
        placeholder='(function_item name: (identifier) @name)'
        aria-label='Tree-sitter query'
      />
    </div>
  );
};

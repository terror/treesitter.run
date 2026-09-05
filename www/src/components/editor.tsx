import { useEditorSettings } from '@/contexts/editor-settings-context';
import { cn } from '@/lib/utils';
import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onUpdate?: (update: ViewUpdate) => void;
  placeholder?: string;
  'aria-label'?: string;
  extensions: Extension[];
}

export const Editor = ({
  value,
  onChange,
  onUpdate,
  placeholder,
  'aria-label': ariaLabel,
  extensions,
}: EditorProps) => {
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
        onUpdate={onUpdate}
        height='100%'
        style={{ height: '100%' }}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
};

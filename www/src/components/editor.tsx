import { useEditorSettings } from '@/contexts/editor-settings-context';
import { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onCursorPositionChange: (position: { row: number; column: number }) => void;
  extensions: Extension[];
}

export const Editor = ({
  value,
  onChange,
  onCursorPositionChange,
  extensions,
}: EditorProps) => {
  const { settings } = useEditorSettings();

  const handleUpdate = (update: ViewUpdate) => {
    if (!update.selectionSet && !update.docChanged) {
      return;
    }

    const head = update.state.selection.main.head;
    const line = update.state.doc.lineAt(head);

    onCursorPositionChange({
      row: line.number,
      column: head - line.from + 1,
    });
  };

  return (
    <div className='editor-host h-full w-full overflow-hidden'>
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
        onUpdate={handleUpdate}
        height='100%'
        style={{ height: '100%' }}
      />
    </div>
  );
};

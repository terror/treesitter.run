import { Extension } from '@codemirror/state';
import { EditorView, ViewPlugin } from '@codemirror/view';

export const scrollIntoViewExtension = (from: number): Extension =>
  ViewPlugin.fromClass(
    class {
      constructor(view: EditorView) {
        queueMicrotask(() => {
          view.dispatch({
            effects: EditorView.scrollIntoView(from, {
              y: 'center',
            }),
          });
        });
      }
    }
  );

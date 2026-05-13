import { Extension } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';

const highlightMark = Decoration.mark({ class: 'cm-highlighted-node' });

const scrollIntoViewExtension = (position: number): Extension =>
  ViewPlugin.fromClass(
    class {
      constructor(view: EditorView) {
        queueMicrotask(() => {
          view.dispatch({
            effects: EditorView.scrollIntoView(position, { y: 'center' }),
          });
        });
      }
    }
  );

export const highlightExtension = (
  range: { from: number; to: number } | undefined
): Extension => {
  if (!range) {
    return [];
  }

  const { from, to } = range;

  if (to < from) {
    return [];
  }

  const scrollExtension = scrollIntoViewExtension(from);

  if (from === to) {
    return [scrollExtension];
  }

  const decorations = Decoration.set([highlightMark.range(from, to)]);

  return [EditorView.decorations.of(() => decorations), scrollExtension];
};

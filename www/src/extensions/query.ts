import { Extension } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';

const queryMark = Decoration.mark({ class: 'cm-query-capture' });

export const queryExtension = (
  ranges: { from: number; to: number }[]
): Extension => {
  if (ranges.length === 0) {
    return [];
  }

  const scrollExtension = ViewPlugin.fromClass(
    class {
      constructor(view: EditorView) {
        queueMicrotask(() => {
          view.dispatch({
            effects: EditorView.scrollIntoView(ranges[0].from, { y: 'center' }),
          });
        });
      }
    }
  );

  return [
    EditorView.decorations.of((view) => {
      const decorations = ranges
        .filter(({ from, to }) => from < to)
        .map(({ from, to }) =>
          queryMark.range(
            Math.min(from, view.state.doc.length),
            Math.min(to, view.state.doc.length)
          )
        );

      return Decoration.set(decorations, true);
    }),
    scrollExtension,
  ];
};

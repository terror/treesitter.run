import { Extension } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';

const highlightMark = Decoration.mark({ class: 'cm-highlighted-node' });
const queryHighlightMark = Decoration.mark({ class: 'cm-query-capture' });

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

  const scrollExtension = ViewPlugin.fromClass(
    class {
      constructor(view: EditorView) {
        queueMicrotask(() => {
          view.dispatch({
            effects: EditorView.scrollIntoView(from, { y: 'center' }),
          });
        });
      }
    }
  );

  if (from === to) {
    return [scrollExtension];
  }

  const decorations = Decoration.set([highlightMark.range(from, to)]);

  return [EditorView.decorations.of(() => decorations), scrollExtension];
};

export const queryHighlightExtension = (
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
          queryHighlightMark.range(
            Math.min(from, view.state.doc.length),
            Math.min(to, view.state.doc.length)
          )
        );

      return Decoration.set(decorations, true);
    }),
    scrollExtension,
  ];
};

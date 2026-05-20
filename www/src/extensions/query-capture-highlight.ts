import { Extension } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';

import { scrollIntoViewExtension } from './scroll-into-view';

const queryMark = Decoration.mark({ class: 'cm-query-capture' });

export const queryCaptureHighlightExtension = (
  ranges: { from: number; to: number }[],
  scroll = true
): Extension => {
  if (ranges.length === 0) {
    return [];
  }

  const extensions: Extension[] = [
    EditorView.decorations.of((view) => {
      return Decoration.set(
        ranges
          .filter(({ from, to }) => from < to)
          .map(({ from, to }) =>
            queryMark.range(
              Math.min(from, view.state.doc.length),
              Math.min(to, view.state.doc.length)
            )
          ),
        true
      );
    }),
  ];

  if (scroll) {
    extensions.push(scrollIntoViewExtension(ranges[0].from));
  }

  return extensions;
};

import { Extension } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';

import { scrollExtension } from './scroll';

const queryMark = Decoration.mark({ class: 'cm-query-capture' });

export const queryExtension = (
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
    extensions.push(scrollExtension(ranges[0].from));
  }

  return extensions;
};

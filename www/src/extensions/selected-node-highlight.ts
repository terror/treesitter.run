import { Extension } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';

import { scrollIntoViewExtension } from './scroll-into-view';

const highlightMark = Decoration.mark({ class: 'cm-highlighted-node' });

export const selectedNodeHighlightExtension = (
  range: { from: number; to: number } | undefined,
  scroll = true
): Extension => {
  if (!range || range.to < range.from) {
    return [];
  }

  const extensions: Extension[] = [
    EditorView.decorations.of((view) => {
      const from = Math.max(0, Math.min(range.from, view.state.doc.length));
      const to = Math.max(0, Math.min(range.to, view.state.doc.length));

      return from < to
        ? Decoration.set([highlightMark.range(from, to)])
        : Decoration.none;
    }),
  ];

  if (scroll) {
    extensions.push(scrollIntoViewExtension(range.from));
  }

  return extensions;
};

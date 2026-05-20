import { Extension } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';

import { scrollIntoViewExtension } from './scroll-into-view';

const highlightMark = Decoration.mark({ class: 'cm-highlighted-node' });

export const selectedNodeHighlightExtension = (
  range: { from: number; to: number } | undefined,
  scroll = true
): Extension => {
  if (!range) {
    return [];
  }

  const { from, to } = range;

  if (to < from) {
    return [];
  }

  if (!scroll) {
    if (from === to) {
      return [];
    }

    return EditorView.decorations.of(() =>
      Decoration.set([highlightMark.range(from, to)])
    );
  }

  if (from === to) {
    return [scrollIntoViewExtension(from)];
  }

  return [
    EditorView.decorations.of(() =>
      Decoration.set([highlightMark.range(from, to)])
    ),
    scrollIntoViewExtension(from),
  ];
};

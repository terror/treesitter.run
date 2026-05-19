import { Extension } from '@codemirror/state';
import { Decoration, EditorView } from '@codemirror/view';

import { scrollExtension } from './scroll';

const highlightMark = Decoration.mark({ class: 'cm-highlighted-node' });

export const highlightExtension = (
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
    return [scrollExtension(from)];
  }

  return [
    EditorView.decorations.of(() =>
      Decoration.set([highlightMark.range(from, to)])
    ),
    scrollExtension(from),
  ];
};

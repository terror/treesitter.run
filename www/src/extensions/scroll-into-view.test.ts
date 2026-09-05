import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { describe, expect, it, mock } from 'bun:test';

import { scrollIntoViewExtension } from './scroll-into-view';

describe('scrollIntoViewExtension', () => {
  it('bounds offsets to the document when scrolling is dispatched', async () => {
    const check = async (from: number, expected: number) => {
      const plugin = scrollIntoViewExtension(from) as unknown as {
        create: (view: EditorView) => void;
      };

      const view = {
        state: EditorState.create({ doc: 'foo bar' }),
        dispatch: mock(),
      };

      plugin.create(view as unknown as EditorView);
      view.state = EditorState.create({ doc: 'foo' });
      await Promise.resolve();

      expect(view.dispatch).toHaveBeenCalledWith({
        effects: EditorView.scrollIntoView(expected, { y: 'center' }),
      });
    };

    await check(-1, 0);
    await check(2, 2);
    await check(7, 3);
  });
});

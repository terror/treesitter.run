import { useCallback, useRef, useState } from 'react';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';

import { useMediaQuery } from './use-media-query';

const DEFAULT_PANEL_LAYOUT = [50, 50];
const PANEL_LAYOUT_STORAGE_DIRECTIONS = ['horizontal', 'vertical'] as const;
const PANEL_LAYOUT_STORAGE_KEY = 'treesitter.run:panel-layout';
const STACKED_LAYOUT_QUERY = '(max-width: 767px)';

export function usePanelLayout() {
  const stackedLayout = useMediaQuery(STACKED_LAYOUT_QUERY);

  const panelDirection: 'horizontal' | 'vertical' = stackedLayout
    ? 'vertical'
    : 'horizontal';

  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  const [panelLayoutVersion, setPanelLayoutVersion] = useState(0);

  const resetPaneLayout = useCallback(() => {
    for (const direction of PANEL_LAYOUT_STORAGE_DIRECTIONS) {
      window.localStorage.removeItem(
        `react-resizable-panels:${PANEL_LAYOUT_STORAGE_KEY}:${direction}`
      );
    }

    setPanelLayoutVersion((panelLayoutVersion) => panelLayoutVersion + 1);

    panelGroupRef.current?.setLayout(DEFAULT_PANEL_LAYOUT);
  }, []);

  return {
    panelDirection,
    panelGroupRef,
    panelLayoutStorageKey: PANEL_LAYOUT_STORAGE_KEY,
    panelLayoutVersion,
    resetPaneLayout,
  };
}

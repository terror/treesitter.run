import type { EditorSettings } from '@/contexts/editor-settings-context';
import {
  EditorSettingsContext,
  defaultSettings,
} from '@/contexts/editor-settings-context';
import { usePersistedState } from '@/hooks/use-persisted-state';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

export const EditorSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, setSettings] = usePersistedState<EditorSettings>(
    'editor-settings',
    defaultSettings
  );

  const updateSettings = (newSettings: Partial<EditorSettings>) => {
    setSettings(newSettings);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--editor-font-size',
      `${settings.fontSize}px`
    );
  }, [settings.fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      settings.colorMode === 'dark'
    );

    document.documentElement.style.colorScheme = settings.colorMode;
  }, [settings.colorMode]);

  return (
    <EditorSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </EditorSettingsContext.Provider>
  );
};

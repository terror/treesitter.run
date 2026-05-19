import { Language } from '@/lib/types';
import { createContext, useContext } from 'react';

export type EditorSyntaxTheme =
  | 'github-light'
  | 'catppuccin-latte'
  | 'tokyo-night-day'
  | 'ayu-light'
  | 'base16-seti';

export interface EditorSettings {
  fontSize: number;
  keybindings: 'default' | 'vim';
  language: Language;
  lineNumbers: boolean;
  lineWrapping: boolean;
  syntaxTheme: EditorSyntaxTheme;
  tabSize: number;
}

export const defaultSettings: EditorSettings = {
  fontSize: 14,
  keybindings: 'default',
  language: 'javascript',
  lineNumbers: true,
  lineWrapping: true,
  syntaxTheme: 'github-light',
  tabSize: 2,
};

export type EditorSettingsContextType = {
  settings: EditorSettings;
  updateSettings: (settings: Partial<EditorSettings>) => void;
};

export const EditorSettingsContext = createContext<
  EditorSettingsContextType | undefined
>(undefined);

export const useEditorSettings = () => {
  const context = useContext(EditorSettingsContext);

  if (context === undefined) {
    throw new Error(
      'useEditorSettings must be used within an EditorSettingsProvider'
    );
  }

  return context;
};

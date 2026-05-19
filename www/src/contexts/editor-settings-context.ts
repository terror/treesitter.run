import {
  type EditorSyntaxTheme,
  defaultSyntaxTheme,
} from '@/lib/syntax-themes';
import { Language } from '@/lib/types';
import { createContext, useContext } from 'react';

export type { EditorSyntaxTheme };

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
  syntaxTheme: defaultSyntaxTheme,
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

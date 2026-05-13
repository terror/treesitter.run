import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languageConfig } from '@/lib/language-config';
import type { Language } from '@/lib/types';
import { Extension } from '@codemirror/state';

import { Editor } from './editor';
import { EditorSettingsDialog } from './editor-settings-dialog';

interface EditorPaneProps {
  value: string;
  onChange: (value: string) => void;
  extensions: Extension[];
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const EditorPane = ({
  value,
  onChange,
  extensions,
  language,
  onLanguageChange,
}: EditorPaneProps) => {
  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <div className='flex items-center justify-between border-b bg-gray-50 px-2 py-1'>
        <Select
          value={language}
          onValueChange={(value) => onLanguageChange(value as Language)}
        >
          <SelectTrigger className='focus-visible:border-input h-7 w-36 cursor-pointer bg-white text-sm focus-visible:ring-0'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(languageConfig).map((config) => (
              <SelectItem key={config.name} value={config.name}>
                {config.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <EditorSettingsDialog />
      </div>
      <div className='flex-1 overflow-hidden'>
        <Editor value={value} onChange={onChange} extensions={extensions} />
      </div>
    </div>
  );
};

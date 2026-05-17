import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

import { Editor } from './editor';
import { EditorSettingsDialog } from './editor-settings-dialog';

interface EditorPaneProps {
  value: string;
  onChange: (value: string) => void;
  extensions: Extension[];
  language: Language;
  onLanguageChange: (language: Language) => void;
  onResetCode: (language: Language) => void;
}

export const EditorPane = ({
  value,
  onChange,
  extensions,
  language,
  onLanguageChange,
  onResetCode,
}: EditorPaneProps) => {
  const [resetOpen, setResetOpen] = useState<boolean>(false);
  const displayName = languageConfig[language].displayName;

  const resetCode = () => {
    onResetCode(language);
    setResetOpen(false);
  };

  return (
    <div className='flex h-full min-h-0 flex-col overflow-hidden'>
      <div className='flex items-center justify-between border-b bg-gray-50 px-2 py-1'>
        <div className='flex items-center gap-x-1'>
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

          <Button
            variant='ghost'
            size='icon'
            onClick={() => setResetOpen(true)}
            aria-label='Reset to sample code'
            title='Reset to sample code'
            className='h-7 w-7 cursor-pointer'
          >
            <RotateCcw className='h-4 w-4' />
          </Button>
        </div>

        <EditorSettingsDialog />
      </div>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Reset buffer</DialogTitle>
            <DialogDescription>
              Replace the current buffer with the sample code for {displayName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={resetCode}>Reset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className='flex-1 overflow-hidden'>
        <Editor value={value} onChange={onChange} extensions={extensions} />
      </div>
    </div>
  );
};

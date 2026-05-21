import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEditorSettings } from '@/contexts/editor-settings-context';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { settings, updateSettings } = useEditorSettings();
  const dark = settings.colorMode === 'dark';

  const toggleColorMode = () => {
    updateSettings({ colorMode: dark ? 'light' : 'dark' });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          pressed={dark}
          onPressedChange={toggleColorMode}
          aria-label={dark ? 'Use light mode' : 'Use dark mode'}
          size='sm'
          className='h-7 w-7 cursor-pointer p-0'
        >
          {dark ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        {dark ? 'Use light mode' : 'Use dark mode'}
      </TooltipContent>
    </Tooltip>
  );
};

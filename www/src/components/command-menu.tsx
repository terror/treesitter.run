import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { RotateCcwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type CommandMenuProps = {
  onResetPaneLayout: () => void;
};

export const CommandMenu = ({ onResetPaneLayout }: CommandMenuProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleResetPaneLayout = () => {
    onResetPaneLayout();
    setOpen(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title='Command menu'
      description='Run a command'
    >
      <CommandInput placeholder='Type a command...' />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading='Actions'>
          <CommandItem
            value='reset pane layout'
            onSelect={handleResetPaneLayout}
          >
            <RotateCcwIcon className='h-4 w-4' />
            <span>Reset pane layout</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

import { Button } from '@/components/ui/button';
import type { QueryCapture } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';

import { QueryInfoDialog } from './query-info-dialog';

interface QueryPaneProps {
  captures: QueryCapture[];
  error: string | undefined;
  onQueryChange: (query: string) => void;
  query: string;
}

interface QueryBarProps {
  captures: QueryCapture[];
  className?: string;
  error: string | undefined;
  onExpand?: () => void;
}

export const QueryBar = ({
  captures,
  className,
  error,
  onExpand,
}: QueryBarProps) => (
  <div
    className={cn(
      'bg-muted/40 flex min-h-9 items-center gap-1 border-b px-2 py-1',
      className
    )}
  >
    {onExpand ? (
      <Button
        variant='ghost'
        size='icon'
        onClick={onExpand}
        aria-label='Expand query pane'
        title='Expand query pane'
        className='h-7 w-7 cursor-pointer'
      >
        <ChevronUp className='h-4 w-4' />
      </Button>
    ) : null}

    <span className='font-mono text-sm'>Query</span>

    <QueryInfoDialog />

    <span className='text-muted-foreground ml-auto text-xs'>
      {error ? error : `${captures.length} captures`}
    </span>
  </div>
);

export const QueryPane = ({
  captures,
  error,
  onQueryChange,
  query,
}: QueryPaneProps) => (
  <div className='bg-background flex h-full min-h-0 flex-col overflow-hidden'>
    <QueryBar captures={captures} error={error} />

    <textarea
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      spellCheck={false}
      placeholder='(function_item name: (identifier) @name)'
      aria-label='Tree-sitter query'
      className='bg-background min-h-0 flex-1 resize-none border-0 p-2 font-mono text-sm outline-none'
    />
  </div>
);

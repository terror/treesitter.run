import { Button } from '@/components/ui/button';
import type { QueryCapture } from '@/lib/types';
import { cn } from '@/lib/utils';
import type { Extension } from '@codemirror/state';
import { ChevronUp } from 'lucide-react';

import { QueryEditor } from './query-editor';
import { QueryInfoDialog } from './query-info-dialog';

interface QueryPaneProps {
  captures: QueryCapture[];
  error: string | undefined;
  extensions: Extension[];
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
  extensions,
  onQueryChange,
  query,
}: QueryPaneProps) => (
  <div className='bg-background flex h-full min-h-0 flex-col overflow-hidden'>
    <QueryBar captures={captures} error={error} />

    <div className='min-h-0 flex-1 overflow-hidden'>
      <QueryEditor
        value={query}
        onChange={onQueryChange}
        extensions={extensions}
      />
    </div>
  </div>
);

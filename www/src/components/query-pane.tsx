import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { QueryCapture } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronUp, Info } from 'lucide-react';

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
      'flex min-h-9 items-center gap-2 border-b bg-gray-50 px-2 py-1',
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          aria-label='Query help'
          title='Query help'
          className='h-7 w-7 cursor-pointer'
        >
          <Info className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[560px]'>
        <div className='space-y-4 text-sm leading-6'>
          <div>
            <p className='text-muted-foreground'>
              Write S-expression patterns for the selected language. Captured
              nodes are highlighted in the syntax tree and source editor.
            </p>
          </div>

          <div className='grid gap-3'>
            <div>
              <div className='text-muted-foreground text-xs font-medium'>
                Node type
              </div>
              <pre className='mt-1 overflow-auto rounded border bg-gray-50 p-2 font-mono text-xs'>
                <code>{'(function_item) @function'}</code>
              </pre>
            </div>

            <div>
              <div className='text-muted-foreground text-xs font-medium'>
                Field
              </div>
              <pre className='mt-1 overflow-auto rounded border bg-gray-50 p-2 font-mono text-xs'>
                <code>{'(function_item name: (identifier) @name)'}</code>
              </pre>
            </div>

            <div>
              <div className='text-muted-foreground text-xs font-medium'>
                Predicate
              </div>
              <pre className='mt-1 overflow-auto rounded border bg-gray-50 p-2 font-mono text-xs'>
                <code>{'((identifier) @name (#match? @name "^[A-Z]"))'}</code>
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <span className='ml-auto text-xs text-gray-500'>
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
  <div className='flex h-full min-h-0 flex-col overflow-hidden bg-white'>
    <QueryBar captures={captures} error={error} />
    <textarea
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      spellCheck={false}
      placeholder='(function_item name: (identifier) @name)'
      aria-label='Tree-sitter query'
      className='min-h-0 flex-1 resize-none border-0 p-2 font-mono text-sm outline-none'
    />
  </div>
);

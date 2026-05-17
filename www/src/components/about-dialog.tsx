import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const AboutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          title='About'
          className='h-8 cursor-pointer px-2 font-bold hover:bg-transparent hover:text-inherit'
        >
          about
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[520px]'>
        <div className='text-muted-foreground space-y-4 text-sm leading-6'>
          <p>
            <span className='font-semibold'>treesitter.run</span> is a web
            playground for{' '}
            <a
              href='https://tree-sitter.github.io/tree-sitter/'
              className='cursor-pointer'
            >
              tree-sitter
            </a>
            , the incremental parsing system.
          </p>

          <p>
            The playground runs tree-sitter grammars in the browser. Pick a
            language, edit the source in the editor pane, and inspect the parsed
            syntax tree as it updates.
          </p>

          <div className='grid gap-2 pt-2'>
            <a
              href='https://github.com/terror/treesitter.space'
              className='text-foreground cursor-pointer font-medium underline-offset-4 hover:underline'
              target='_blank'
              rel='noreferrer'
            >
              View the project on GitHub
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

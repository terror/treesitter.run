import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { languageConfig } from '@/lib/language-config';
import { commitUrl, parserMetadata } from '@/lib/parser-metadata';
import type { Language } from '@/lib/types';
import { ExternalLink, Info } from 'lucide-react';

interface ParserMetadataDialogProps {
  language: Language;
}

const repositoryLabel = (repository: string) =>
  repository.replace('https://github.com/', '');

export const ParserMetadataDialog = ({
  language,
}: ParserMetadataDialogProps) => {
  const config = languageConfig[language];
  const metadata = parserMetadata[language];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          title='Information'
          className='h-7 w-7 cursor-pointer'
        >
          <Info className='h-4 w-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[520px]'>
        <div className='grid gap-1'>
          <div className='text-muted-foreground text-xs font-medium'>
            Asset
          </div>
          <div className='font-mono text-xs'>{config.wasmPath}</div>
        </div>

        {metadata.sourcePath && <div className='grid gap-1'>
          <div className='text-muted-foreground text-xs font-medium'>
          Path
          </div>
          <div className='font-mono text-xs'>
            {metadata.sourcePath}
          </div>
        </div>}

        <div className='grid gap-4 text-sm'>
          <div className='grid gap-1'>
            <div className='text-muted-foreground text-xs font-medium'>
              Repository
            </div>
            <a
              href={metadata.repository}
              target='_blank'
              rel='noreferrer'
              className='inline-flex min-w-0 items-center gap-1 underline-offset-4 hover:underline'
            >
              <span className='truncate'>
                {repositoryLabel(metadata.repository)}
              </span>
              <ExternalLink className='h-3 w-3' />
            </a>
          </div>

          <div className='grid gap-1'>
            <div className='text-muted-foreground text-xs font-medium'>
              Revision
            </div>
            <a
              href={commitUrl(metadata)}
              target='_blank'
              rel='noreferrer'
              className='font-mono text-xs break-all underline-offset-4 hover:underline'
            >
              {metadata.revision}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

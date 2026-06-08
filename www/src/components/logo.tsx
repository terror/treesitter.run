import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <svg
    aria-hidden='true'
    className={cn('shrink-0', className)}
    fill='none'
    viewBox='0 0 24 24'
  >
    <path
      className='fill-emerald-600 dark:fill-emerald-400'
      d='M12 1.5 6.55 10.35H9.6l-4.85 7.4h14.5l-4.85-7.4h3.05Z'
    />
    <path className='fill-current' d='M10.4 17.75h3.2V23h-3.2Z' />
  </svg>
);

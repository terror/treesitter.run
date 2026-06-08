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
      d='M12 2.5 7.2 10.15h2.7L5.65 16.8h12.7l-4.25-6.65h2.7Z'
    />
    <path className='fill-current' d='M10.55 16.8h2.9v4.2h-2.9Z' />
  </svg>
);

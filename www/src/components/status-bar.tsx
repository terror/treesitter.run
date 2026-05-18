import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface StatusBarProps {
  cursorPosition: { row: number; column: number };
  errorCount: number;
}

export const StatusBar = ({ cursorPosition, errorCount }: StatusBarProps) => {
  const status =
    errorCount > 0
      ? {
          label: `${errorCount.toLocaleString()} ${
            errorCount === 1 ? 'error' : 'errors'
          }`,
          icon: AlertTriangle,
          className: 'text-amber-700',
        }
      : {
          label: '',
          icon: CheckCircle2,
          className: 'text-emerald-700',
        };

  const StatusIcon = status.icon;

  return (
    <div className='flex min-h-7 items-center gap-x-3 overflow-x-auto border-t bg-gray-50 px-2 font-mono text-xs whitespace-nowrap text-gray-500'>
      <div
        className={`flex items-center gap-x-1.5 font-medium ${status.className}`}
      >
        <StatusIcon className='h-3.5 w-3.5' />
        {status.label ? <span>{status.label}</span> : null}
      </div>

      <span>
        {cursorPosition.row}:{cursorPosition.column}
      </span>
    </div>
  );
};

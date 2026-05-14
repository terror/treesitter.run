import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  type TreeNodeFilters,
  defaultTreeNodeFilters,
} from '@/lib/tree-filter';
import { cn } from '@/lib/utils';
import { Filter, RotateCcw } from 'lucide-react';
import { useId } from 'react';

interface TreeFilterDialogProps {
  activeFilterCount: number;
  filters: TreeNodeFilters;
  onFiltersChange: (filters: TreeNodeFilters) => void;
}

interface TreeFilterOption {
  description: string;
  key: keyof TreeNodeFilters;
  label: string;
  swatchClassName: string;
}

const treeFilterOptions: TreeFilterOption[] = [
  {
    key: 'anonymous',
    label: 'Anonymous',
    description: 'Punctuation, operators, and literals.',
    swatchClassName: 'bg-zinc-500',
  },
  {
    key: 'error',
    label: 'Error',
    description: 'Tree-sitter parse error placeholders.',
    swatchClassName: 'bg-red-500',
  },
  {
    key: 'extra',
    label: 'Extra',
    description: 'Whitespace, comments, and extras.',
    swatchClassName: 'bg-emerald-500',
  },
  {
    key: 'missing',
    label: 'Missing',
    description: 'Inserted for incomplete syntax.',
    swatchClassName: 'bg-amber-500',
  },
  {
    key: 'named',
    label: 'Named',
    description: 'Grammar rules with stable names.',
    swatchClassName: 'bg-sky-500',
  },
];

const filterCount = Object.keys(defaultTreeNodeFilters).length;

export const TreeFilterDialog = ({
  activeFilterCount,
  filters,
  onFiltersChange,
}: TreeFilterDialogProps) => {
  const id = useId();
  const enabledFilterCount = filterCount - activeFilterCount;

  const updateFilter = (key: keyof TreeNodeFilters, checked: boolean) => {
    onFiltersChange({
      ...filters,
      [key]: checked,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={activeFilterCount > 0 ? 'outline' : 'ghost'}
          size='icon'
          aria-label='Filter'
          title='Filter'
          className={cn(
            'relative h-7 w-7 cursor-pointer',
            activeFilterCount > 0 && 'bg-white'
          )}
        >
          <Filter className='h-4 w-4' />
          {activeFilterCount > 0 && (
            <span className='bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-medium'>
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className='gap-5 p-8 sm:max-w-[460px]'>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>

        <div className='grid gap-1'>
          {treeFilterOptions.map((option) => {
            const switchId = `${id}-${option.key}`;

            return (
              <div
                key={option.key}
                className='flex items-center justify-between gap-4 py-3'
              >
                <Label htmlFor={switchId} className='grid cursor-pointer gap-1'>
                  <span className='flex items-center gap-2'>
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full',
                        option.swatchClassName
                      )}
                    />
                    <span>{option.label}</span>
                  </span>
                  <span className='text-muted-foreground text-xs font-normal'>
                    {option.description}
                  </span>
                </Label>
                <Switch
                  id={switchId}
                  checked={filters[option.key]}
                  onCheckedChange={(checked) =>
                    updateFilter(option.key, checked)
                  }
                />
              </div>
            );
          })}
        </div>

        <DialogFooter className='items-center sm:justify-between'>
          <div className='text-muted-foreground text-xs'>
            {enabledFilterCount} of {filterCount} enabled
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onFiltersChange(defaultTreeNodeFilters)}
            disabled={activeFilterCount === 0}
          >
            <RotateCcw className='h-3.5 w-3.5' />
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

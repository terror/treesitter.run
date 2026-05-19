import { ParserMetadataDialog } from '@/components/parser-metadata-dialog';
import { TreeFilterDialog } from '@/components/tree-filter-dialog';
import type { TreeNodeFilters } from '@/lib/tree-filter';
import type { Language } from '@/lib/types';
import { Search } from 'lucide-react';

interface TreeToolbarProps {
  activeFilterCount: number;
  filters: TreeNodeFilters;
  language: Language;
  onFiltersChange: (filters: TreeNodeFilters) => void;
  onSearchChange: (search: string) => void;
  search: string;
}

export const TreeToolbar = ({
  activeFilterCount,
  filters,
  language,
  onFiltersChange,
  onSearchChange,
  search,
}: TreeToolbarProps) => (
  <div className='flex min-h-9 flex-wrap items-center gap-2 border-b bg-gray-50 px-2 py-1'>
    <div className='relative h-7 min-w-40 flex-1 sm:w-56 sm:flex-none'>
      <Search className='pointer-events-none absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500' />
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder='Search...'
        aria-label='Search node types'
        className='border-input h-7 w-full rounded-md border bg-white pr-2 pl-7 font-mono text-xs outline-none'
      />
    </div>
    <TreeFilterDialog
      filters={filters}
      activeFilterCount={activeFilterCount}
      onFiltersChange={onFiltersChange}
    />

    <div className='ml-auto shrink-0'>
      <ParserMetadataDialog language={language} />
    </div>
  </div>
);

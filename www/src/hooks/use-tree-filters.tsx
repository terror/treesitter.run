import { usePersistedState } from '@/hooks/use-persisted-state';
import {
  type TreeNodeFilters,
  defaultTreeNodeFilters,
} from '@/lib/tree-filter';
import { useMemo } from 'react';

const TREE_FILTER_STORAGE_KEY = 'treesitter.run:tree-filters';

const treeNodeFilterKeys = Object.keys(
  defaultTreeNodeFilters
) as (keyof TreeNodeFilters)[];

export function useTreeFilters() {
  const [filters, setFilters] = usePersistedState<TreeNodeFilters>(
    TREE_FILTER_STORAGE_KEY,
    defaultTreeNodeFilters
  );

  const activeFilterCount = useMemo(
    () =>
      treeNodeFilterKeys.filter(
        (key) => filters[key] !== defaultTreeNodeFilters[key]
      ).length,
    [filters]
  );

  return {
    activeFilterCount,
    filters,
    setFilters,
  };
}

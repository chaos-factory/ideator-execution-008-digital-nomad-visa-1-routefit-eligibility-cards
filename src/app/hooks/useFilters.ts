import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FilterState, WorkType } from '../types';

const DEFAULT_FILTERS: FilterState = {
  nationality: 'US',
  workType: 'employee' as WorkType,
  income: 5000,
  currency: 'USD',
  dependents: false,
  regions: [],
  minDuration: 0,
  dependentsOnly: false,
};

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFiltersState] = useState<FilterState>(() => {
    // Initialize from URL params if available
    const nationality = searchParams.get('nat') || DEFAULT_FILTERS.nationality;
    const workType = (searchParams.get('type') || DEFAULT_FILTERS.workType) as WorkType;
    const income = parseInt(searchParams.get('inc') || String(DEFAULT_FILTERS.income), 10);
    const currency = searchParams.get('cur') || DEFAULT_FILTERS.currency;
    const dependents = searchParams.get('dep') === '1';
    const regions = searchParams.get('regions')?.split(',').filter(Boolean) || [];
    const minDuration = parseInt(searchParams.get('minDur') || '0', 10);
    const dependentsOnly = searchParams.get('depOnly') === '1';

    return {
      nationality,
      workType,
      income,
      currency,
      dependents,
      regions,
      minDuration,
      dependentsOnly,
    };
  });

  const setFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFiltersState(updated);

    // Update URL params
    const params = new URLSearchParams();
    params.set('nat', updated.nationality);
    params.set('type', updated.workType);
    params.set('inc', String(updated.income));
    params.set('cur', updated.currency);
    if (updated.dependents) params.set('dep', '1');
    if (updated.regions.length > 0) params.set('regions', updated.regions.join(','));
    if (updated.minDuration > 0) params.set('minDur', String(updated.minDuration));
    if (updated.dependentsOnly) params.set('depOnly', '1');

    setSearchParams(params, { replace: true });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return { filters, setFilters, resetFilters };
}

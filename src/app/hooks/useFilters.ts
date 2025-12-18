import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FilterState } from '../types';

const DEFAULT_FILTERS: FilterState = {
  nationality: 'US',
  workType: 'employee',
  income: 4000,
  currency: 'USD',
  dependents: false,
  regions: [],
  minDuration: 0,
  dependentsOnly: false,
  sort: 'eligibility',
};

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFiltersState] = useState<FilterState>(() => {
    // Initialize from URL params if available
    return {
      nationality: searchParams.get('nat') || DEFAULT_FILTERS.nationality,
      workType: (searchParams.get('type') as FilterState['workType']) || DEFAULT_FILTERS.workType,
      income: Number(searchParams.get('inc')) || DEFAULT_FILTERS.income,
      currency: searchParams.get('cur') || DEFAULT_FILTERS.currency,
      dependents: searchParams.get('dep') === '1',
      regions: searchParams.get('regions')?.split(',').filter(Boolean) || DEFAULT_FILTERS.regions,
      minDuration: Number(searchParams.get('mindur')) || DEFAULT_FILTERS.minDuration,
      dependentsOnly: searchParams.get('deponly') === '1',
      sort: (searchParams.get('sort') as FilterState['sort']) || DEFAULT_FILTERS.sort,
    };
  });

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFiltersState(prev => {
      const newFilters = { ...prev, ...updates };
      
      // Update URL params
      const params = new URLSearchParams();
      params.set('nat', newFilters.nationality);
      params.set('type', newFilters.workType);
      params.set('inc', String(newFilters.income));
      params.set('cur', newFilters.currency);
      if (newFilters.dependents) params.set('dep', '1');
      if (newFilters.regions.length > 0) params.set('regions', newFilters.regions.join(','));
      if (newFilters.minDuration > 0) params.set('mindur', String(newFilters.minDuration));
      if (newFilters.dependentsOnly) params.set('deponly', '1');
      params.set('sort', newFilters.sort);
      
      setSearchParams(params);
      return newFilters;
    });
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setSearchParams({});
  }, [setSearchParams]);

  return { filters, updateFilters, resetFilters };
}

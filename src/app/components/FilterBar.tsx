import { useState } from 'react';
import type { FilterState } from '../types';
import countriesData from '../../../data/common/countries.json';

interface FilterBarProps {
  filters: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onApply: () => void;
  rateTimestamp: string | null;
}

export default function FilterBar({ filters, onUpdateFilters, onApply, rateTimestamp }: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  const regions = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania', 'Middle East'];

  const handlePersonaPreset = (preset: string) => {
    switch (preset) {
      case 'P1':
        onUpdateFilters({
          nationality: 'US',
          workType: 'employee',
          income: 5000,
          currency: 'USD',
          dependents: false,
        });
        break;
      case 'P2':
        onUpdateFilters({
          nationality: 'GB',
          workType: 'freelancer',
          income: 3500,
          currency: 'EUR',
          dependents: true,
        });
        break;
      case 'P3':
        onUpdateFilters({
          nationality: 'CA',
          workType: 'self_employed',
          income: 4000,
          currency: 'USD',
          dependents: false,
        });
        break;
    }
  };

  return (
    <div id="filters" className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Persona Presets */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Quick presets:</span>
          <button
            onClick={() => handlePersonaPreset('P1')}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            US Employee
          </button>
          <button
            onClick={() => handlePersonaPreset('P2')}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            UK Freelancer + Family
          </button>
          <button
            onClick={() => handlePersonaPreset('P3')}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            CA Self-employed
          </button>
        </div>

        {/* Main Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Nationality */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            <select
              id="nationality"
              value={filters.nationality}
              onChange={e => onUpdateFilters({ nationality: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {countriesData.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => onUpdateFilters({ workType: 'employee' })}
                className={`flex-1 px-3 py-2 text-sm ${
                  filters.workType === 'employee'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Employee
              </button>
              <button
                onClick={() => onUpdateFilters({ workType: 'freelancer' })}
                className={`flex-1 px-3 py-2 text-sm border-l ${
                  filters.workType === 'freelancer'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Freelancer
              </button>
              <button
                onClick={() => onUpdateFilters({ workType: 'self_employed' })}
                className={`flex-1 px-3 py-2 text-sm border-l ${
                  filters.workType === 'self_employed'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Self-emp
              </button>
            </div>
          </div>

          {/* Income */}
          <div>
            <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income
            </label>
            <input
              id="income"
              type="number"
              value={filters.income}
              onChange={e => onUpdateFilters({ income: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              id="currency"
              value={filters.currency}
              onChange={e => onUpdateFilters({ currency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {currencies.map(cur => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {/* Dependents Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dependents</label>
            <button
              onClick={() => onUpdateFilters({ dependents: !filters.dependents })}
              className={`w-full px-3 py-2 border rounded-md ${
                filters.dependents
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filters.dependents ? 'Yes' : 'No'}
            </button>
          </div>
        </div>

        {/* ECB Rate Info */}
        {rateTimestamp && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ECB rates as of {rateTimestamp}
            </span>
          </div>
        )}

        {/* Advanced Filters Toggle */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {showAdvanced ? '− Hide' : '+ Show'} advanced filters
          </button>
          <button
            onClick={onApply}
            className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Apply Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Regions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => {
                      const newRegions = filters.regions.includes(region)
                        ? filters.regions.filter(r => r !== region)
                        : [...filters.regions, region];
                      onUpdateFilters({ regions: newRegions });
                    }}
                    className={`px-3 py-1 text-sm rounded-full ${
                      filters.regions.includes(region)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Duration */}
            <div>
              <label htmlFor="minDuration" className="block text-sm font-medium text-gray-700 mb-2">
                Min Duration (months)
              </label>
              <input
                id="minDuration"
                type="number"
                value={filters.minDuration}
                onChange={e => onUpdateFilters({ minDuration: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Dependents Only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Show only</label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.dependentsOnly}
                  onChange={e => onUpdateFilters({ dependentsOnly: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Allows dependents</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

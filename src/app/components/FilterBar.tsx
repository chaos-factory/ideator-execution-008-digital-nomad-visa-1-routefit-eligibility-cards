import { useState } from 'react';
import type { FilterState, WorkType } from '../types';
import countriesData from '../../../data/common/countries.json';

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onApply: () => void;
}

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'NOK', 'SEK', 'DKK'];

export default function FilterBar({ filters, onFiltersChange, onApply }: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const regions = Array.from(new Set(countriesData.map(c => c.region))).sort();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Nationality */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            <select
              id="nationality"
              value={filters.nationality}
              onChange={(e) => onFiltersChange({ nationality: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {countriesData.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              {(['employee', 'freelancer', 'self_employed'] as WorkType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onFiltersChange({ workType: type })}
                  className={`flex-1 px-2 py-2 text-xs font-medium transition-colors ${
                    filters.workType === type
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={`Select ${type} work type`}
                >
                  {type === 'self_employed' ? 'Self-emp.' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Income */}
          <div>
            <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income
            </label>
            <input
              type="number"
              id="income"
              value={filters.income}
              onChange={(e) => onFiltersChange({ income: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
              step="100"
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
              onChange={(e) => onFiltersChange({ currency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {/* Dependents Toggle */}
          <div className="flex items-end">
            <label className="flex items-center cursor-pointer w-full">
              <input
                type="checkbox"
                checked={filters.dependents}
                onChange={(e) => onFiltersChange({ dependents: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">Include dependents</span>
            </label>
          </div>
        </div>

        {/* Advanced Filters Toggle & Apply Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {showAdvanced ? '− Hide' : '+ Show'} advanced filters
          </button>
          <button
            onClick={onApply}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>

        {/* Advanced Filters Drawer */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Region Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regions</label>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        const newRegions = filters.regions.includes(region)
                          ? filters.regions.filter((r) => r !== region)
                          : [...filters.regions, region];
                        onFiltersChange({ regions: newRegions });
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.regions.includes(region)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  type="number"
                  id="minDuration"
                  value={filters.minDuration}
                  onChange={(e) => onFiltersChange({ minDuration: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                />
              </div>

              {/* Dependents Only */}
              <div className="flex items-end">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.dependentsOnly}
                    onChange={(e) => onFiltersChange({ dependentsOnly: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Show only programs allowing dependents
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

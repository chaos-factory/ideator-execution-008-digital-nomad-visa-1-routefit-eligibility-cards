import type { FilterState } from '../types';
import { pluralize } from '../utils/format';

interface ResultsHeaderProps {
  count: number;
  totalCount: number;
  filters: FilterState;
  onSortChange: (sort: FilterState['sort']) => void;
  freeLimit: number;
}

export default function ResultsHeader({
  count,
  totalCount,
  filters,
  onSortChange,
  freeLimit,
}: ResultsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {count} {pluralize(count, 'program')} found
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing results for {filters.workType} from {filters.nationality}
              {count < totalCount && ` (${totalCount} total before filters)`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Free Tier Meter */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">{Math.min(count, freeLimit)}</span> / {freeLimit} free
            </div>

            {/* Sort Dropdown */}
            <div>
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={e => onSortChange(e.target.value as FilterState['sort'])}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="eligibility">Sort: Eligibility</option>
                <option value="income">Sort: Income</option>
                <option value="duration">Sort: Duration</option>
                <option value="updated">Sort: Recently updated</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

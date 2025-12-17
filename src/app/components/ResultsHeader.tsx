import { formatDate } from '../utils/format';

interface ResultsHeaderProps {
  count: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  ecbTimestamp: number | null;
  unlockedCount: number;
  freeLimit: number;
}

export default function ResultsHeader({
  count,
  sortBy,
  onSortChange,
  ecbTimestamp,
  unlockedCount,
  freeLimit,
}: ResultsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {count} {count === 1 ? 'Program' : 'Programs'} Found
            </h2>
            {ecbTimestamp && (
              <p className="text-sm text-gray-500 mt-1">
                ECB rates as of {formatDate(new Date(ecbTimestamp).toISOString().split('T')[0])}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Free tier:</span>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                {unlockedCount}/{freeLimit} unlocked
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="eligibility">Eligibility</option>
                <option value="income">Income</option>
                <option value="duration">Duration</option>
                <option value="updated">Recently updated</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

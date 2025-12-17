import type { ProgramWithEligibility, Country } from '../types';
import {
  getStatusBadgeColor,
  getStatusLabel,
  getConfidenceColor,
  getConfidenceLabel,
} from '../utils/eligibility';
import { formatCurrency, formatDate } from '../utils/currency';
import { formatDuration } from '../utils/format';

interface ProgramCardProps {
  program: ProgramWithEligibility;
  country: Country | undefined;
  isShortlisted: boolean;
  onToggleShortlist: () => void;
  onOpenDetails: () => void;
  isLocked: boolean;
  cardRef?: (el: HTMLElement | null) => void;
}

export default function ProgramCard({
  program,
  country,
  isShortlisted,
  onToggleShortlist,
  onOpenDetails,
  isLocked,
  cardRef,
}: ProgramCardProps) {
  const statusColor = getStatusBadgeColor(program.eligibility.status);
  const statusLabel = getStatusLabel(program.eligibility.status);
  const confidenceColor = getConfidenceColor(program.confidence);
  const confidenceLabel = getConfidenceLabel(program.confidence);

  return (
    <div
      ref={cardRef}
      data-program-id={program.program_id}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 relative"
    >
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700">Upgrade to unlock</p>
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}
          role="status"
          aria-label={`Status: ${statusLabel}`}
        >
          {statusLabel}
        </span>
        <button
          onClick={onToggleShortlist}
          className="text-gray-400 hover:text-primary-600"
          aria-label={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          <svg
            className="w-6 h-6"
            fill={isShortlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      {/* Country and Program Name */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{country?.name || program.country_code}</h3>
        <p className="text-sm text-gray-600">{program.name}</p>
      </div>

      {/* Chips */}
      <div className="space-y-2 mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
            Income: {formatCurrency(program.income_requirement.amount, program.income_requirement.currency)}/
            {program.income_requirement.basis === 'monthly' ? 'mo' : 'yr'}
          </span>
          {program.insurance_min && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
              Insurance: {formatCurrency(program.insurance_min.amount, program.insurance_min.currency)}
            </span>
          )}
          {program.dependents_allowed && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-700">
              Dependents OK
            </span>
          )}
          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
            {formatDuration(program.duration_months)}
            {program.renewable && ' (renewable)'}
          </span>
          {program.local_work_cap_percent !== null && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
              Local work: {program.local_work_cap_percent}%
            </span>
          )}
        </div>
      </div>

      {/* As-of Date and Confidence */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>As of {formatDate(program.as_of)}</span>
        <span className={`inline-flex items-center px-2 py-1 rounded ${confidenceColor}`}>
          {confidenceLabel}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onOpenDetails}
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Details
        </button>
        <a
          href={program.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-white text-primary-600 border border-primary-600 rounded-md text-sm font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-center"
        >
          Official
        </a>
      </div>
    </div>
  );
}

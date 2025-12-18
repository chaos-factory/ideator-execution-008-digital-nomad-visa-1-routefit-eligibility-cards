import type { ProgramWithEligibility } from '../types';
import { getStatusLabel, getConfidenceLabel } from '../utils/eligibility';
import { formatCurrency, formatDate } from '../utils/currency';
import { formatDuration, formatWorkTypes } from '../utils/format';

interface DetailsModalProps {
  program: ProgramWithEligibility | null;
  onClose: () => void;
}

export default function DetailsModal({ program, onClose }: DetailsModalProps) {
  if (!program) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{program.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Eligibility Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Status</h3>
            <p className="text-2xl font-bold text-primary-600 mb-2">
              {getStatusLabel(program.eligibility.status)}
            </p>
            {program.eligibility.reasons.length > 0 && (
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {program.eligibility.reasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-medium text-gray-700">Work Types:</dt>
                <dd className="text-gray-600">{formatWorkTypes(program.work_types)}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-700">Income Requirement:</dt>
                <dd className="text-gray-600">
                  {formatCurrency(program.income_requirement.amount, program.income_requirement.currency)} per{' '}
                  {program.income_requirement.basis === 'monthly' ? 'month' : 'year'}
                </dd>
              </div>
              {program.insurance_min && (
                <div>
                  <dt className="font-medium text-gray-700">Insurance Minimum:</dt>
                  <dd className="text-gray-600">
                    {formatCurrency(program.insurance_min.amount, program.insurance_min.currency)} coverage
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-medium text-gray-700">Duration:</dt>
                <dd className="text-gray-600">
                  {formatDuration(program.duration_months)}
                  {program.renewable && ' (renewable)'}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-700">Dependents:</dt>
                <dd className="text-gray-600">{program.dependents_allowed ? 'Allowed' : 'Not allowed'}</dd>
              </div>
              {program.local_work_cap_percent !== null && (
                <div>
                  <dt className="font-medium text-gray-700">Local Work Cap:</dt>
                  <dd className="text-gray-600">{program.local_work_cap_percent}% of income from local clients</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Application */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Application</h3>
            <p className="text-sm text-gray-600 mb-3">{program.application_channel}</p>
            <a
              href={program.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
            >
              Visit Official Page
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* Notes */}
          {program.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Notes</h3>
              <p className="text-sm text-gray-600">{program.notes}</p>
            </div>
          )}

          {/* Nationality Rules */}
          {program.nationality_rules.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nationality Rules</h3>
              <p className="text-sm text-gray-600">{program.nationality_rules.notes}</p>
              {program.nationality_rules.excluded_nationalities.length > 0 && (
                <p className="text-sm text-red-600 mt-2">
                  Excludes: {program.nationality_rules.excluded_nationalities.join(', ')}
                </p>
              )}
            </div>
          )}

          {/* Data Quality */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Quality</h3>
            <dl className="space-y-1 text-xs text-gray-600">
              <div>
                <dt className="inline font-medium">Last updated: </dt>
                <dd className="inline">{formatDate(program.as_of)}</dd>
              </div>
              <div>
                <dt className="inline font-medium">Confidence: </dt>
                <dd className="inline">{getConfidenceLabel(program.confidence)}</dd>
              </div>
            </dl>
            <p className="text-xs text-gray-500 mt-2">
              Found outdated info?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Report update
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

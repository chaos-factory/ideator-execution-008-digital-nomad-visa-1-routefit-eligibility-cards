import { useEffect } from 'react';
import type { EligibilityResult } from '../types';
import { getStatusLabel, getConfidenceLabel } from '../utils/eligibility';
import { formatCurrency, formatDate, formatDuration, formatWorkType } from '../utils/format';
import countriesData from '../../../data/common/countries.json';

interface DetailsModalProps {
  result: EligibilityResult | null;
  onClose: () => void;
}

export default function DetailsModal({ result, onClose }: DetailsModalProps) {
  useEffect(() => {
    if (result) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [result]);

  if (!result) return null;

  const { program, status, reasons } = result;
  const country = countriesData.find((c) => c.code === program.country_code);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{program.name}</h2>
            <p className="text-gray-600 mt-1">{country?.name || program.country_code}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Status */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Your Eligibility Status</h3>
            <span className={`status-badge ${status.replace('_', '-')}`}>{getStatusLabel(status)}</span>
            <div className="mt-3 space-y-1">
              {reasons.map((reason, idx) => (
                <p key={idx} className="text-sm text-gray-600">
                  • {reason}
                </p>
              ))}
            </div>
          </div>

          {/* Key Requirements */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Requirements</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Income requirement:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatCurrency(program.income_requirement.amount, program.income_requirement.currency)} /{' '}
                  {program.income_requirement.basis}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Accepted work types:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {program.work_types.map(formatWorkType).join(', ')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Duration:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatDuration(program.duration_months)}
                  {program.renewable && ' (renewable)'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Dependents:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {program.dependents_allowed ? 'Allowed' : 'Not allowed'}
                </dd>
              </div>
              {program.insurance_min && (
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Insurance minimum:</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatCurrency(program.insurance_min.amount, program.insurance_min.currency)}
                  </dd>
                </div>
              )}
              {program.local_work_cap_percent !== null && (
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Local work cap:</dt>
                  <dd className="text-sm font-medium text-gray-900">{program.local_work_cap_percent}% max</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Application Details */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Application</h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>How to apply:</strong> {program.application_channel}
            </p>
            <a
              href={program.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Official source →
            </a>
          </div>

          {/* Notes */}
          {program.notes && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Additional Notes</h3>
              <p className="text-sm text-gray-600">{program.notes}</p>
            </div>
          )}

          {/* Nationality Rules */}
          {program.nationality_rules.excluded_nationalities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Nationality Restrictions</h3>
              <p className="text-sm text-gray-600">
                Excluded: {program.nationality_rules.excluded_nationalities.join(', ')}
              </p>
            </div>
          )}

          {/* Data Quality */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Data Quality</h3>
            <dl className="space-y-2">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-600">Last verified:</dt>
                <dd className="font-medium text-gray-900">{formatDate(program.as_of)}</dd>
              </div>
              {program.confidence && (
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Confidence:</dt>
                  <dd className="font-medium text-gray-900">{getConfidenceLabel(program.confidence)}</dd>
                </div>
              )}
            </dl>
            <p className="text-xs text-gray-500 mt-3">
              Always verify current requirements with official sources before applying.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
          <a
            href={program.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors text-center"
          >
            Visit Official Page
          </a>
          <button
            onClick={onClose}
            className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import type { EligibilityResult } from '../types';
import { getStatusLabel, getStatusAriaLabel, getConfidenceLabel } from '../utils/eligibility';
import { formatCurrency, formatDate, formatDuration } from '../utils/format';
import countriesData from '../../../data/common/countries.json';

interface ProgramCardProps {
  result: EligibilityResult;
  isBlurred: boolean;
  isInShortlist: boolean;
  onToggleShortlist: () => void;
  onDetails: () => void;
  onCardView?: () => void;
}

export default function ProgramCard({
  result,
  isBlurred,
  isInShortlist,
  onToggleShortlist,
  onDetails,
  onCardView,
}: ProgramCardProps) {
  const { program, status, reasons } = result;
  const country = countriesData.find((c) => c.code === program.country_code);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  useEffect(() => {
    if (!onCardView || hasBeenViewed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setHasBeenViewed(true);
            onCardView();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [onCardView, hasBeenViewed]);

  return (
    <div
      ref={cardRef}
      className={`bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow ${
        isBlurred ? 'blur-paywall' : ''
      }`}
    >
      {/* Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`status-badge ${status.replace('_', '-')}`}
          aria-label={getStatusAriaLabel(status, program.name)}
        >
          {getStatusLabel(status)}
        </span>
        <button
          onClick={onToggleShortlist}
          className="text-gray-400 hover:text-primary-600 transition-colors"
          aria-label={isInShortlist ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          <svg
            className="w-6 h-6"
            fill={isInShortlist ? 'currentColor' : 'none'}
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

      {/* Country & Program Name */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl" role="img" aria-label={`Flag of ${country?.name || program.country_code}`}>
            {country ? `${country.name.slice(0, 2).toUpperCase()}` : program.country_code}
          </span>
          <h3 className="text-lg font-semibold text-gray-900">{country?.name || program.country_code}</h3>
        </div>
        <p className="text-sm text-gray-700 font-medium">{program.name}</p>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="chip">
          {formatCurrency(
            program.income_requirement.basis === 'monthly'
              ? program.income_requirement.amount
              : program.income_requirement.amount / 12,
            program.income_requirement.currency
          )}
          /mo
        </span>
        {program.insurance_min && (
          <span className="chip">
            Insurance: {formatCurrency(program.insurance_min.amount, program.insurance_min.currency)}
          </span>
        )}
        <span className="chip">
          {program.dependents_allowed ? '✓ Dependents' : '✗ No dependents'}
        </span>
        <span className="chip">
          {formatDuration(program.duration_months)}
          {program.renewable ? ' (renewable)' : ''}
        </span>
        {program.local_work_cap_percent !== null && (
          <span className="chip">Max {program.local_work_cap_percent}% local work</span>
        )}
      </div>

      {/* As-of Date & Confidence */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>As of {formatDate(program.as_of)}</span>
        {program.confidence && (
          <span className="px-2 py-0.5 bg-gray-100 rounded">{getConfidenceLabel(program.confidence)}</span>
        )}
      </div>

      {/* Reasons */}
      {reasons.length > 0 && (
        <div className="text-sm text-gray-600 mb-4">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-1">
              <span>•</span>
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onDetails}
          className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          Details
        </button>
        <a
          href={program.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
        >
          Official
        </a>
      </div>
    </div>
  );
}

import { useState, useMemo, useCallback } from 'react';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import ResultsHeader from '../components/ResultsHeader';
import CardGrid from '../components/CardGrid';
import DetailsModal from '../components/DetailsModal';
import ExportBar from '../components/ExportBar';
import PaywallModal from '../components/PaywallModal';
import TrustStrip from '../components/TrustStrip';
import { useFilters } from '../hooks/useFilters';
import { useECBRate } from '../hooks/useECBRate';
import { useShortlist } from '../hooks/useShortlist';
import { useAnalytics } from '../hooks/useAnalytics';
import { calculateEligibility } from '../utils/eligibility';
import { convertCurrency, getCachedRateTimestamp } from '../utils/currency';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';
import type { Program, ProgramWithEligibility, Country } from '../types';
import programsData from '../../../data/routefit/programs.json';
import countriesData from '../../../data/common/countries.json';

const FREE_LIMIT = 5;

export default function Home() {
  const { filters, updateFilters } = useFilters();
  const { rates, loading: ratesLoading } = useECBRate();
  const { shortlist, toggleShortlist, clearShortlist, isShortlisted, count: shortlistCount } = useShortlist();
  const { observeCard, trackEvent: track } = useAnalytics();
  const [selectedProgram, setSelectedProgram] = useState<ProgramWithEligibility | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const programs = programsData as Program[];
  const countries = countriesData as Country[];
  const rateTimestamp = getCachedRateTimestamp();

  // Filter and calculate eligibility
  const filteredPrograms = useMemo(() => {
    if (!rates) return [];

    let filtered = programs.filter(program => {
      // Region filter
      if (filters.regions.length > 0) {
        const country = countries.find(c => c.code === program.country_code);
        if (!country || !filters.regions.includes(country.region)) {
          return false;
        }
      }

      // Min duration filter
      if (filters.minDuration > 0 && program.duration_months < filters.minDuration) {
        return false;
      }

      // Dependents only filter
      if (filters.dependentsOnly && !program.dependents_allowed) {
        return false;
      }

      return true;
    });

    // Calculate eligibility for each program
    const withEligibility: ProgramWithEligibility[] = filtered.map(program => {
      const convertedIncome = convertCurrency(
        filters.income,
        filters.currency,
        program.income_requirement.currency,
        rates
      );

      const eligibility = calculateEligibility(program, filters, convertedIncome);

      return {
        ...program,
        eligibility,
        convertedIncome,
      };
    });

    // Sort programs
    withEligibility.sort((a, b) => {
      switch (filters.sort) {
        case 'eligibility': {
          const statusOrder = { pass: 0, likely: 1, check_nuance: 2, not_eligible: 3 };
          return statusOrder[a.eligibility.status] - statusOrder[b.eligibility.status];
        }
        case 'income': {
          const aIncome = a.income_requirement.basis === 'annual'
            ? a.income_requirement.amount / 12
            : a.income_requirement.amount;
          const bIncome = b.income_requirement.basis === 'annual'
            ? b.income_requirement.amount / 12
            : b.income_requirement.amount;
          return aIncome - bIncome;
        }
        case 'duration':
          return b.duration_months - a.duration_months;
        case 'updated':
          return new Date(b.as_of).getTime() - new Date(a.as_of).getTime();
        default:
          return 0;
      }
    });

    return withEligibility;
  }, [programs, countries, filters, rates]);

  const handleApplyFilters = useCallback(() => {
    trackEvent(AnalyticsEvents.FILTER_APPLY, {
      nationality: filters.nationality,
      workType: filters.workType,
      income: filters.income,
      currency: filters.currency,
      dependents: filters.dependents,
    });
  }, [filters]);

  const handleOpenDetails = useCallback((program: ProgramWithEligibility) => {
    setSelectedProgram(program);
    trackEvent(AnalyticsEvents.DETAILS_OPEN, { programId: program.program_id });
  }, []);

  const handleExportPDF = useCallback(() => {
    trackEvent(AnalyticsEvents.EXPORT_PDF, { count: shortlistCount });
    alert('PDF export would happen here');
  }, [shortlistCount]);

  const handleExportCSV = useCallback(() => {
    trackEvent(AnalyticsEvents.EXPORT_CSV, { count: shortlistCount });
    const shortlistedPrograms = filteredPrograms.filter(p => shortlist.includes(p.program_id));
    
    const csvHeader = 'Country,Program,Status,Income,Duration,URL\n';
    const csvRows = shortlistedPrograms.map(p => 
      `"${p.country_code}","${p.name}","${p.eligibility.status}","${p.income_requirement.amount} ${p.income_requirement.currency}","${p.duration_months} months","${p.official_url}"`
    ).join('\n');
    
    const csv = csvHeader + csvRows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'routefit-shortlist.csv';
    a.click();
  }, [shortlistCount, filteredPrograms, shortlist]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <FilterBar
        filters={filters}
        onUpdateFilters={updateFilters}
        onApply={handleApplyFilters}
        rateTimestamp={rateTimestamp}
      />

      {ratesLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600">Loading exchange rates...</p>
        </div>
      ) : (
        <>
          <ResultsHeader
            count={filteredPrograms.length}
            totalCount={programs.length}
            filters={filters}
            onSortChange={sort => updateFilters({ sort })}
            freeLimit={FREE_LIMIT}
          />

          <CardGrid
            programs={filteredPrograms}
            countries={countries}
            shortlistedIds={shortlist}
            onToggleShortlist={toggleShortlist}
            onOpenDetails={handleOpenDetails}
            freeLimit={FREE_LIMIT}
            observeCard={observeCard}
          />
        </>
      )}

      <TrustStrip />

      {/* FAQ and Editorial Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Determine Eligibility</h2>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>
              RouteFit calculates eligibility by matching your profile against official program requirements.
              We consider work type compatibility, nationality restrictions, income thresholds (with currency conversion),
              and dependent allowances.
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Pass:</strong> All requirements appear to be met</li>
              <li><strong>Likely:</strong> Requirements likely met, within 10% of income threshold or minor nuances</li>
              <li><strong>Check nuance:</strong> Additional conditions apply (e.g., local work restrictions)</li>
              <li><strong>Not eligible:</strong> One or more key requirements not met</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How accurate is the eligibility information?</h3>
              <p className="text-sm text-gray-600">
                We source all data from official government websites and update regularly. However, requirements
                can change. Always verify with official sources before making decisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What does the confidence label mean?</h3>
              <p className="text-sm text-gray-600">
                Official law: Based on legislation; Official guidance: From government documentation;
                Reported practice: Based on community experiences and reports.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How often is data updated?</h3>
              <p className="text-sm text-gray-600">
                We verify programs monthly and update when requirements change. Each program shows its last update date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Overlays */}
      <DetailsModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
      />

      <ExportBar
        count={shortlistCount}
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onClear={clearShortlist}
      />
    </div>
  );
}

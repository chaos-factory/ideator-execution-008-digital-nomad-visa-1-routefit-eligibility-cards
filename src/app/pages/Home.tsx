import { useState, useMemo, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsentBanner from '../components/ConsentBanner';
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
import { useAnalytics } from '../hooks/useAnalytics';
import { useShortlist } from '../hooks/useShortlist';
import { calculateEligibility } from '../utils/eligibility';
import type { Program, EligibilityResult, WorkType } from '../types';
import programsData from '../../../data/routefit/programs.json';
import countriesData from '../../../data/common/countries.json';

const FREE_LIMIT = 5;

export default function Home() {
  const { filters, setFilters } = useFilters();
  const { rates, timestamp } = useECBRate();
  const { needsConsent, giveConsent, trackEvent } = useAnalytics();
  const { shortlist, toggleShortlist, clearShortlist } = useShortlist();

  const [selectedResult, setSelectedResult] = useState<EligibilityResult | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [sortBy, setSortBy] = useState('eligibility');
  const filtersRef = useRef<HTMLDivElement>(null);

  // Persona presets
  const presets = {
    p1: { nationality: 'US', workType: 'employee' as WorkType, income: 5000, currency: 'USD', dependents: false },
    p2: { nationality: 'GB', workType: 'freelancer' as WorkType, income: 3500, currency: 'GBP', dependents: true },
    p3: { nationality: 'CA', workType: 'self_employed' as WorkType, income: 4500, currency: 'CAD', dependents: false },
  };

  // Calculate eligibility for all programs
  const results = useMemo(() => {
    const programs = programsData as Program[];
    
    return programs
      .map((program) => calculateEligibility(program, filters, rates))
      .filter((result) => {
        // Apply advanced filters
        if (filters.regions.length > 0) {
          const country = countriesData.find((c) => c.code === result.program.country_code);
          if (!country || !filters.regions.includes(country.region)) {
            return false;
          }
        }
        if (filters.minDuration > 0 && result.program.duration_months < filters.minDuration) {
          return false;
        }
        if (filters.dependentsOnly && !result.program.dependents_allowed) {
          return false;
        }
        return true;
      });
  }, [filters, rates]);

  // Sort results
  const sortedResults = useMemo(() => {
    const sorted = [...results];
    const statusOrder = { pass: 0, likely: 1, check_nuance: 2, not_eligible: 3 };
    
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'eligibility':
          return statusOrder[a.status] - statusOrder[b.status];
        case 'income':
          return a.program.income_requirement.amount - b.program.income_requirement.amount;
        case 'duration':
          return b.program.duration_months - a.program.duration_months;
        case 'updated':
          return new Date(b.program.as_of).getTime() - new Date(a.program.as_of).getTime();
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [results, sortBy]);

  const handleApplyFilters = () => {
    trackEvent('filter_apply', { filters });
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardView = (programId: string) => {
    trackEvent('card_view', { programId });
  };

  const handleDetails = (result: EligibilityResult) => {
    setSelectedResult(result);
    trackEvent('details_open', { programId: result.program.program_id });
  };

  const handleExportPDF = () => {
    trackEvent('export_pdf', { count: shortlist.length });
    alert('PDF export coming soon!');
  };

  const handleExportCSV = () => {
    trackEvent('export_csv', { count: shortlist.length });
    
    // Simple CSV export
    const shortlistedResults = sortedResults.filter((r) => shortlist.includes(r.program.program_id));
    const csv = [
      ['Program', 'Country', 'Status', 'Income', 'Duration', 'Renewable', 'Dependents', 'Official URL'].join(','),
      ...shortlistedResults.map((r) =>
        [
          `"${r.program.name}"`,
          r.program.country_code,
          r.status,
          r.program.income_requirement.amount,
          r.program.duration_months,
          r.program.renewable,
          r.program.dependents_allowed,
          r.program.official_url,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'routefit-shortlist.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpgrade = (plan: 'region' | 'all-access') => {
    trackEvent('upgrade_started', { plan });
    alert(`Upgrade to ${plan} coming soon!`);
    setShowPaywall(false);
  };

  const handleQuickCheck = () => {
    filtersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const unlockedCount = Math.min(sortedResults.length, FREE_LIMIT);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Hero onQuickCheck={handleQuickCheck} />

        {/* Persona Presets */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Try a quick preset:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setFilters(presets.p1)}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                P1: US Employee $5k/mo
              </button>
              <button
                onClick={() => setFilters(presets.p2)}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                P2: UK Freelancer £3.5k/mo + deps
              </button>
              <button
                onClick={() => setFilters(presets.p3)}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                P3: CA Self-employed $4.5k/mo
              </button>
            </div>
          </div>
        </div>

        <div ref={filtersRef}>
          <FilterBar filters={filters} onFiltersChange={setFilters} onApply={handleApplyFilters} />
        </div>

        <div id="results">
          <ResultsHeader
            count={sortedResults.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            ecbTimestamp={timestamp}
            unlockedCount={unlockedCount}
            freeLimit={FREE_LIMIT}
          />
          <CardGrid
            results={sortedResults}
            freeLimit={FREE_LIMIT}
            shortlist={shortlist}
            onToggleShortlist={toggleShortlist}
            onDetails={handleDetails}
            onCardView={handleCardView}
          />
        </div>

        <TrustStrip />

        {/* FAQ Section */}
        <div className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do you determine eligibility?
                </h3>
                <p className="text-gray-600">
                  We analyze official requirements including work type, nationality, income, and dependent
                  rules. Status badges reflect whether you meet documented criteria based on your inputs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What do the status badges mean?
                </h3>
                <p className="text-gray-600">
                  <strong>Pass:</strong> You meet all documented requirements.{' '}
                  <strong>Likely:</strong> You likely qualify with possible nuances.{' '}
                  <strong>Check nuance:</strong> Review details carefully.{' '}
                  <strong>Not eligible:</strong> You don't meet core requirements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How often is data updated?
                </h3>
                <p className="text-gray-600">
                  We verify programs monthly and show the "as of" date on each card. Always check official
                  sources before applying.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Ribbon */}
        <div className="bg-primary-600 py-12">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to unlock all programs?
            </h2>
            <p className="text-primary-100 text-lg mb-6">
              Get unlimited access to all 20+ programs with detailed comparisons and export tools.
            </p>
            <button
              onClick={() => {
                setShowPaywall(true);
                trackEvent('upgrade_viewed', {});
              }}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Upgrade Now - $19 for 90 days
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {needsConsent && (
        <ConsentBanner
          onAccept={() => giveConsent(true)}
          onDecline={() => giveConsent(false)}
        />
      )}

      <DetailsModal result={selectedResult} onClose={() => setSelectedResult(null)} />

      {showPaywall && (
        <PaywallModal onClose={() => setShowPaywall(false)} onUpgrade={handleUpgrade} />
      )}

      <ExportBar
        count={shortlist.length}
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onClear={clearShortlist}
      />
    </div>
  );
}

import ProgramCard from './ProgramCard';
import type { ProgramWithEligibility, Country } from '../types';

interface CardGridProps {
  programs: ProgramWithEligibility[];
  countries: Country[];
  shortlistedIds: string[];
  onToggleShortlist: (programId: string) => void;
  onOpenDetails: (program: ProgramWithEligibility) => void;
  freeLimit: number;
  observeCard: (el: HTMLElement | null) => void;
}

export default function CardGrid({
  programs,
  countries,
  shortlistedIds,
  onToggleShortlist,
  onOpenDetails,
  freeLimit,
  observeCard,
}: CardGridProps) {
  const countriesMap = new Map(countries.map(c => [c.code, c]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <ProgramCard
            key={program.program_id}
            program={program}
            country={countriesMap.get(program.country_code)}
            isShortlisted={shortlistedIds.includes(program.program_id)}
            onToggleShortlist={() => onToggleShortlist(program.program_id)}
            onOpenDetails={() => onOpenDetails(program)}
            isLocked={index >= freeLimit}
            cardRef={observeCard}
          />
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No programs match your criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}

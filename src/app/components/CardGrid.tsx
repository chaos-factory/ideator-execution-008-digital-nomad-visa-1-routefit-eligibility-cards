import type { EligibilityResult } from '../types';
import ProgramCard from './ProgramCard';

interface CardGridProps {
  results: EligibilityResult[];
  freeLimit: number;
  shortlist: string[];
  onToggleShortlist: (programId: string) => void;
  onDetails: (result: EligibilityResult) => void;
  onCardView?: (programId: string) => void;
}

export default function CardGrid({
  results,
  freeLimit,
  shortlist,
  onToggleShortlist,
  onDetails,
  onCardView,
}: CardGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <ProgramCard
            key={result.program.program_id}
            result={result}
            isBlurred={index >= freeLimit}
            isInShortlist={shortlist.includes(result.program.program_id)}
            onToggleShortlist={() => onToggleShortlist(result.program.program_id)}
            onDetails={() => onDetails(result)}
            onCardView={onCardView ? () => onCardView(result.program.program_id) : undefined}
          />
        ))}
      </div>
      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No programs match your criteria. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

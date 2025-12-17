interface HeroProps {
  onQuickCheck: () => void;
}

export default function Hero({ onQuickCheck }: HeroProps) {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Find Your Perfect Digital Nomad Visa
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Fast eligibility snapshots for 20+ remote work and digital nomad programs.
          Filter by nationality, work type, income, and dependents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onQuickCheck}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Start with quick check
          </button>
          <button
            onClick={() => {
              document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-primary-600 hover:bg-primary-50 transition-colors"
          >
            See example results
          </button>
        </div>
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">20+</div>
              <div className="text-sm text-gray-600">Programs covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">Monthly</div>
              <div className="text-sm text-gray-600">Verification</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

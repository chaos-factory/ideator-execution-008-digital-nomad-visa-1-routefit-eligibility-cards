export default function Hero() {
  const scrollToFilters = () => {
    document.getElementById('filters')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Find Your Perfect Digital Nomad Visa
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Fast eligibility snapshots for 20+ digital nomad and remote work programs worldwide.
          Filter by nationality, work type, income, and family needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToFilters}
            className="bg-primary-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Start with quick check
          </button>
          <button
            onClick={scrollToFilters}
            className="bg-white text-primary-600 px-8 py-3 rounded-md text-lg font-medium border-2 border-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            See example results
          </button>
        </div>
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto" role="img" aria-label="">
          <div className="grid grid-cols-3 gap-4 opacity-20">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

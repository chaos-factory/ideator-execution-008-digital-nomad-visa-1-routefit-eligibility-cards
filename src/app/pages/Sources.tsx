import Header from '../components/Header';
import Footer from '../components/Footer';
import programsData from '../../../data/routefit/programs.json';

export default function Sources() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Sources & Verification</h1>
          
          <div className="prose prose-lg mb-8">
            <p className="text-gray-600 mb-4">
              All program data is sourced from official government websites, published legislation, and
              verified guidance. Below is the complete list of programs we track with their official sources.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Verification Process</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Monthly verification of all program requirements</li>
              <li>Automated link checking (CI pipeline)</li>
              <li>Community reporting for policy changes</li>
              <li>Clear confidence labels (official law, guidance, or practice)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Sources</h2>
          <div className="space-y-4">
            {programsData.map((program) => (
              <div key={program.program_id} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{program.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{program.country_code}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <a
                    href={program.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Official Source →
                  </a>
                  <span className="text-sm text-gray-500">
                    Verified: {program.as_of}
                  </span>
                  {program.confidence && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {program.confidence.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Found an error or update?</h3>
            <p className="text-blue-800 text-sm mb-3">
              Help us keep this data accurate by reporting changes or corrections.
            </p>
            <a
              href="mailto:hello@routefit.com?subject=Source Update"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Report Update
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

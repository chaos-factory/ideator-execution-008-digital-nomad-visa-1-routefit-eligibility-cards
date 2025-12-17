import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About RouteFit</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              RouteFit helps digital nomads and remote workers find the right visa or residence permit
              program by providing fast, accurate eligibility snapshots based on official sources.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We believe remote work should be accessible to everyone. By aggregating and organizing
              official visa requirements, we make it easier to understand your options and make informed
              decisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
              <li>Enter your nationality, work type, income, and other criteria</li>
              <li>We match you with programs based on official requirements</li>
              <li>Review eligibility status, requirements, and nuances</li>
              <li>Shortlist programs and export for comparison</li>
              <li>Apply directly through official channels</li>
            </ol>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Quality</h2>
            <p className="text-gray-600 mb-4">
              All program data comes from official government sources, legislation, and verified guidance.
              We update programs monthly and clearly mark confidence levels (official law, official guidance,
              or post practice).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              RouteFit provides information for research purposes only. We are not immigration lawyers or
              advisors. Always verify requirements with official sources and consider consulting an immigration
              professional before making decisions. We are not liable for visa denials or immigration outcomes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
            <p className="text-gray-600">
              Have questions or found an error? Contact us at{' '}
              <a href="mailto:hello@routefit.com" className="text-primary-600 hover:text-primary-700">
                hello@routefit.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

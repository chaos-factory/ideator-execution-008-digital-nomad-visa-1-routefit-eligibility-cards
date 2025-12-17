import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              <strong>Last updated:</strong> December 2024
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data We Collect</h2>
            <p className="text-gray-600 mb-4">
              RouteFit collects minimal data to provide our service:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Filter preferences (stored in URL and browser localStorage)</li>
              <li>Shortlist data (stored locally in your browser)</li>
              <li>Analytics events (only with your consent, stored anonymously)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Data</h2>
            <p className="text-gray-600 mb-4">
              We use data solely to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Provide eligibility calculations and filtering</li>
              <li>Save your preferences locally in your browser</li>
              <li>Improve the product (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Storage</h2>
            <p className="text-gray-600 mb-4">
              All data is stored locally in your browser using localStorage. We do not store personal data
              on servers. If you clear your browser data, your preferences and shortlist will be lost.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Analytics</h2>
            <p className="text-gray-600 mb-4">
              We use privacy-friendly analytics to understand how users interact with RouteFit. Analytics
              are only enabled if you explicitly consent via the banner. You can change your preference
              at any time by clearing browser data.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Frankfurter API (for currency conversion, no personal data sent)</li>
              <li>GitHub Pages (for hosting, no tracking cookies)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
              <li>Access your data (stored locally in your browser)</li>
              <li>Delete your data (clear browser localStorage)</li>
              <li>Opt out of analytics (decline consent banner or clear browser data)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
            <p className="text-gray-600">
              Questions about privacy?{' '}
              <a href="mailto:privacy@routefit.com" className="text-primary-600 hover:text-primary-700">
                privacy@routefit.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

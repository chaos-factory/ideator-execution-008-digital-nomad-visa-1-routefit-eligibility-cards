import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Imprint() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Imprint</h1>
          
          <div className="prose prose-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Information</h2>
            
            <p className="text-gray-600 mb-4">
              <strong>Service Provider:</strong><br />
              RouteFit<br />
              [Address Line 1]<br />
              [Address Line 2]<br />
              [Country]
            </p>

            <p className="text-gray-600 mb-4">
              <strong>Contact:</strong><br />
              Email: legal@routefit.com<br />
              Website: https://chaos-factory.github.io/ideator-exec-008-routefit-eligibility-cards/
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Responsibility for Content</h2>
            <p className="text-gray-600 mb-4">
              The content of this website has been compiled with meticulous care and to the best of our
              knowledge. However, we cannot assume any liability for the up-to-dateness, completeness or
              accuracy of any of the pages.
            </p>

            <p className="text-gray-600 mb-4">
              RouteFit provides information for research purposes only. We are not immigration lawyers or
              advisors. Always verify requirements with official sources before making decisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Copyright</h2>
            <p className="text-gray-600 mb-4">
              The content and works published on this website are governed by copyright laws. Any
              duplication, processing, distribution or any form of utilization beyond the scope of copyright
              law shall require the prior written consent of RouteFit.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">External Links</h2>
            <p className="text-gray-600 mb-4">
              This website contains links to external websites operated by third parties. We have no
              influence on the content of these websites and therefore cannot accept any liability for them.
              The respective provider or operator is always responsible for the content of linked pages.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Dispute Resolution</h2>
            <p className="text-gray-600 mb-4">
              The European Commission provides a platform for online dispute resolution (ODR):
              https://ec.europa.eu/consumers/odr
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/sources" className="text-gray-600 hover:text-primary-600 text-sm">
                  Sources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="text-gray-600 hover:text-primary-600 text-sm">
                  Imprint
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            <strong>Disclaimer:</strong> RouteFit provides eligibility information based on publicly
            available sources. This is not legal advice. Requirements change frequently. Always verify
            with official sources before making travel or relocation decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

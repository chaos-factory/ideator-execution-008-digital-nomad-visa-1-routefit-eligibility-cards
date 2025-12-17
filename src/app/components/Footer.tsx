import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  About
                </Link>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sources" className="text-gray-600 hover:text-gray-900 text-sm">
                  Sources
                </Link>
              </li>
              <li>
                <a href="#glossary" className="text-gray-600 hover:text-gray-900 text-sm">
                  Glossary
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/imprint" className="text-gray-600 hover:text-gray-900 text-sm">
                  Imprint
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">RouteFit</h3>
            <p className="text-gray-600 text-sm">
              Fast eligibility snapshots for digital nomad and remote work programs.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Disclaimer: RouteFit provides information for research purposes. Always verify requirements
            with official sources before making decisions. We are not liable for visa denials or
            immigration outcomes.
          </p>
          <p className="text-sm text-gray-400 text-center mt-4">
            © {new Date().getFullYear()} RouteFit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

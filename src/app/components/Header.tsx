import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              RouteFit
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/sources"
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                Sources
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Log in
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              All-access 90d $19
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

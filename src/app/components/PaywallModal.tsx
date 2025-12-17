import { trackEvent, AnalyticsEvents } from '../utils/analytics';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  if (!isOpen) return null;

  const handleUpgradeClick = (tier: string) => {
    trackEvent(AnalyticsEvents.UPGRADE_STARTED, { tier });
    // In a real app, this would redirect to payment
    alert(`Upgrade to ${tier} - Payment integration would go here`);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Unlock All Programs</h2>
          <p className="text-lg text-gray-600">
            Get access to all eligibility details, export features, and more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Region Pack */}
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Region Pack</h3>
            <div className="text-3xl font-bold text-primary-600 mb-4">$9</div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Unlock one region (e.g., Europe, Asia)
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Full program details
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Export to PDF/CSV
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                30-day access
              </li>
            </ul>
            <button
              onClick={() => handleUpgradeClick('Region Pack')}
              className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Get Region Pack
            </button>
          </div>

          {/* All-Access */}
          <div className="border-2 border-primary-600 rounded-lg p-6 relative">
            <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">All-Access</h3>
            <div className="text-3xl font-bold text-primary-600 mb-4">$19</div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                All regions unlocked
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Full program details
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Unlimited exports
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                90-day access
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Priority support
              </li>
            </ul>
            <button
              onClick={() => handleUpgradeClick('All-Access')}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Get All-Access
            </button>
          </div>
        </div>

        {/* Coupon Field Stub */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Have a coupon code?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

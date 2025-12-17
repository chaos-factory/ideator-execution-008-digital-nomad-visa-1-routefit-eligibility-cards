interface PaywallModalProps {
  onClose: () => void;
  onUpgrade: (plan: 'region' | 'all-access') => void;
}

export default function PaywallModal({ onClose, onUpgrade }: PaywallModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">Unlock More Programs</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p className="text-gray-600 mb-6">
            You've reached the free tier limit of 5 programs. Upgrade to unlock all programs and features.
          </p>

          {/* Pricing Options */}
          <div className="space-y-4">
            {/* All Access Plan */}
            <div className="border-2 border-primary-600 rounded-lg p-4 bg-primary-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">All-access 90 days</h3>
                  <p className="text-sm text-gray-600">Unlimited programs, all regions</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">$19</div>
                </div>
              </div>
              <button
                onClick={() => onUpgrade('all-access')}
                className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors mt-3"
              >
                Get All-Access
              </button>
            </div>

            {/* Region Pack */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Region Pack</h3>
                  <p className="text-sm text-gray-600">Single region (e.g., Europe)</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">$9</div>
                </div>
              </div>
              <button
                onClick={() => onUpgrade('region')}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors mt-3"
              >
                Choose Region
              </button>
            </div>
          </div>

          {/* Coupon Stub */}
          <div className="mt-6">
            <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
              Have a coupon code?
            </label>
            <input
              type="text"
              id="coupon"
              placeholder="Enter code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Coupon validation coming soon</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <p className="text-xs text-gray-500 text-center">
            Secure payment processing. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

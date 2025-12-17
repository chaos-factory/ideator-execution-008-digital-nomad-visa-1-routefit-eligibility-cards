import { useState, useEffect } from 'react';
import { setConsent } from '../utils/analytics';

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    const hasVisited = localStorage.getItem('has_visited');
    
    if (!consent && hasVisited) {
      setShow(true);
    }
    
    if (!hasVisited) {
      localStorage.setItem('has_visited', 'true');
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setShow(false);
  };

  const handleDecline = () => {
    setConsent(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700">
          We use analytics to improve your experience. Your data helps us understand usage patterns.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

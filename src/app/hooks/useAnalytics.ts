import { useState, useEffect } from 'react';
import { 
  initializeAnalytics, 
  trackEvent as track, 
  setAnalyticsConsent,
  getAnalyticsConsent,
  hasConsentBeenSet
} from '../utils/analytics';

export function useAnalytics() {
  const [hasConsent, setHasConsent] = useState(getAnalyticsConsent());
  const [needsConsent, setNeedsConsent] = useState(!hasConsentBeenSet());

  useEffect(() => {
    initializeAnalytics();
  }, []);

  const giveConsent = (consent: boolean) => {
    setAnalyticsConsent(consent);
    setHasConsent(consent);
    setNeedsConsent(false);
  };

  const trackEvent = (event: string, properties?: Record<string, unknown>) => {
    if (hasConsent) {
      track(event as any, properties);
    }
  };

  return {
    hasConsent,
    needsConsent,
    giveConsent,
    trackEvent,
  };
}

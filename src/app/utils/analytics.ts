const CONSENT_KEY = 'analytics_consent';

export function hasConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === 'true';
}

export function setConsent(consent: boolean): void {
  localStorage.setItem(CONSENT_KEY, consent.toString());
}

export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  if (!hasConsent()) {
    return;
  }

  // In a real app, this would send to an analytics service
  console.log('Analytics event:', eventName, properties);
  
  // You could integrate with services like:
  // - Google Analytics
  // - Plausible
  // - Mixpanel
  // - Custom analytics endpoint
}

export const AnalyticsEvents = {
  FILTER_APPLY: 'filter_apply',
  CARD_VIEW: 'card_view',
  DETAILS_OPEN: 'details_open',
  EXPORT_PDF: 'export_pdf',
  EXPORT_CSV: 'export_csv',
  UPGRADE_VIEWED: 'upgrade_viewed',
  UPGRADE_STARTED: 'upgrade_started',
  UPGRADE_COMPLETED: 'upgrade_completed',
} as const;

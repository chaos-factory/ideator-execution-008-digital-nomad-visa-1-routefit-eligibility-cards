type AnalyticsEvent = 
  | 'filter_apply'
  | 'card_view'
  | 'details_open'
  | 'export_pdf'
  | 'export_csv'
  | 'upgrade_viewed'
  | 'upgrade_started'
  | 'upgrade_completed';

let analyticsEnabled = false;

export function setAnalyticsConsent(enabled: boolean): void {
  analyticsEnabled = enabled;
  localStorage.setItem('routefit_analytics_consent', enabled ? 'true' : 'false');
}

export function getAnalyticsConsent(): boolean {
  const consent = localStorage.getItem('routefit_analytics_consent');
  return consent === 'true';
}

export function hasConsentBeenSet(): boolean {
  return localStorage.getItem('routefit_analytics_consent') !== null;
}

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, unknown>): void {
  if (!analyticsEnabled) {
    return;
  }

  // In a real app, this would send to an analytics service
  console.log('[Analytics]', event, properties);
  
  // Store in sessionStorage for debugging
  const events = JSON.parse(sessionStorage.getItem('routefit_events') || '[]');
  events.push({
    event,
    properties,
    timestamp: Date.now(),
  });
  sessionStorage.setItem('routefit_events', JSON.stringify(events));
}

export function initializeAnalytics(): void {
  const consent = getAnalyticsConsent();
  analyticsEnabled = consent;
}

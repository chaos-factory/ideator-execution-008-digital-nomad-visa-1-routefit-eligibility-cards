import { useEffect, useRef } from 'react';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';

export function useAnalytics() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up intersection observer for card views
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const programId = entry.target.getAttribute('data-program-id');
            if (programId) {
              trackEvent(AnalyticsEvents.CARD_VIEW, { programId });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const observeCard = (element: HTMLElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return { observeCard, trackEvent };
}

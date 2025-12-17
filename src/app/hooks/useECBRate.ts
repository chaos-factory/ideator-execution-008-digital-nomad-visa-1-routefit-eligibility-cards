import { useState, useEffect } from 'react';
import { fetchECBRates } from '../utils/currency';

export function useECBRate() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRates() {
      try {
        const cache = await fetchECBRates();
        if (cache) {
          setRates(cache.rates);
          setError(null);
        } else {
          setError('Failed to load exchange rates');
        }
      } catch (err) {
        setError('Failed to load exchange rates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRates();
  }, []);

  return { rates, loading, error };
}

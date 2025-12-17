import { useState, useEffect } from 'react';
import { fetchECBRates, getDefaultRates } from '../utils/currency';

export function useECBRate() {
  const [rates, setRates] = useState<Record<string, number>>(getDefaultRates());
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRates() {
      try {
        const data = await fetchECBRates();
        if (mounted) {
          if (data) {
            setRates(data.rates);
            setTimestamp(data.timestamp);
            setError(null);
          } else {
            setError('Using default rates');
          }
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load rates');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRates();

    return () => {
      mounted = false;
    };
  }, []);

  return { rates, timestamp, loading, error };
}

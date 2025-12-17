const CACHE_KEY = 'ecb_rates_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface RatesCache {
  rates: Record<string, number>;
  timestamp: number;
  base: string;
}

export async function fetchECBRates(): Promise<RatesCache | null> {
  try {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsedCache: RatesCache = JSON.parse(cached);
      const now = Date.now();
      if (now - parsedCache.timestamp < CACHE_DURATION) {
        return parsedCache;
      }
    }

    // Fetch fresh rates
    const response = await fetch('https://api.frankfurter.app/latest');
    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }

    const data = await response.json();
    const cache: RatesCache = {
      rates: data.rates,
      timestamp: Date.now(),
      base: data.base,
    };

    // Store in cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    return cache;
  } catch (error) {
    console.error('Error fetching ECB rates:', error);
    // Try to return stale cache if available
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>,
  baseCurrency: string = 'EUR'
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  // Convert to base currency (EUR) first
  let amountInBase = amount;
  if (fromCurrency !== baseCurrency) {
    const fromRate = rates[fromCurrency];
    if (!fromRate) {
      console.warn(`Rate not found for ${fromCurrency}, using 1:1`);
      return amount;
    }
    amountInBase = amount / fromRate;
  }

  // Convert from base to target currency
  if (toCurrency === baseCurrency) {
    return amountInBase;
  }

  const toRate = rates[toCurrency];
  if (!toRate) {
    console.warn(`Rate not found for ${toCurrency}, using 1:1`);
    return amount;
  }

  return amountInBase * toRate;
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    return `${currency} ${amount.toFixed(0)}`;
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

export function getCachedRateTimestamp(): string | null {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  try {
    const parsedCache: RatesCache = JSON.parse(cached);
    return formatDate(new Date(parsedCache.timestamp).toISOString().split('T')[0]);
  } catch (error) {
    return null;
  }
}

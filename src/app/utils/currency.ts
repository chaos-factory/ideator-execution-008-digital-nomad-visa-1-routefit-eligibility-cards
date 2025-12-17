import type { ExchangeRate } from '../types';

const ECB_API_URL = 'https://api.frankfurter.app/latest';
const CACHE_KEY = 'routefit_ecb_rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchECBRates(): Promise<ExchangeRate | null> {
  // Check cache first
  const cached = getCachedRates();
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(ECB_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    const rates: ExchangeRate = {
      rates: { EUR: 1, ...data.rates },
      timestamp: Date.now(),
    };

    // Cache the rates
    localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
    return rates;
  } catch (error) {
    console.error('Error fetching ECB rates:', error);
    return null;
  }
}

export function getCachedRates(): ExchangeRate | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) {
      return null;
    }

    const rates: ExchangeRate = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (24 hours)
    if (now - rates.timestamp < CACHE_DURATION) {
      return rates;
    }

    // Cache expired
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cached rates:', error);
    return null;
  }
}

export function getDefaultRates(): Record<string, number> {
  // Fallback rates if API fails (approximate values as of late 2024)
  return {
    EUR: 1,
    USD: 1.08,
    GBP: 0.85,
    CHF: 0.93,
    NOK: 11.5,
    SEK: 11.2,
    DKK: 7.45,
    ISK: 148,
    CZK: 24.5,
    PLN: 4.35,
    HUF: 390,
    RON: 4.98,
    BGN: 1.96,
    HRK: 7.53,
    RSD: 117,
    TRY: 35,
    RUB: 100,
    UAH: 44,
    CAD: 1.47,
    AUD: 1.65,
    NZD: 1.79,
    JPY: 160,
    CNY: 7.75,
    INR: 90,
    BRL: 5.35,
    MXN: 18.5,
    ARS: 1000,
    CLP: 980,
    COP: 4250,
    ZAR: 19.5,
    AED: 3.96,
    SAR: 4.05,
    THB: 37.5,
    SGD: 1.44,
    MYR: 4.75,
    IDR: 17000,
    PHP: 61,
    VND: 27000,
    KRW: 1440,
  };
}

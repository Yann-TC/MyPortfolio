import type { PortfolioData } from '../data/portfolio';
import { fallbackPortfolioData } from '../data/portfolio';

type LoadPortfolioDataResult = {
  data: PortfolioData;
  isStale: boolean;
};

const apiBaseUrl = import.meta.env.VITE_PORTFOLIO_API_URL ?? '';

function getPortfolioApiUrl() {
  return `${apiBaseUrl}/api/portfolio`;
}

function isPortfolioData(data: unknown): data is PortfolioData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const candidate = data as Partial<PortfolioData>;

  return Boolean(
    candidate.profile &&
      Array.isArray(candidate.projects) &&
      Array.isArray(candidate.experience) &&
      Array.isArray(candidate.skills),
  );
}

export async function loadPortfolioData(): Promise<LoadPortfolioDataResult> {
  try {
    const response = await fetch(getPortfolioApiUrl());

    if (!response.ok) {
      throw new Error(`Portfolio API returned ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!isPortfolioData(data)) {
      throw new Error('Portfolio API returned an invalid payload.');
    }

    return {
      data,
      isStale: false,
    };
  } catch (error) {
    console.warn('Could not load portfolio data from the API.', error);

    return {
      data: fallbackPortfolioData,
      isStale: true,
    };
  }
}

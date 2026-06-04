import type { PortfolioData } from '../data/portfolio';
import { fallbackPortfolioData } from '../data/portfolio';

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;

async function fetchPortfolioData(): Promise<PortfolioData> {
  if (!apiUrl) {
    return fallbackPortfolioData;
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/api/portfolio`);

  if (!response.ok) {
    throw new Error(`Portfolio API responded with ${response.status}.`);
  }

  return (await response.json()) as PortfolioData;
}

export async function loadPortfolioData(): Promise<{
  data: PortfolioData;
  isStale: boolean;
}> {
  try {
    return {
      data: await fetchPortfolioData(),
      isStale: false,
    };
  } catch (error) {
    console.warn('Could not load portfolio data from API.', error);

    return {
      data: fallbackPortfolioData,
      isStale: true,
    };
  }
}

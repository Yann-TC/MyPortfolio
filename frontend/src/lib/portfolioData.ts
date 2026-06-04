import type { PortfolioData } from '../data/portfolio';
import { fallbackPortfolioData } from '../data/portfolio';

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;

async function fetchResource<T>(path: string): Promise<T> {
  const response = await fetch(`${apiUrl?.replace(/\/$/, '')}${path}`);

  if (!response.ok) {
    throw new Error(`Portfolio API ${path} responded with ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function fetchPortfolioData(): Promise<PortfolioData> {
  if (!apiUrl) {
    return fallbackPortfolioData;
  }

  const [profile, projects, experience, skills] = await Promise.all([
    fetchResource<PortfolioData['profile']>('/profile'),
    fetchResource<PortfolioData['projects']>('/projects'),
    fetchResource<PortfolioData['experience']>('/experiences'),
    fetchResource<PortfolioData['skills']>('/toolbox'),
  ]);

  return {
    profile,
    projects,
    experience,
    skills,
  };
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

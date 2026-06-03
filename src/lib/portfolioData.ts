import type { ExperienceItem } from '../data/experience';
import type { PortfolioData } from '../data/portfolio';
import { fallbackPortfolioData } from '../data/portfolio';
import type { ProfileSettings } from '../data/profile';
import type { Project, ProjectLink } from '../data/projects';
import type { SkillGroup } from '../data/skills';
import { supabase } from './supabase';

type ProfileRow = {
  full_name: string;
  headline: string;
  subtitle: string | null;
  search_zones: string[] | null;
  internship_start: string | null;
  internship_end: string | null;
  internship_label: string | null;
  resume_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
};

type ProjectRow = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  display_order: number;
};

type ProjectChildRow = {
  project_id: string;
  label: string;
  display_order: number;
};

type ProjectLinkRow = ProjectChildRow & {
  href: string | null;
  is_placeholder: boolean;
};

type ExperienceRow = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  display_order: number;
};

type ExperienceHighlightRow = {
  experience_id: string;
  body: string;
  display_order: number;
};

type ToolboxCategoryRow = {
  id: string;
  name: string;
  display_order: number;
};

type ToolboxItemRow = {
  category_id: string;
  name: string;
  display_order: number;
};

function byOrder<T extends { display_order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.display_order - b.display_order);
}

function uniqueLabels(labels: string[]) {
  return [...new Set(labels)];
}

function ensureProjectLinkLabel(label: string): ProjectLink['label'] {
  if (
    label === 'GitHub' ||
    label === 'Demo' ||
    label === 'Private' ||
    label === 'Presentation'
  ) {
    return label;
  }

  return 'Private';
}

function mapProfile(row: ProfileRow): ProfileSettings {
  return {
    fullName: row.full_name,
    headline: row.headline,
    subtitle: row.subtitle ?? fallbackPortfolioData.profile.subtitle,
    searchZones: row.search_zones ?? fallbackPortfolioData.profile.searchZones,
    internshipStart: row.internship_start ?? fallbackPortfolioData.profile.internshipStart,
    internshipEnd: row.internship_end ?? fallbackPortfolioData.profile.internshipEnd,
    internshipLabel: row.internship_label ?? fallbackPortfolioData.profile.internshipLabel,
    resumeUrl: row.resume_url ?? fallbackPortfolioData.profile.resumeUrl,
    githubUrl: row.github_url ?? fallbackPortfolioData.profile.githubUrl,
    linkedinUrl: row.linkedin_url ?? fallbackPortfolioData.profile.linkedinUrl,
  };
}

function mapProjects(
  projectRows: ProjectRow[],
  awardRows: ProjectChildRow[],
  stackRows: ProjectChildRow[],
  linkRows: ProjectLinkRow[],
): Project[] {
  return byOrder(projectRows).map((project) => ({
    title: project.title,
    eyebrow: project.eyebrow,
    summary: project.summary,
    awards: byOrder(awardRows)
      .filter((award) => award.project_id === project.id)
      .map((award) => award.label)
      .filter((label, index, labels) => labels.indexOf(label) === index),
    stack: byOrder(stackRows)
      .filter((stackItem) => stackItem.project_id === project.id)
      .map((stackItem) => stackItem.label),
    links: byOrder(linkRows)
      .filter((link) => link.project_id === project.id)
      .map((link) => ({
        label: ensureProjectLinkLabel(link.label),
        href: link.href ?? undefined,
        isPlaceholder: link.is_placeholder,
      })),
  }));
}

function mapExperience(
  experienceRows: ExperienceRow[],
  highlightRows: ExperienceHighlightRow[],
): ExperienceItem[] {
  return byOrder(experienceRows).map((item) => ({
    role: item.role,
    company: item.company,
    period: item.period,
    summary: item.summary,
    highlights: byOrder(highlightRows)
      .filter((highlight) => highlight.experience_id === item.id)
      .map((highlight) => highlight.body),
  }));
}

function mapSkills(
  categoryRows: ToolboxCategoryRow[],
  itemRows: ToolboxItemRow[],
): SkillGroup[] {
  return byOrder(categoryRows).map((category) => ({
    category: category.name,
    items: byOrder(itemRows)
      .filter((item) => item.category_id === category.id)
      .map((item) => item.name),
  }));
}

async function getTable<T>(table: string, columns = '*') {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase.from(table).select(columns);

  if (error) {
    throw error;
  }

  return (data ?? []) as T[];
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  if (!supabase) {
    return fallbackPortfolioData;
  }

  const [
    profileRows,
    projectRows,
    awardRows,
    stackRows,
    linkRows,
    experienceRows,
    highlightRows,
    categoryRows,
    itemRows,
  ] = await Promise.all([
    getTable<ProfileRow>('profile_settings'),
    getTable<ProjectRow>('projects'),
    getTable<ProjectChildRow>('project_awards'),
    getTable<ProjectChildRow>('project_stack'),
    getTable<ProjectLinkRow>('project_links'),
    getTable<ExperienceRow>('experiences'),
    getTable<ExperienceHighlightRow>('experience_highlights'),
    getTable<ToolboxCategoryRow>('toolbox_categories'),
    getTable<ToolboxItemRow>('toolbox_items'),
  ]);

  return {
    profile: profileRows[0] ? mapProfile(profileRows[0]) : fallbackPortfolioData.profile,
    projects: projectRows.length
      ? mapProjects(projectRows, awardRows, stackRows, linkRows)
      : fallbackPortfolioData.projects,
    experience: experienceRows.length
      ? mapExperience(experienceRows, highlightRows)
      : fallbackPortfolioData.experience,
    skills: categoryRows.length
      ? mapSkills(categoryRows, itemRows)
      : fallbackPortfolioData.skills,
  };
}

export async function loadPortfolioData(): Promise<{
  data: PortfolioData;
  isStale: boolean;
}> {
  if (!supabase) {
    return {
      data: fallbackPortfolioData,
      isStale: false,
    };
  }

  try {
    return {
      data: await fetchPortfolioData(),
      isStale: false,
    };
  } catch (error) {
    console.warn('Could not load portfolio data from Supabase.', error);

    return {
      data: fallbackPortfolioData,
      isStale: true,
    };
  }
}

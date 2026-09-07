import { getTableColumns, queryRows } from './db.js';
import type {
  ExperienceItem,
  PortfolioData,
  ProfileSettings,
  Project,
  ProjectLink,
  SkillGroup,
} from './types.js';

type ProfileRow = {
  full_name: string;
  headline: string;
  subtitle: string | null;
  profile_title: string | null;
  profile_intro: string | null;
  profile_lead: string | null;
  profile_experience: string | null;
  profile_projects: string | null;
  search_zones: string | null;
  internship_start: string | null;
  internship_end: string | null;
  internship_label: string | null;
  resume_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  recommendation_letter_url: string | null;
};

type ProjectRow = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
};

type ProjectChildRow = {
  project_id: string;
  label: string;
};

type ProjectLinkRow = ProjectChildRow & {
  href: string | null;
  is_placeholder: number;
};

type ExperienceRow = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
};

type ExperienceHighlightRow = {
  experience_id: string;
  body: string;
};

type ToolboxCategoryRow = {
  id: string;
  name: string;
};

type ToolboxItemRow = {
  category_id: string;
  name: string;
};

function parseSearchZones(value: string | null) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
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

function uniqueLabels(labels: string[]) {
  return [...new Set(labels)];
}

function selectColumn(columns: Set<string>, column: string) {
  return columns.has(column) ? column : `NULL AS ${column}`;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [profile, projects, experience, skills] = await Promise.all([
    getProfileSettings(),
    getProjects(),
    getExperiences(),
    getToolbox(),
  ]);

  return {
    profile,
    projects,
    experience,
    skills,
  };
}

export async function getProfileSettings(): Promise<ProfileSettings> {
  const columns = await getTableColumns('profile_settings');
  const [profile] = await queryRows<ProfileRow>(
    `SELECT full_name, headline, subtitle,
            ${selectColumn(columns, 'profile_title')},
            ${selectColumn(columns, 'profile_intro')},
            ${selectColumn(columns, 'profile_lead')},
            ${selectColumn(columns, 'profile_experience')},
            ${selectColumn(columns, 'profile_projects')},
            search_zones, internship_start, internship_end, internship_label,
            resume_url, github_url, linkedin_url,
            ${selectColumn(columns, 'recommendation_letter_url')}
       FROM profile_settings
      ORDER BY created_at ASC
      LIMIT 1`,
  );

  if (!profile) {
    throw new Error('No profile_settings row found.');
  }

  return {
    fullName: profile.full_name,
    headline: profile.headline,
    subtitle: profile.subtitle ?? '',
    profileTitle:
      profile.profile_title ?? 'Engineering student with production frontend experience.',
    profileIntro:
      profile.profile_intro ??
      'Focused on building reliable, readable software across modern frontend, backend services, and lower-level systems.',
    profileLead:
      profile.profile_lead ??
      'Third-year student at EPITECH Mulhouse, building a profile between product interfaces and lower-level engineering fundamentals.',
    profileExperience:
      profile.profile_experience ??
      'At AkorD, I worked on Kare in a production TypeScript monorepo: landing page, attachment flows, mobile interventions, and Cypress regression work.',
    profileProjects:
      profile.profile_projects ??
      'Outside client work, I like projects where code has to move: network games, graphics experiments, hackathons, and teaching sessions.',
    searchZones: parseSearchZones(profile.search_zones),
    internshipStart: profile.internship_start ?? '',
    internshipEnd: profile.internship_end ?? '',
    internshipLabel: profile.internship_label ?? '',
    resumeUrl: profile.resume_url ?? '',
    recommendationLetterUrl: profile.recommendation_letter_url ?? '',
    githubUrl: profile.github_url ?? '',
    linkedinUrl: profile.linkedin_url ?? '',
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await queryRows<ProjectRow>(
    `SELECT id, title, eyebrow, summary
       FROM projects
      WHERE is_featured = 1
      ORDER BY display_order ASC`,
  );

  const awards = await queryRows<ProjectChildRow>(
    'SELECT project_id, label FROM project_awards ORDER BY display_order ASC',
  );

  const stack = await queryRows<ProjectChildRow>(
    'SELECT project_id, label FROM project_stack ORDER BY display_order ASC',
  );

  const links = await queryRows<ProjectLinkRow>(
    `SELECT project_id, label, href, is_placeholder
       FROM project_links
      ORDER BY display_order ASC`,
  );

  return projects.map((project) => ({
    title: project.title,
    eyebrow: project.eyebrow,
    summary: project.summary,
    awards: uniqueLabels(
      awards
        .filter((award) => award.project_id === project.id)
        .map((award) => award.label),
    ),
    stack: stack
      .filter((stackItem) => stackItem.project_id === project.id)
      .map((stackItem) => stackItem.label),
    links: links
      .filter((link) => link.project_id === project.id)
      .map((link) => ({
        label: ensureProjectLinkLabel(link.label),
        href: link.href ?? undefined,
        isPlaceholder: Boolean(link.is_placeholder),
      })),
  }));
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  const experiences = await queryRows<ExperienceRow>(
    `SELECT id, role, company, period, summary
       FROM experiences
      ORDER BY display_order ASC`,
  );

  const highlights = await queryRows<ExperienceHighlightRow>(
    `SELECT experience_id, body
       FROM experience_highlights
      ORDER BY display_order ASC`,
  );

  return experiences.map((item) => ({
    role: item.role,
    company: item.company,
    period: item.period,
    summary: item.summary,
    highlights: highlights
      .filter((highlight) => highlight.experience_id === item.id)
      .map((highlight) => highlight.body),
  }));
}

export async function getToolbox(): Promise<SkillGroup[]> {
  const categories = await queryRows<ToolboxCategoryRow>(
    'SELECT id, name FROM toolbox_categories ORDER BY display_order ASC',
  );

  const items = await queryRows<ToolboxItemRow>(
    'SELECT category_id, name FROM toolbox_items ORDER BY display_order ASC',
  );

  return categories.map((category) => ({
    category: category.name,
    items: items
      .filter((item) => item.category_id === category.id)
      .map((item) => item.name),
  }));
}

import { getDb } from './db.js';
import type { PortfolioData, ProjectLink } from './types.js';

type ProfileRow = {
  full_name: string;
  headline: string;
  subtitle: string | null;
  search_zones: string | null;
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
};

type ProjectChildRow = {
  project_id: string;
  label: string;
};

type ProjectLinkRow = ProjectChildRow & {
  href: string | null;
  is_placeholder: 0 | 1;
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

export function getPortfolioData(): PortfolioData {
  const db = getDb();

  const profile = db
    .prepare(
      `SELECT full_name, headline, subtitle, search_zones, internship_start,
              internship_end, internship_label, resume_url, github_url, linkedin_url
         FROM profile_settings
        ORDER BY created_at ASC
        LIMIT 1`,
    )
    .get() as ProfileRow | undefined;

  if (!profile) {
    throw new Error('No profile_settings row found.');
  }

  const projects = db
    .prepare(
      `SELECT id, title, eyebrow, summary
         FROM projects
        WHERE is_featured = 1
        ORDER BY display_order ASC`,
    )
    .all() as ProjectRow[];

  const awards = db
    .prepare('SELECT project_id, label FROM project_awards ORDER BY display_order ASC')
    .all() as ProjectChildRow[];

  const stack = db
    .prepare('SELECT project_id, label FROM project_stack ORDER BY display_order ASC')
    .all() as ProjectChildRow[];

  const links = db
    .prepare(
      `SELECT project_id, label, href, is_placeholder
         FROM project_links
        ORDER BY display_order ASC`,
    )
    .all() as ProjectLinkRow[];

  const experiences = db
    .prepare(
      `SELECT id, role, company, period, summary
         FROM experiences
        ORDER BY display_order ASC`,
    )
    .all() as ExperienceRow[];

  const highlights = db
    .prepare(
      `SELECT experience_id, body
         FROM experience_highlights
        ORDER BY display_order ASC`,
    )
    .all() as ExperienceHighlightRow[];

  const categories = db
    .prepare('SELECT id, name FROM toolbox_categories ORDER BY display_order ASC')
    .all() as ToolboxCategoryRow[];

  const items = db
    .prepare('SELECT category_id, name FROM toolbox_items ORDER BY display_order ASC')
    .all() as ToolboxItemRow[];

  return {
    profile: {
      fullName: profile.full_name,
      headline: profile.headline,
      subtitle: profile.subtitle ?? '',
      searchZones: parseSearchZones(profile.search_zones),
      internshipStart: profile.internship_start ?? '',
      internshipEnd: profile.internship_end ?? '',
      internshipLabel: profile.internship_label ?? '',
      resumeUrl: profile.resume_url ?? '',
      githubUrl: profile.github_url ?? '',
      linkedinUrl: profile.linkedin_url ?? '',
    },
    projects: projects.map((project) => ({
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
    })),
    experience: experiences.map((item) => ({
      role: item.role,
      company: item.company,
      period: item.period,
      summary: item.summary,
      highlights: highlights
        .filter((highlight) => highlight.experience_id === item.id)
        .map((highlight) => highlight.body),
    })),
    skills: categories.map((category) => ({
      category: category.name,
      items: items
        .filter((item) => item.category_id === category.id)
        .map((item) => item.name),
    })),
  };
}

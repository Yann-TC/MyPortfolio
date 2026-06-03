import Database from 'better-sqlite3';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dbPath = process.env.SQLITE_DB_PATH ?? path.join(rootDir, 'data', 'portfolio.sqlite');
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 3001);

const app = express();
const db = new Database(dbPath, { readonly: true, fileMustExist: true });

app.use((request, response, next) => {
  const origin = request.headers.origin;

  if (origin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }

  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

function all(sql, params = {}) {
  return db.prepare(sql).all(params);
}

function get(sql, params = {}) {
  return db.prepare(sql).get(params);
}

function unique(values) {
  return [...new Set(values)];
}

function rowsByProject(rows, projectId) {
  return rows.filter((row) => row.project_id === projectId);
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/portfolio', (_request, response, next) => {
  try {
    const profile = get(`
      select
        full_name as fullName,
        headline,
        subtitle,
        search_zones as searchZonesJson,
        internship_start as internshipStart,
        internship_end as internshipEnd,
        internship_label as internshipLabel,
        resume_url as resumeUrl,
        github_url as githubUrl,
        linkedin_url as linkedinUrl
      from profile_settings
      order by created_at desc
      limit 1
    `);

    const projects = all(`
      select id, title, eyebrow, summary
      from projects
      where is_featured = 1
      order by display_order, title
    `);

    const projectAwards = all(`
      select project_id, label
      from project_awards
      order by display_order, label
    `);

    const projectStack = all(`
      select project_id, label
      from project_stack
      order by display_order, label
    `);

    const projectLinks = all(`
      select
        project_id,
        label,
        href,
        is_placeholder as isPlaceholder
      from project_links
      order by display_order, label
    `);

    const experiences = all(`
      select id, role, company, period, summary
      from experiences
      order by display_order, start_date desc, role
    `);

    const experienceHighlights = all(`
      select experience_id, body
      from experience_highlights
      order by display_order
    `);

    const toolboxCategories = all(`
      select id, name
      from toolbox_categories
      order by display_order, name
    `);

    const toolboxItems = all(`
      select category_id, name
      from toolbox_items
      order by display_order, name
    `);

    response.json({
      profile: profile
        ? {
            ...profile,
            searchZones: JSON.parse(profile.searchZonesJson),
            searchZonesJson: undefined,
          }
        : null,
      projects: projects.map((project) => ({
        title: project.title,
        eyebrow: project.eyebrow,
        summary: project.summary,
        awards: unique(rowsByProject(projectAwards, project.id).map((award) => award.label)),
        stack: rowsByProject(projectStack, project.id).map((stackItem) => stackItem.label),
        links: rowsByProject(projectLinks, project.id).map((link) => ({
          label: link.label,
          href: link.href ?? undefined,
          isPlaceholder: Boolean(link.isPlaceholder),
        })),
      })),
      experience: experiences.map((item) => ({
        role: item.role,
        company: item.company,
        period: item.period,
        summary: item.summary,
        highlights: experienceHighlights
          .filter((highlight) => highlight.experience_id === item.id)
          .map((highlight) => highlight.body),
      })),
      skills: toolboxCategories.map((category) => ({
        category: category.name,
        items: toolboxItems
          .filter((item) => item.category_id === category.id)
          .map((item) => item.name),
      })),
    });
  } catch (error) {
    next(error);
  }
});

app.use(express.static(path.join(rootDir, 'dist')));

app.get(/.*/, (_request, response) => {
  response.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Could not load portfolio data.' });
});

const server = app.listen(port, host, () => {
  console.log(`Portfolio API listening on http://${host}:${port}`);
  console.log(`SQLite database: ${dbPath}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    db.close();
    process.exit(0);
  });
});

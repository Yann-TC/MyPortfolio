import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const dbPath = process.env.SQLITE_DB_PATH ?? './data/portfolio.sqlite';
const resolvedDbPath = path.resolve(dbPath);

fs.mkdirSync(path.dirname(resolvedDbPath), { recursive: true });

const db = new Database(resolvedDbPath);

db.exec(`
pragma foreign_keys = on;

drop table if exists toolbox_items;
drop table if exists toolbox_categories;
drop table if exists experience_highlights;
drop table if exists experiences;
drop table if exists project_links;
drop table if exists project_stack;
drop table if exists project_awards;
drop table if exists projects;
drop table if exists profile_settings;

create table profile_settings (
  id text primary key,
  full_name text not null,
  headline text not null,
  subtitle text,
  search_zones text not null,
  internship_start text,
  internship_end text,
  internship_label text,
  resume_url text,
  github_url text,
  linkedin_url text,
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
);

create table projects (
  id text primary key,
  title text not null,
  eyebrow text not null,
  summary text not null,
  display_order integer not null default 0,
  is_featured integer not null default 1,
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
);

create table project_awards (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  label text not null,
  display_order integer not null default 0
);

create table project_stack (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  label text not null,
  display_order integer not null default 0
);

create table project_links (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  label text not null check (label in ('GitHub', 'Demo', 'Private', 'Presentation')),
  href text,
  is_placeholder integer not null default 0,
  display_order integer not null default 0
);

create table experiences (
  id text primary key,
  role text not null,
  company text not null,
  period text not null,
  start_date text,
  end_date text,
  summary text not null,
  display_order integer not null default 0,
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
);

create table experience_highlights (
  id text primary key,
  experience_id text not null references experiences(id) on delete cascade,
  body text not null,
  display_order integer not null default 0
);

create table toolbox_categories (
  id text primary key,
  name text not null,
  display_order integer not null default 0
);

create table toolbox_items (
  id text primary key,
  category_id text not null references toolbox_categories(id) on delete cascade,
  name text not null,
  display_order integer not null default 0
);

insert into profile_settings (
  id,
  full_name,
  headline,
  subtitle,
  search_zones,
  internship_start,
  internship_end,
  internship_label,
  resume_url,
  github_url,
  linkedin_url
) values (
  'profile-main',
  'Yann TOISON CHABANE',
  'SOFTWARE',
  'Engineer Student',
  '["France","Switzerland","Germany","Remote Europe"]',
  '2027-04-01',
  '2027-08-31',
  'Software Development Internship',
  '/documents/resume.pdf',
  'https://github.com/Yann-TC',
  'https://www.linkedin.com/in/yann-toison-chabane'
);

insert into projects (id, title, eyebrow, summary, display_order) values
('zappy', 'Zappy', 'Network Game Simulation', 'EPITECH second year team project with three binaries: a C++ server managing a real-time game world and TCP protocol, a graphical client, and an autonomous AI player.', 1),
('animap', 'Animap', 'Zoo Collaboration', 'Team project for Mulhouse Zoo: visitor-experience web app with interactive map, GPS routing, augmented reality experience, and AI chatbot.', 2),
('anamorph', 'Anamorph', 'EPITECH Game Jam', 'Game jam entry shipped by a team of 6 in 3 days on the theme Illusion.', 3),
('cartridge', 'Cartridge', 'Game Boy Multi-Game Cartridge', 'EPITECH second year team project: a runtime engine and game collection targeting Game Boy (GBDK), with a scene system, audio/render subsystems, and SRAM saves across multiple cartridges.', 4),
('baselhack-2025', 'BaselHack 2025', 'Hackathon / Endress+Hauser Challenge', 'Selected the Endress+Hauser sponsored challenge and built a survey platform to create questionnaires, gather opinions, analyze results with AI, and assist users with AI-generated survey questions.', 5),
('kare-landing-page', 'Kare Landing Page', 'Production Frontend / AkorD', 'Public landing page for Kare, a SaaS product for digitized safety registers and regulatory building obligations.', 6);

insert into project_awards (id, project_id, label, display_order) values
('award-animap-1', 'animap', 'Event winner', 1),
('award-anamorph-1', 'anamorph', 'Event winner', 1);

insert into project_stack (id, project_id, label, display_order) values
('stack-zappy-1', 'zappy', 'C++', 1),
('stack-zappy-2', 'zappy', 'Networking', 2),
('stack-zappy-3', 'zappy', 'AI', 3),
('stack-zappy-4', 'zappy', 'Python', 4),
('stack-zappy-5', 'zappy', 'SFML', 5),
('stack-animap-1', 'animap', 'React', 1),
('stack-animap-2', 'animap', 'TypeScript', 2),
('stack-animap-3', 'animap', 'AI Chatbot', 3),
('stack-animap-4', 'animap', 'Augmented Reality', 4),
('stack-anamorph-1', 'anamorph', 'Unity', 1),
('stack-anamorph-2', 'anamorph', 'C#', 2),
('stack-anamorph-3', 'anamorph', 'Game Design', 3),
('stack-cartridge-1', 'cartridge', 'Modular C', 1),
('stack-cartridge-2', 'cartridge', 'GBDK', 2),
('stack-cartridge-3', 'cartridge', 'Game Boy', 3),
('stack-cartridge-4', 'cartridge', 'Embedded', 4),
('stack-baselhack-1', 'baselhack-2025', 'Flutter', 1),
('stack-baselhack-2', 'baselhack-2025', 'Dart', 2),
('stack-baselhack-3', 'baselhack-2025', 'Fastify', 3),
('stack-baselhack-4', 'baselhack-2025', 'TypeScript', 4),
('stack-baselhack-5', 'baselhack-2025', 'Python', 5),
('stack-baselhack-6', 'baselhack-2025', 'AI Agent', 6),
('stack-kare-1', 'kare-landing-page', 'React', 1),
('stack-kare-2', 'kare-landing-page', 'TypeScript', 2),
('stack-kare-3', 'kare-landing-page', 'Responsive UI', 3),
('stack-kare-4', 'kare-landing-page', 'Production delivery', 4);

insert into project_links (id, project_id, label, href, is_placeholder, display_order) values
('link-zappy-1', 'zappy', 'Private', null, 0, 1),
('link-animap-1', 'animap', 'Presentation', 'https://www.linkedin.com/posts/yann-toison-chabane_aujourdhui-vient-de-se-terminer-une-semaine-activity-7417963466323349506-iOIy?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFM8CXUBt5lKWZs7tUN1ZKfdEv8zY_zdBsU', 0, 1),
('link-anamorph-1', 'anamorph', 'Demo', 'https://www.youtube.com/watch?v=iXvxTeBBGbk', 0, 1),
('link-cartridge-1', 'cartridge', 'GitHub', 'https://github.com/Yann-TC/Cartridge', 0, 1),
('link-baselhack-1', 'baselhack-2025', 'GitHub', 'https://github.com/mael-bertocchi/baselhack-2025', 0, 1),
('link-baselhack-2', 'baselhack-2025', 'Presentation', 'https://www.linkedin.com/posts/yann-toison-chabane_hackathon-baselhack2025-epitech-activity-7391748608741707776-0rn_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFM8CXUBt5lKWZs7tUN1ZKfdEv8zY_zdBsU', 0, 2),
('link-kare-1', 'kare-landing-page', 'Private', null, 0, 1),
('link-kare-2', 'kare-landing-page', 'Demo', 'https://kare-app.fr', 0, 2);

insert into experiences (id, role, company, period, start_date, end_date, summary, display_order) values
('akord-internship', 'Frontend Developer Intern', 'AkorD', 'Aug. - Dec. 2025', '2025-08-01', '2025-12-31', 'Contributed to Kare, a SaaS digitalizing fire-safety registers for buildings open to the public, inside a 7-person product team.', 1),
('epitech-assistant', 'Assistant EPITECH Région', 'EPITECH', 'Feb. - July 2026', '2026-02-01', '2026-07-31', 'Mentoring and evaluating first-year EPITECH students through C projects.', 2);

insert into experience_highlights (id, experience_id, body, display_order) values
('highlight-akord-1', 'akord-internship', 'Shipped major UI work: public landing page, reusable attachment component with PDF / .eml support, mobile technician intervention flows, and AI anomaly-extraction interface.', 1),
('highlight-akord-2', 'akord-internship', 'Worked in a TypeScript monorepo using Domain-Driven Design, React, Ant Design, and Cypress.', 2),
('highlight-akord-3', 'akord-internship', 'Rebuilt key Cypress regression tests and supported production delivery through reviews, bug fixes, hotfixes, and the Oskare to Kare rebrand.', 3),
('highlight-epitech-1', 'epitech-assistant', 'Provides code reviews, debugging support, architecture guidance, and methodology follow-up.', 1),
('highlight-epitech-2', 'epitech-assistant', 'Evaluates projects and defenses against EPITECH criteria with technical feedback on correctness, maintainability, and rigor.', 2),
('highlight-epitech-3', 'epitech-assistant', 'Runs Coding Clubs, programming initiation workshops for high-school students.', 3);

insert into toolbox_categories (id, name, display_order) values
('frontend', 'Frontend', 1),
('backend', 'Backend', 2),
('systems', 'Systems', 3),
('tools', 'Tools', 4),
('game-graphics', 'Game / Graphics', 5);

insert into toolbox_items (id, category_id, name, display_order) values
('tool-frontend-1', 'frontend', 'React', 1),
('tool-frontend-2', 'frontend', 'TypeScript', 2),
('tool-frontend-3', 'frontend', 'JavaScript', 3),
('tool-frontend-4', 'frontend', 'Ant Design', 4),
('tool-frontend-5', 'frontend', 'HTML / CSS', 5),
('tool-backend-1', 'backend', 'Node.js', 1),
('tool-backend-2', 'backend', 'Express', 2),
('tool-backend-3', 'backend', 'Python', 3),
('tool-backend-4', 'backend', 'REST APIs', 4),
('tool-backend-5', 'backend', 'DDD basics', 5),
('tool-systems-1', 'systems', 'C', 1),
('tool-systems-2', 'systems', 'C++', 2),
('tool-systems-3', 'systems', 'Linux', 3),
('tool-systems-4', 'systems', 'Networking', 4),
('tool-systems-5', 'systems', 'Multithreading', 5),
('tool-systems-6', 'systems', 'Rust', 6),
('tool-tools-1', 'tools', 'Git', 1),
('tool-tools-2', 'tools', 'GitHub', 2),
('tool-tools-3', 'tools', 'Jira', 3),
('tool-tools-4', 'tools', 'Cypress', 4),
('tool-tools-5', 'tools', 'Docker', 5),
('tool-tools-6', 'tools', 'Agile', 6),
('tool-game-1', 'game-graphics', 'Unity', 1),
('tool-game-2', 'game-graphics', 'C#', 2),
('tool-game-3', 'game-graphics', 'SFML', 3),
('tool-game-4', 'game-graphics', 'Raycasting', 4);
`);

db.close();

console.log(`SQLite portfolio database created at ${resolvedDbPath}`);

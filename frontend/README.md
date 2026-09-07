# Yann Portfolio Landing

Personal portfolio website built with React, TypeScript, and Vite.

## Features
- Modular sections (Hero, About, Experience, Projects, Skills, Contact)
- Data-driven content via TypeScript files
- Lightweight UI components and styling tokens
- Fast dev server and optimized production build

## Tech Stack
- React 19
- TypeScript 5
- Vite 6

## Getting Started
1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

3) Build for production

```bash
npm run build
```

4) Preview the production build

```bash
npm run preview
```

## Project Structure
- src/app: app shell and minimal path router
- src/pages: HomePage and LegalNoticePage (`/legal-notice`)
- src/components/layout: shared layout components
- src/components/sections: page sections
- src/components/ui: reusable UI primitives
- src/data: content for experience, projects, skills
- src/lib: data loading and small helpers
- src/styles: global styles and design tokens
- public: static assets

## Updating Content
- Edit data files in src/data to update skills, projects, and experience
- Adjust section layouts in src/components/sections
- Update global styles in src/styles

## Deployment
Built with `npm run build` and served as static files by Nginx (behind Cloudflare as
DNS + CDN). The app is a single-page app with a client-resolved `/legal-notice`
route, so the host must fall back to `index.html` for unknown paths
(`try_files $uri $uri/ /index.html;` in Nginx, or an equivalent SPA rewrite on any
other static host).

## License
Not specified.

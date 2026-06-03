# Yann Portfolio Landing

Personal portfolio website built with React, TypeScript, and Vite.

## Features
- Modular sections (Hero, About, Experience, Projects, Skills, Contact)
- Data-driven content via Express + SQLite, with TypeScript fallback data
- Lightweight UI components and styling tokens
- Fast dev server and optimized production build

## Tech Stack
- React 19
- TypeScript 5
- Vite 6
- Express
- SQLite via better-sqlite3

## Getting Started
1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

3) Create the local SQLite database

```bash
node server/bootstrap-db.js
```

4) Run the API server

```bash
npm run dev:api
```

5) Build for production

```bash
npm run build
```

6) Preview the production build

```bash
npm run preview
```

## Project Structure
- src/app: app shell and routes
- src/components/layout: shared layout components
- src/components/sections: page sections
- src/components/ui: reusable UI primitives
- src/data: content for experience, projects, skills
- server: Express API and SQLite bootstrap script
- src/styles: global styles and design tokens
- public: static assets

## Updating Content
- Update the SQLite database for live content
- Edit data files in src/data only for fallback content
- Adjust section layouts in src/components/sections
- Update global styles in src/styles

## Deployment
Run the Express server on the VM. It serves `/api/portfolio` from SQLite and can also serve the Vite `dist` build.

## License
Not specified.

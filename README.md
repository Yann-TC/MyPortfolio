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
- src/app: app shell and routes
- src/components/layout: shared layout components
- src/components/sections: page sections
- src/components/ui: reusable UI primitives
- src/data: content for experience, projects, skills
- src/styles: global styles and design tokens
- public: static assets

## Updating Content
- Edit data files in src/data to update skills, projects, and experience
- Adjust section layouts in src/components/sections
- Update global styles in src/styles

## Deployment
Any static hosting that serves the Vite build output will work (Netlify, Vercel, GitHub Pages, etc.).

## License
Not specified.

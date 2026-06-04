# MyPortfolio

Personal portfolio, built as a React frontend backed by a small Express API reading a private SQLite database.

![Portfolio preview](frontend/public/documents/readme_img.png)

## Overview

This repository contains:

- `frontend`: React 19, TypeScript, Vite, static assets, and portfolio UI.
- `backend`: Express, TypeScript, Zod-validated API routes, and SQLite access through `sql.js`.
- `backend/data/portfolio.sqlite`: production database path on the VM, ignored by Git.

The public site fetches typed portfolio resources from the API:

```text
Frontend -> https://api.yanntc.dev -> Express API -> private SQLite file
```

## Tech Stack

Frontend:

- React 19
- TypeScript 5
- Vite 6
- Lucide React

Backend:

- Express
- TypeScript
- Zod
- SQLite database file
- `sql.js` to avoid native SQLite/glibc issues on the VM

Infrastructure:

- Nginx reverse proxy
- Certbot HTTPS
- systemd service for the API

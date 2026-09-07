<div align="center">

# MyPortfolio

**Personal portfolio — React frontend backed by a typed Express API reading a private SQLite database.**

<br/>

[![Website](https://img.shields.io/badge/yanntc.dev-visit-black?style=for-the-badge&logo=safari&logoColor=white)](https://yanntc.dev/)
[![API](https://img.shields.io/badge/api.yanntc.dev-live-4CAF50?style=for-the-badge&logo=server&logoColor=white)](https://api.yanntc.dev)
[![GitHub](https://img.shields.io/badge/GitHub-yanntc-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yann-tc)

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)

</div>

---

![Portfolio preview](frontend/public/documents/readme_img.png)

---

## Overview

This repository contains two packages:

- **`frontend/`** — React 19 app built with Vite. Fetches typed portfolio resources from the API and renders the public-facing site.
- **`backend/`** — Express API with Zod-validated routes. Reads `backend/data/portfolio.sqlite` via `sql.js` (chosen to avoid native SQLite/glibc issues on the VM). The database file is gitignored.

---

## Tech stack

### Frontend
| | |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Static typing |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Lucide React](https://lucide.dev/) | Icons |

### Backend
| | |
|---|---|
| [Express](https://expressjs.com/) | HTTP server |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Zod](https://zod.dev/) | Runtime schema validation |
| [sql.js](https://sql.js.org/) | WebAssembly SQLite, no native bindings |

### Infrastructure
| | |
|---|---|
| Nginx | Reverse proxy |
| Certbot | HTTPS via Let's Encrypt |
| systemd | API process management |

---

## Project structure

```
.
├── frontend/
│   ├── src/
│   │   ├── app/            ← app shell + minimal path router
│   │   ├── pages/          ← HomePage, LegalNoticePage
│   │   ├── components/
│   │   ├── lib/
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── data/
│   │   └── portfolio.sqlite   ← production only, gitignored
│   └── tsconfig.json
│
└── README.md
```

---

## Getting started

### Prerequisites

- Node.js ≥ 18

### Frontend

```bash
cd frontend
npm install
npm run dev      # Vite dev server
npm run build    # outputs to frontend/dist/
```

### Backend

```bash
cd backend
npm install
npm run dev      # ts-node / nodemon
npm run build    # compiles to dist/
npm start        # runs compiled output
```

> Place your database at `backend/data/portfolio.sqlite` before starting the API.

---

## Deployment

1. **systemd** — starts the Express API on boot, restarts on failure.
2. **Nginx** — proxies `api.yanntc.dev` to the local Express port; serves the static frontend build for `yanntc.dev`.
3. **Certbot** — manages TLS for both domains.
4. **Cloudflare** — sits in front as DNS + CDN proxy.

```bash
# deploy frontend
cd frontend && npm run build
# copy dist/ to Nginx web root

# deploy backend
cd backend && npm run build
sudo systemctl restart portfolio-api
```

The frontend is a single-page app: the client resolves `/legal-notice`
itself, so the Nginx `location` serving `yanntc.dev` must fall back to
`index.html` for unknown paths.

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

<div align="center">

· [yanntc.dev](https://yanntc.dev/) ·

</div>

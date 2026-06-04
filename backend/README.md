# Portfolio API

Express + TypeScript API for the portfolio frontend.

## Setup

```bash
npm install
cp .env.example .env
```

Create the SQLite database from the seed commands, then set `SQLITE_DB_PATH` to that file.

## Run

```bash
npm run dev
```

The API endpoints are:

```text
GET http://localhost:3001/health
GET http://localhost:3001/profile
GET http://localhost:3001/projects
GET http://localhost:3001/experiences
GET http://localhost:3001/toolbox
GET http://localhost:3001/portfolio
```

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

The portfolio endpoint is:

```text
GET http://localhost:3001/api/portfolio
```

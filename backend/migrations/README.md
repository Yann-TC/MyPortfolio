# Database Migrations

Run migrations manually on the VM against the private SQLite file.

```bash
cd /home/deploy/portfolio/backend
sqlite3 /home/deploy/portfolio/backend/data/portfolio.sqlite < migrations/001_profile_about_content.sql
```

Each migration is intended to be run once. Back up the DB before applying one:

```bash
cp /home/deploy/portfolio/backend/data/portfolio.sqlite /home/deploy/portfolio/backend/data/portfolio.sqlite.bak
```

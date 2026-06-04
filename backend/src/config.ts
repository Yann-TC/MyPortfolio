import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(dirname, '..');

function resolveFromBackendRoot(value: string) {
  return path.isAbsolute(value) ? value : path.resolve(backendRoot, value);
}

function parseCorsOrigins(value: string) {
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const config = {
  port: Number(process.env.PORT ?? 3001),
  host: process.env.HOST ?? '127.0.0.1',
  sqliteDbPath: resolveFromBackendRoot(
    process.env.SQLITE_DB_PATH ?? './data/portfolio.sqlite',
  ),
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN ?? 'http://localhost:5173'),
};

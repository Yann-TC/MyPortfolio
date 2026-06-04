import { DatabaseSync } from 'node:sqlite';
import { config } from './config.js';

let db: DatabaseSync | null = null;

export function getDb() {
  if (!db) {
    db = new DatabaseSync(config.sqliteDbPath);
    db.exec('PRAGMA foreign_keys = ON');
  }

  return db;
}

import sqlite3 from 'sqlite3';
import { open, type Database } from 'sqlite';
import { config } from './config.js';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: config.sqliteDbPath,
      driver: sqlite3.Database,
    });
    await db.exec('PRAGMA foreign_keys = ON');
  }

  return db;
}

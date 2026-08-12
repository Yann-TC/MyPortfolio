import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import initSqlJs, { type SqlJsStatic } from 'sql.js';
import { config } from './config.js';

const require = createRequire(import.meta.url);

let sqlPromise: Promise<SqlJsStatic> | null = null;

function getSql() {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: () => require.resolve('sql.js/dist/sql-wasm.wasm'),
    });
  }

  return sqlPromise;
}

export async function queryRows<T extends Record<string, unknown>>(sql: string) {
  const SQL = await getSql();
  const file = readFileSync(config.sqliteDbPath);
  const db = new SQL.Database(file);

  try {
    const [result] = db.exec(sql);

    if (!result) {
      return [] as T[];
    }

    return result.values.map((row) =>
      Object.fromEntries(result.columns.map((column, index) => [column, row[index]])),
    ) as T[];
  } finally {
    db.close();
  }
}

export async function getTableColumns(table: string) {
  const rows = await queryRows<{ name: string }>(`PRAGMA table_info(${table})`);

  return new Set(rows.map((row) => row.name));
}

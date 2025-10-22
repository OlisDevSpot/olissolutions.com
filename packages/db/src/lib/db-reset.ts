import type { DB } from '@olis/db'

import type { Table } from 'drizzle-orm'

import { db } from '@olis/db'

import { getTableName, sql } from 'drizzle-orm'

async function resetTable(db: DB, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE;`))
}

async function deleteTable(db: DB, table: Table) {
  return db.execute(sql.raw(`DROP TABLE IF EXISTS "${getTableName(table)}" CASCADE;`))
}

export async function resetDb(tables: Table[]) {
  const action = process.env.npm_config_drop === 'true' ? deleteTable : resetTable

  for (const table of tables) {
    await action(db, table)
  }
}

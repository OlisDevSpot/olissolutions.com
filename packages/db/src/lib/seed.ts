import type { DB } from '@workspace/db'
import type { Table } from 'drizzle-orm'
import { db } from '@workspace/db'
import * as seeds from '@workspace/db/seeds/landing'
import { getTableName, sql } from 'drizzle-orm'
import * as schema from '../schema'

// define reset function
async function resetTable(db: DB, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE;`),
  )
}

// seed each table (order is semi-important)
(async () => {
  // run reset function for each table
  for (const table of [schema.solutions, schema.psychologyConcepts]) {
    await resetTable(db, table)
  }

  await seeds.psychologyConcepts(db)
  await seeds.solutions(db)
})()

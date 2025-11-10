import type { DB } from '@olis/db'
import type { PgSchema } from 'drizzle-orm/pg-core'

import { db } from '@olis/db'

import * as schema from '@olis/db/schema'
import { getTableName, sql, Table } from 'drizzle-orm'

async function resetTable(db: DB, table: Table, schemaName: PgSchema) {
  return db.execute(sql.raw(`TRUNCATE TABLE "${schemaName.schemaName}"."${getTableName(table)}" RESTART IDENTITY CASCADE;`))
}

async function deleteTable(db: DB, table: Table, schemaName: PgSchema) {
  return db.execute(sql.raw(`DROP TABLE IF EXISTS "${schemaName.schemaName}"."${getTableName(table)}" CASCADE;`))
}

export async function resetSchema(schema: Record<string, any>, schemaName: PgSchema) {
  const action = process.env.npm_config_drop === 'true' ? deleteTable : resetTable

  for (const [_, dbEntity] of Object.entries(schema)) {
    if (dbEntity instanceof Table) {
      await action(db, dbEntity, schemaName)
    }
  }
}

async function resetDb() {
  switch (process.argv[2]) {
    case 'platform':
      await resetSchema(schema.platformSchema, schema.platformSchema.platformSchema)
      break
    case 'identity':
      await resetSchema(schema.identitySchema, schema.identitySchema.identitySchema)
      break
    case 'marketplace':
      await resetSchema(schema.marketplaceSchema, schema.marketplaceSchema.marketplaceSchema)
      break
    case 'oneStopSales':
      await resetSchema(schema.remodelXSchema, schema.remodelXSchema.remodelXSchema)
      break
    default:
      throw new Error('Invalid schema')
  }
}

resetDb()

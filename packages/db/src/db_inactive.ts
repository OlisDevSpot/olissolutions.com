import * as schema from '@workspace/db/schema/index'
import { drizzle } from 'drizzle-orm/node-postgres'

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

type SchemaName = keyof typeof schema | null

function getDb(schemaName: SchemaName) {
  return drizzle(pool, {
    logger: process.env.npm_config_logger === 'true',
    schema: schemaName === 'coreSchema' ? schema.coreSchema : schema.oneStopSalesSchema,
  })
}

export type DB = ReturnType<typeof getDb>
export { getDb }

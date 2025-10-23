import * as schema from '@olis/db/schema'
import { drizzle } from 'drizzle-orm/node-postgres'

import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

const db = drizzle(pool, {
  logger: process.env.npm_config_logger === 'true',
  schema: {
    ...schema.coreSchema,
    ...schema.oneStopSalesSchema,
  },
})

export type DB = typeof db
export { db }

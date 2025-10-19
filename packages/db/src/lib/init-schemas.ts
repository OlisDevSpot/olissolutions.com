import { db } from '@workspace/db'
import { sql } from 'drizzle-orm'

(async () => {
  await db.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS core`))
  await db.execute(sql.raw(`CREATE SCHEMA IF NOT EXISTS one_stop_sales`))
})()

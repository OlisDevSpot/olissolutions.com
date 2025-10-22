import type { DB } from '@olis/db'

import { licenses } from '@olis/db/schema/core/index'

import { sql } from 'drizzle-orm'
import { LICENSE_TYPE_MAP } from './data/licenses'

export default async function seed(db: DB) {
  const licensesData = Object.entries(LICENSE_TYPE_MAP).map(([code, label]) => ({
    code,
    label,
  }))
  await db
    .insert(licenses)
    .values(licensesData)
    .onConflictDoUpdate({
      target: licenses.code,
      set: {
        label: sql`EXCLUDED.label`,
      },
    })
}

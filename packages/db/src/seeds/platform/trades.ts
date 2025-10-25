import type { DB } from '@olis/db'

import { trades } from '@olis/db/schema/platform'

import { sql } from 'drizzle-orm'

import { tradesData } from './data/trades'

export default async function seed(db: DB) {
  await db
    .insert(trades)
    .values(tradesData)
    .onConflictDoUpdate({
      target: trades.accessor,
      set: {
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,
        location: sql`EXCLUDED.location`,
        slug: sql`EXCLUDED.slug`,
      },
    })
}

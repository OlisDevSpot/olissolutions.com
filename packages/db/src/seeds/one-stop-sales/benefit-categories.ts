import type { DB } from '@olis/db'

import { benefitCategories } from '@olis/db/schema/one-stop-sales/index'
import { sql } from 'drizzle-orm'
import { benefitCategoriesData } from './data/benefit-categories'

export default async function seed(db: DB) {
  await db
    .insert(benefitCategories)
    .values(benefitCategoriesData)
    .onConflictDoUpdate({
      target: benefitCategories.accessor,
      set: {
        label: sql`EXCLUDED.label`,
      },
    })
}

import type { DB } from '@olis/db'

import { solutions } from '@olis/db/schema/marketplace'
import { sql } from 'drizzle-orm'
import { solutionsData } from './data/solutions'

export default async function seed(db: DB) {
  await db.insert(solutions).values(solutionsData).onConflictDoUpdate({
    target: solutions.name,
    set: {
      slug: sql`EXCLUDED.slug`,
      isActive: sql`EXCLUDED.is_active`,
      name: sql`EXCLUDED.name`,
      easeOfUse: sql`EXCLUDED.ease_of_use`,
      pricePerMonth: sql`EXCLUDED.price_per_month`,
      generalDescription: sql`EXCLUDED.general_description`,
      devPort: sql`EXCLUDED.dev_port`,
      subdomain: sql`EXCLUDED.subdomain`,
      isFeatured: sql`EXCLUDED.is_featured`,
    },
  })
}

import type { BenefitCategoryAccessor } from '@olis/db/types/benefits'

import type { DB } from '@olis/db'
import type { InsertBenefit } from '@olis/db/schema/one-stop-sales'

import { benefits } from '@olis/db/schema/one-stop-sales/index'

import { sql } from 'drizzle-orm'
import { benefitsData } from './data/benefits'

export default async function seed(db: DB) {
  const allBenefitCategories = await db.query.benefitCategories.findMany()

  const mappedBenefits: InsertBenefit[] = []

  for (const [benefitCategoryAccessor, benefits] of Object.entries(benefitsData) as [BenefitCategoryAccessor, Omit<InsertBenefit, 'categoryId'>[]][]) {
    const benefitCategory = allBenefitCategories.find(category => category.accessor === benefitCategoryAccessor)
    if (!benefitCategory)
      continue

    for (const benefit of benefits) {
      mappedBenefits.push({
        content: benefit.content,
        accessor: benefit.accessor,
        lucideIcon: 'lucideIcon' in benefit ? benefit.lucideIcon : null,
        categoryId: benefitCategory.id,
      })
    }
  }

  await db
    .insert(benefits)
    .values(mappedBenefits)
    .onConflictDoUpdate({
      target: benefits.accessor,
      set: {
        content: sql`EXCLUDED.content`,
        lucideIcon: sql`EXCLUDED.lucide_icon`,
        categoryId: sql`EXCLUDED.category_id`,
      },
    })
}

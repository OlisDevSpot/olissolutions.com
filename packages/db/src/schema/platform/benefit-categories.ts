import type z from 'zod'

import { accessor, unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { varchar } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { benefits } from './benefits'
import { platformSchema } from './meta'

export const benefitCategories = platformSchema.table('benefit_categories', {
  id: unsafeId,
  accessor: accessor.unique(),
  label: varchar('label', { length: 80 }).notNull(),
})

export const benefitCategoryRelations = relations(
  benefitCategories,
  ({ many }) => ({
    benefits: many(benefits),
  }),
)

export const selectBenefitCategorySchema = createSelectSchema(benefitCategories)
export type BenefitCategory = z.infer<typeof selectBenefitCategorySchema>

export const insertBenefitCategorySchema = createInsertSchema(benefitCategories).omit({
  id: true,
})
export type InsertBenefitCategory = z.infer<typeof insertBenefitCategorySchema>

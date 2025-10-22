import type z from 'zod'

import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { accessor, unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { benefits } from './benefit'

export const benefitCategories = oneStopSalesSchema.table('benefit_category', {
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

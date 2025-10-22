import type z from 'zod'

import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'

import { relations } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { benefitCategories } from './benefit-category'
import { x_materialBenefits } from './x-material-benefits'
import { x_tradeBenefits } from './x-trade-benefit'

export const benefits = oneStopSalesSchema.table('benefit', {
  id: unsafeId,
  accessor: text('accessor').notNull().unique(),
  content: text('content').notNull(),
  lucideIcon: text('lucide_icon'),
  categoryId: integer('category_id')
    .notNull()
    .references(() => benefitCategories.id, { onDelete: 'cascade' }),
})

export const benefitRelations = relations(benefits, ({ one, many }) => ({
  x_tradeBenefits: many(x_tradeBenefits),
  materialBenefits: many(x_materialBenefits),
  benefitCategories: one(benefitCategories, {
    fields: [benefits.categoryId],
    references: [benefitCategories.id],
  }),
}))

export const selectBenefitSchema = createSelectSchema(benefits)
export type Benefit = z.infer<typeof selectBenefitSchema>

export const insertBenefitSchema = createInsertSchema(benefits).omit({
  id: true,
})
export type InsertBenefit = z.infer<typeof insertBenefitSchema>

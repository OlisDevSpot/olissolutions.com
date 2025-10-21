import type z from 'zod'

import { unsafeId } from '@workspace/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { benefitCategories } from './benefit-category'
import { x_materialBenefits } from './x-material-benefits'
import { x_upgradeBenefits } from './x-upgrade-benefit'

export const benefits = pgTable('benefit', {
  id: unsafeId,
  accessor: text('accessor').notNull().unique(),
  content: text('content').notNull(),
  lucideIcon: text('lucide_icon'),
  categoryId: integer('category_id')
    .notNull()
    .references(() => benefitCategories.id, { onDelete: 'cascade' }),
})

export const benefitRelations = relations(benefits, ({ one, many }) => ({
  x_upgradeBenefits: many(x_upgradeBenefits),
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

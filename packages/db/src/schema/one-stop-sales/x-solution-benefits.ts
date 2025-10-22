import type z from 'zod'

import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { integer, unique } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { benefits } from './benefit'
import { solutions } from './solution'

export const x_solutionBenefits = oneStopSalesSchema.table('x_solution_benefit', {
  id: unsafeId,
  solutionId: integer('solution_id')
    .notNull()
    .references(() => solutions.id, { onDelete: 'cascade' }),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id, { onDelete: 'cascade' }),
}, table => [
  unique('solution_id_benefit_id_unique').on(
    table.solutionId,
    table.benefitId,
  ),
])

export const solutionBenefitRelations = relations(
  x_solutionBenefits,
  ({ one }) => ({
    benefit: one(benefits, {
      fields: [x_solutionBenefits.benefitId],
      references: [benefits.id],
    }),
    solution: one(solutions, {
      fields: [x_solutionBenefits.solutionId],
      references: [solutions.id],
    }),
  }),
)

export const selectXSolutionBenefitSchema = createSelectSchema(x_solutionBenefits)
export type XSolutionBenefit = z.infer<typeof selectXSolutionBenefitSchema>

export const insertXSolutionBenefitSchema = createInsertSchema(x_solutionBenefits).omit({
  id: true,
})
export type InsertXSolutionBenefit = z.infer<typeof insertXSolutionBenefitSchema>

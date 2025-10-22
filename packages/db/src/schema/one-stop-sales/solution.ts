import type z from 'zod'

import { constructionTypes } from '@olis/core/constants/enums'
import { oneStopSalesSchema } from '@olis/db/lib/constants'

import { accessor, description, imageUrl, label, unsafeId } from '@olis/db/lib/schema-helpers'

import { relations } from 'drizzle-orm'
import { integer, pgEnum, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { trades } from './trade'
import { x_projectSolutions } from './x-project-solution'
import { x_solutionBenefits } from './x-solution-benefits'
import { x_solutionMaterials } from './x-solution-material'
import { x_solutionVariables } from './x-solution-variable'

export const constructionTypeEnum = pgEnum('construction_type', constructionTypes)

export const solutions = oneStopSalesSchema.table('solution', {
  id: unsafeId,
  label,
  accessor: accessor.unique(),
  description,
  imageUrl,
  scopeOfWorkBase: text('scope_of_work_base'),
  constructionType: constructionTypeEnum('construction_type'),
  tradeId: integer('trade_id')
    .notNull()
    .references(() => trades.id, { onDelete: 'cascade' }),
})

export const solutionRelations = relations(solutions, ({ one, many }) => ({
  trade: one(trades, {
    fields: [solutions.tradeId],
    references: [trades.id],
  }),
  x_projectSolutions: many(x_projectSolutions),
  x_solutionMaterials: many(x_solutionMaterials),
  x_solutionVariables: many(x_solutionVariables),
  x_solutionBenefits: many(x_solutionBenefits),
}))

export type Solution = typeof solutions.$inferSelect
export const selectSolutionSchema = createSelectSchema(solutions)
export type SelectSolutionSchema = z.infer<typeof selectSolutionSchema>

export type InsertSolution = typeof solutions.$inferInsert
export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
})
export type InsertSolutionSchema = z.infer<typeof insertSolutionSchema>

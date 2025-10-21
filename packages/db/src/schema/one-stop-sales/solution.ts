import type z from 'zod'

import { accessor, description, imageUrl, label, unsafeId } from '@workspace/db/lib/schema-helpers'
import { constructionTypes } from '@workspace/core/constants/enums'

import { relations } from 'drizzle-orm'

import { integer, pgEnum, pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { upgrades } from './upgrade'
import { x_projectSolutions } from './x-project-solution'
import { x_solutionBenefits } from './x-solution-benefits'
import { x_solutionMaterials } from './x-solution-material'
import { x_solutionVariables } from './x-solution-variable'

export const constructionTypeEnum = pgEnum('construction_type', constructionTypes)

export const solutions = pgTable('solution', {
  id: unsafeId,
  label,
  accessor: accessor.unique(),
  description,
  imageUrl,
  scopeOfWorkBase: text('scope_of_work_base'),
  constructionType: constructionTypeEnum('construction_type'),
  upgradeId: integer('upgrade_id')
    .notNull()
    .references(() => upgrades.id, { onDelete: 'cascade' }),
})

export const solutionRelations = relations(solutions, ({ one, many }) => ({
  upgrade: one(upgrades, {
    fields: [solutions.upgradeId],
    references: [upgrades.id],
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

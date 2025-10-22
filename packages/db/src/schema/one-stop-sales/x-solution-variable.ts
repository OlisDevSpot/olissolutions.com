import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'

import { relations } from 'drizzle-orm'

import { integer, unique } from 'drizzle-orm/pg-core'
import { solutions } from './solution'
import { variables } from './variable'

export const x_solutionVariables = oneStopSalesSchema.table('x_solution_variable', {
  id: unsafeId,
  solutionId: integer('solution_id')
    .notNull()
    .references(() => solutions.id, { onDelete: 'cascade' }),
  variableId: integer('variable_id')
    .notNull()
    .references(() => variables.id, { onDelete: 'cascade' }),
}, table => [
  unique('solution_id_variable_id_unique').on(
    table.solutionId,
    table.variableId,
  ),
])

export const solutionVariableRelations = relations(
  x_solutionVariables,
  ({ one }) => ({
    solution: one(solutions, {
      fields: [x_solutionVariables.solutionId],
      references: [solutions.id],
    }),
    variable: one(variables, {
      fields: [x_solutionVariables.variableId],
      references: [variables.id],
    }),
  }),
)

export type XSolutionVariable = typeof x_solutionVariables.$inferSelect
export type InsertXSolutionVariable = typeof x_solutionVariables.$inferInsert

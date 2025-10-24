import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'

import { scopes } from '@olis/db/schema/platform'

import { relations } from 'drizzle-orm'
import { integer, unique } from 'drizzle-orm/pg-core'
import { variables } from './variable'

export const x_scopeVariables = oneStopSalesSchema.table('x_scope_variables', {
  id: unsafeId,
  scopeId: integer('scope_id')
    .notNull()
    .references(() => scopes.id, { onDelete: 'cascade' }),
  variableId: integer('variable_id')
    .notNull()
    .references(() => variables.id, { onDelete: 'cascade' }),
}, table => [
  unique('scope_id_variable_id_unique').on(
    table.scopeId,
    table.variableId,
  ),
])

export const scopeVariableRelations = relations(
  x_scopeVariables,
  ({ one }) => ({
    scope: one(scopes, {
      fields: [x_scopeVariables.scopeId],
      references: [scopes.id],
    }),
    variable: one(variables, {
      fields: [x_scopeVariables.variableId],
      references: [variables.id],
    }),
  }),
)

export type XScopeVariable = typeof x_scopeVariables.$inferSelect
export type InsertXScopeVariable = typeof x_scopeVariables.$inferInsert

import type z from 'zod'

import { id } from '@olis/db/lib/schema-helpers'
import { scopes, x_scopeMaterials } from '@olis/db/schema/platform'
import { relations } from 'drizzle-orm'
import { integer, jsonb, unique, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { remodelXSchema } from './meta'
import { projects } from './project'

export const x_projectScopes = remodelXSchema.table('x_project_scopes', {
  id,
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  scopeId: integer('scope_id')
    .notNull()
    .references(() => scopes.id, { onDelete: 'no action' }),
  scopeMaterialId: integer('scope_material_id').references(
    () => x_scopeMaterials.id,
    { onDelete: 'cascade' },
  ),
  variablesData: jsonb('variables_data').$type<Record<string, any>>(),
}, table => [
  unique('project_id_scope_id_unique').on(
    table.projectId,
    table.scopeId,
  ),
])

export const projectScopeRelations = relations(
  x_projectScopes,
  ({ one }) => ({
    scope: one(scopes, {
      fields: [x_projectScopes.scopeId],
      references: [scopes.id],
    }),
    project: one(projects, {
      fields: [x_projectScopes.projectId],
      references: [projects.id],
    }),
    scopeMaterial: one(x_scopeMaterials, {
      fields: [x_projectScopes.scopeMaterialId],
      references: [x_scopeMaterials.id],
    }),
  }),
)

export const selectXProjectScopeSchema = createSelectSchema(x_projectScopes)
export type SelectXProjectScopeSchema = z.infer<typeof selectXProjectScopeSchema>

export const insertXProjectScopeSchema = createInsertSchema(x_projectScopes).omit({
  id: true,
  projectId: true,
  scopeId: true,
})
export type InsertXProjectScopeSchema = z.infer<typeof insertXProjectScopeSchema>

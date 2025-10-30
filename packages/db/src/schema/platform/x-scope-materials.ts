import type z from 'zod'

import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { boolean, integer, unique } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { materials } from './materials'
import { platformSchema } from './meta'
import { scopes } from './scopes'

export const x_scopeMaterials = platformSchema.table('x_scope_materials', {
  id: unsafeId,
  scopeId: integer('scope_id')
    .notNull()
    .references(() => scopes.id, { onDelete: 'cascade' }),
  materialId: integer('material_id')
    .notNull()
    .references(() => materials.id, { onDelete: 'cascade' }),
  isMostPopular: boolean('is_most_popular'),
}, table => [
  unique('scope_id_material_id_unique').on(
    table.scopeId,
    table.materialId,
  ),
])

export const scopeMaterialRelations = relations(
  x_scopeMaterials,
  ({ one }) => ({
    scope: one(scopes, {
      fields: [x_scopeMaterials.scopeId],
      references: [scopes.id],
    }),
    material: one(materials, {
      fields: [x_scopeMaterials.materialId],
      references: [materials.id],
    }),
  }),
)

export const selectXScopeMaterialSchema = createSelectSchema(x_scopeMaterials)
export type XScopeMaterial = z.infer<typeof selectXScopeMaterialSchema>

export const insertXScopeMaterialSchema = createInsertSchema(x_scopeMaterials).omit({
  id: true,
})
export type InsertXScopeMaterial = z.infer<typeof insertXScopeMaterialSchema>

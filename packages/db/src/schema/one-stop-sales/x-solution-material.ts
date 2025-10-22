import type z from 'zod'

import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { boolean, integer, unique } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { materials } from './material'
import { solutions } from './solution'

export const x_solutionMaterials = oneStopSalesSchema.table('x_solution_material', {
  id: unsafeId,
  solutionId: integer('solution_id')
    .notNull()
    .references(() => solutions.id, { onDelete: 'cascade' }),
  materialId: integer('material_id')
    .notNull()
    .references(() => materials.id, { onDelete: 'cascade' }),
  isMostPopular: boolean('is_most_popular'),
}, table => [
  unique('solution_id_material_id_unique').on(
    table.solutionId,
    table.materialId,
  ),
])

export const solutionMaterialRelations = relations(
  x_solutionMaterials,
  ({ one }) => ({
    solution: one(solutions, {
      fields: [x_solutionMaterials.solutionId],
      references: [solutions.id],
    }),
    material: one(materials, {
      fields: [x_solutionMaterials.materialId],
      references: [materials.id],
    }),
  }),
)

export const selectXSolutionMaterialSchema = createSelectSchema(x_solutionMaterials)
export type XSolutionMaterial = z.infer<typeof selectXSolutionMaterialSchema>

export const insertXSolutionMaterialSchema = createInsertSchema(x_solutionMaterials).omit({
  id: true,
})
export type InsertXSolutionMaterial = z.infer<typeof insertXSolutionMaterialSchema>

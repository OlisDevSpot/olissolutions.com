import type z from 'zod'

import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { accessor, description, imageUrl, label, unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'

import { integer } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { x_materialBenefits } from './x-material-benefits'
import { x_solutionMaterials } from './x-solution-material'

export const materials = oneStopSalesSchema.table('material', {
  id: unsafeId,
  label,
  accessor: accessor.unique(),
  description,
  imageUrl,
  lifespan: integer('lifespan'),
  warranty: integer('warranty'),
})

export const materialRelations = relations(materials, ({ many }) => ({
  x_solutionMaterials: many(x_solutionMaterials),
  materialBenefits: many(x_materialBenefits),
}))

export const selectMaterialSchema = createSelectSchema(materials)
export type Material = z.infer<typeof selectMaterialSchema>

export const insertMaterialSchema = createInsertSchema(materials)
export type InsertMaterial = z.infer<typeof insertMaterialSchema>

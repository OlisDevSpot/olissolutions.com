import type z from 'zod'

import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { integer, unique } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { benefits } from './benefits'
import { materials } from './materials'
import { platformSchema } from './meta'

export const x_materialBenefits = platformSchema.table('x_material_benefits', {
  id: unsafeId,
  materialId: integer('material_id')
    .notNull()
    .references(() => materials.id, { onDelete: 'cascade' }),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id, { onDelete: 'cascade' }),
}, table => [
  unique('material_id_benefit_id_unique').on(
    table.materialId,
    table.benefitId,
  ),
])

export const materialBenefitRelations = relations(
  x_materialBenefits,
  ({ one }) => ({
    benefit: one(benefits, {
      fields: [x_materialBenefits.benefitId],
      references: [benefits.id],
    }),
    material: one(materials, {
      fields: [x_materialBenefits.materialId],
      references: [materials.id],
    }),
  }),
)

export const selectXMaterialBenefitSchema = createSelectSchema(x_materialBenefits)
export type XMaterialBenefit = z.infer<typeof selectXMaterialBenefitSchema>

export const insertXMaterialBenefitSchema = createInsertSchema(x_materialBenefits).omit({
  id: true,
})
export type InsertXMaterialBenefit = z.infer<typeof insertXMaterialBenefitSchema>

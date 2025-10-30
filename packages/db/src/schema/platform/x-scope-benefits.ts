import type z from 'zod'

import { unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { integer, unique } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { benefits } from './benefits'
import { platformSchema } from './meta'
import { scopes } from './scopes'

export const x_scopeBenefits = platformSchema.table('x_scope_benefits', {
  id: unsafeId,
  scopeId: integer('scope_id')
    .notNull()
    .references(() => scopes.id, { onDelete: 'cascade' }),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id, { onDelete: 'cascade' }),
}, table => [
  unique('scope_id_benefit_id_unique').on(
    table.scopeId,
    table.benefitId,
  ),
])

export const scopeBenefitRelations = relations(
  x_scopeBenefits,
  ({ one }) => ({
    benefit: one(benefits, {
      fields: [x_scopeBenefits.benefitId],
      references: [benefits.id],
    }),
    scope: one(scopes, {
      fields: [x_scopeBenefits.scopeId],
      references: [scopes.id],
    }),
  }),
)

export const selectXScopeBenefitSchema = createSelectSchema(x_scopeBenefits)
export type XScopeBenefit = z.infer<typeof selectXScopeBenefitSchema>

export const insertXScopeBenefitSchema = createInsertSchema(x_scopeBenefits).omit({
  id: true,
})
export type InsertXScopeBenefit = z.infer<typeof insertXScopeBenefitSchema>

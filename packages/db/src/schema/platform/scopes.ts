import type z from 'zod'

import { constructionTypes } from '@olis/core/constants'
import { platformSchema } from '@olis/db/lib/constants'

import { accessor, description, imageUrl, label, unsafeId } from '@olis/db/lib/schema-helpers'

import { x_projectScopes, x_scopeVariables } from '@olis/db/schema/one-stop-sales'
import { relations } from 'drizzle-orm'
import { integer, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { trades } from './trades'

import { x_scopeBenefits } from './x-scope-benefits'
import { x_scopeMaterials } from './x-scope-materials'

export const constructionTypeEnum = platformSchema.enum('construction_type', constructionTypes)

export const scopes = platformSchema.table('scopes', {
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

export const scopeRelations = relations(scopes, ({ one, many }) => ({
  trade: one(trades, {
    fields: [scopes.tradeId],
    references: [trades.id],
  }),
  x_projectScopes: many(x_projectScopes),
  x_scopeMaterials: many(x_scopeMaterials),
  x_scopeVariables: many(x_scopeVariables),
  x_scopeBenefits: many(x_scopeBenefits),
}))

export type Scope = typeof scopes.$inferSelect
export const selectScopeSchema = createSelectSchema(scopes)
export type SelectScopeSchema = z.infer<typeof selectScopeSchema>

export type InsertScope = typeof scopes.$inferInsert
export const insertScopeSchema = createInsertSchema(scopes).omit({
  id: true,
})
export type InsertScopeSchema = z.infer<typeof insertScopeSchema>

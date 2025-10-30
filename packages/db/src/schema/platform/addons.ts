import type z from 'zod'

import { accessor, description, imageUrl, label, unsafeId } from '@olis/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { integer } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { platformSchema } from './meta'
import { trades } from './trades'

export const addons = platformSchema.table('addons', {
  id: unsafeId,
  label,
  accessor: accessor.unique(),
  description,
  imageUrl,
  tradeId: integer('trade_id')
    .notNull()
    .references(() => trades.id, { onDelete: 'cascade' }),
})

export const addonRelations = relations(addons, ({ one }) => ({
  trade: one(trades, {
    fields: [addons.tradeId],
    references: [trades.id],
  }),
}))

export const selectAddonSchema = createSelectSchema(addons)
export type Addon = z.infer<typeof selectAddonSchema>

export const insertAddonSchema = createInsertSchema(addons).omit({
  id: true,
})
export type InsertAddon = z.infer<typeof insertAddonSchema>

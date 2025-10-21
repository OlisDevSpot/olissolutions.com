import type z from 'zod'

import { accessor, description, imageUrl, label, unsafeId } from '@workspace/db/lib/schema-helpers'
import { relations } from 'drizzle-orm'
import { integer, pgTable } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { upgrades } from './upgrade'

export const addons = pgTable('addon', {
  id: unsafeId,
  label,
  accessor: accessor.unique(),
  description,
  imageUrl,
  upgradeId: integer('upgrade_id')
    .notNull()
    .references(() => upgrades.id, { onDelete: 'cascade' }),
})

export const addonRelations = relations(addons, ({ one }) => ({
  upgrade: one(upgrades, {
    fields: [addons.upgradeId],
    references: [upgrades.id],
  }),
}))

export const selectAddonSchema = createSelectSchema(addons)
export type Addon = z.infer<typeof selectAddonSchema>

export const insertAddonSchema = createInsertSchema(addons).omit({
  id: true,
})
export type InsertAddon = z.infer<typeof insertAddonSchema>

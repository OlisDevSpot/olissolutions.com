import type z from 'zod'

import { unsafeId } from '@workspace/db/lib/schema-helpers'
import {
  integer,
  pgTable,
  real,
  varchar,
} from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { upgrades } from './upgrade'

export const pricing = pgTable('pricing', {
  id: unsafeId,
  key: varchar('key', { length: 80 }).notNull().unique(),
  label: varchar('label', { length: 80 }).notNull(),
  description: varchar('description', { length: 255 }),
  defaultValue: real('default_value').notNull(),
  upgradeId: integer('upgrade_id')
    .references(() => upgrades.id, { onDelete: 'cascade' }),
})

export const selectPricingSchema = createSelectSchema(pricing)
export type Pricing = z.infer<typeof selectPricingSchema>

export const insertPricingSchema = createInsertSchema(pricing).omit({
  id: true,
  upgradeId: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertPricing = z.infer<typeof insertPricingSchema>

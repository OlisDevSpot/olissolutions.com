import type z from 'zod'

import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'

import {
  integer,
  real,
  varchar,
} from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { trades } from './trade'

export const pricing = oneStopSalesSchema.table('pricing', {
  id: unsafeId,
  key: varchar('key', { length: 80 }).notNull().unique(),
  label: varchar('label', { length: 80 }).notNull(),
  description: varchar('description', { length: 255 }),
  defaultValue: real('default_value').notNull(),
  tradeId: integer('trade_id')
    .references(() => trades.id, { onDelete: 'cascade' }),
})

export const selectPricingSchema = createSelectSchema(pricing)
export type Pricing = z.infer<typeof selectPricingSchema>

export const insertPricingSchema = createInsertSchema(pricing).omit({
  id: true,
  tradeId: true,
  createdAt: true,
  updatedAt: true,
})
export type InsertPricing = z.infer<typeof insertPricingSchema>

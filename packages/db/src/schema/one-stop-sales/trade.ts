import type z from 'zod'

import { tradeLocations } from '@olis/core/constants/enums'
import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { accessor, description, imageUrl, label, unsafeId } from '@olis/db/lib/schema-helpers'

import { relations } from 'drizzle-orm'
import { pgEnum, varchar } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { addons } from './addon'
import { solutions } from './solution'
import { x_tradeBenefits } from './x-trade-benefit'

export const locationEnum = pgEnum('location', tradeLocations)

export const trades = oneStopSalesSchema.table('trade', {
  id: unsafeId,
  label,
  accessor: accessor.unique(),
  description,
  imageUrl,
  slug: varchar({ length: 80 }).notNull(),
  location: locationEnum('location').notNull(),
})

export const tradeRelations = relations(trades, ({ many }) => ({
  solutions: many(solutions),
  tradeAddons: many(addons),
  x_tradeBenefits: many(x_tradeBenefits),
}))

export const selectTradeSchema = createSelectSchema(trades)
export type Trade = z.infer<typeof selectTradeSchema>

export const insertTradeSchema = createInsertSchema(trades).omit({
  id: true,
})
export type InsertTrade = z.infer<typeof insertTradeSchema>

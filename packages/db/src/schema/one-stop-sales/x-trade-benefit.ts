import { oneStopSalesSchema } from '@olis/db/lib/constants'
import { unsafeId } from '@olis/db/lib/schema-helpers'

import { relations } from 'drizzle-orm'
import { integer, unique } from 'drizzle-orm/pg-core'
import { benefits } from './benefit'
import { trades } from './trade'

export const x_tradeBenefits = oneStopSalesSchema.table('x_trade_benefit', {
  id: unsafeId,
  tradeId: integer('trade_id')
    .notNull()
    .references(() => trades.id, { onDelete: 'cascade' }),
  benefitId: integer('benefit_id')
    .notNull()
    .references(() => benefits.id, { onDelete: 'cascade' }),
}, table => [
  unique('trade_id_benefit_id_unique').on(table.tradeId, table.benefitId),
])

export const tradeBenefitRelations = relations(
  x_tradeBenefits,
  ({ one }) => ({
    trade: one(trades, {
      fields: [x_tradeBenefits.tradeId],
      references: [trades.id],
    }),
    benefit: one(benefits, {
      fields: [x_tradeBenefits.benefitId],
      references: [benefits.id],
    }),
  }),
)

export type X_TradeBenefit = typeof x_tradeBenefits.$inferSelect
export type X_TradeBenefitInsert = typeof x_tradeBenefits.$inferInsert

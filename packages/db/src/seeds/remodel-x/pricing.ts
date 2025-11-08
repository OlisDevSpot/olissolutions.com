import type { DB } from '@olis/db'

import type { InsertPricing } from '../../schema/remodel-x'
import { pricing } from '../../schema/remodel-x'

import { trades } from '@olis/db/schema/platform'

import { sql } from 'drizzle-orm'
import { pricingData } from './data/pricing'

export default async function seed(db: DB) {
  const allTrades = await db.select().from(trades)

  const mappedPricing: (InsertPricing & { tradeId: number })[] = []

  for (const [tradeAccessor, prices] of Object.entries(pricingData)) {
    if (!prices || prices.length === 0)
      continue

    const tradeEntry = allTrades.find(trade => trade.accessor === tradeAccessor)

    if (!tradeEntry)
      continue

    prices.forEach((price) => {
      mappedPricing.push({
        ...price,
        tradeId: tradeEntry.id,
      })
    })
  }

  await db
    .insert(pricing)
    .values(mappedPricing)
    .onConflictDoUpdate({
      target: pricing.key,
      set: {
        defaultValue: sql`EXCLUDED.default_value`,
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        tradeId: sql`EXCLUDED.trade_id`,
      },
    })
}

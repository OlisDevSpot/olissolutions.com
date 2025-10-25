import type { DB } from '@olis/db'

import type { InsertScope } from '@olis/db/schema/platform'
import type { TradeAccessor } from '@olis/db/types/trades'
import { scopes, trades } from '@olis/db/schema/platform'

import { sql } from 'drizzle-orm'

import { scopesData } from './data/scopes'

export default async function seed(db: DB) {
  const tradeAccessors = Object.keys(scopesData) as TradeAccessor[]
  const mappedScopes: InsertScope[] = []
  const allTrades = await db.select().from(trades)

  for (const tradeAccessor of tradeAccessors) {
    const tradeScopes = scopesData[tradeAccessor]
    const tradeEntry = allTrades.find(trade => trade.accessor === tradeAccessor)

    if (!tradeEntry || tradeScopes.length === 0)
      continue

    for (const scope of tradeScopes) {
      mappedScopes.push({ ...scope, tradeId: tradeEntry.id })
    }
  }

  await db
    .insert(scopes)
    .values(mappedScopes)
    .onConflictDoUpdate({
      target: scopes.accessor,
      set: {
        tradeId: sql`EXCLUDED.trade_id`,
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,
        constructionType: sql`EXCLUDED.construction_type`,
        scopeOfWorkBase: sql`EXCLUDED.scope_of_work_base`,
      },
    })
}

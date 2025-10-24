import type { DB } from '@olis/db'

import type { InsertSolution } from '@olis/db/schema/one-stop-sales'
import type { TradeAccessor } from '@olis/db/types/trades'
import { solutions, trades } from '@olis/db/schema/one-stop-sales'

import { sql } from 'drizzle-orm'

import { solutionsData } from './data/solutions'

export default async function seed(db: DB) {
  const tradeAccessors = Object.keys(solutionsData) as TradeAccessor[]
  const mappedSolutions: InsertSolution[] = []
  const allTrades = await db.select().from(trades)

  for (const tradeAccessor of tradeAccessors) {
    const tradeSolutions = solutionsData[tradeAccessor]
    const tradeEntry = allTrades.find(trade => trade.accessor === tradeAccessor)

    if (!tradeEntry || tradeSolutions.length === 0)
      continue

    for (const solution of tradeSolutions) {
      mappedSolutions.push({ ...solution, tradeId: tradeEntry.id })
    }
  }

  await db
    .insert(solutions)
    .values(mappedSolutions)
    .onConflictDoUpdate({
      target: solutions.accessor,
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

import type { DB } from '@olis/db'

import { addons, trades } from '@olis/db/schema/one-stop-sales/index'

import { eq, sql } from 'drizzle-orm'
import { addonsData } from './data/addons'

export default async function seed(db: DB) {
  const newAddons = await Promise.all(
    addonsData.map(async (addon) => {
      const tradeEntry = await db.query.trades.findFirst({
        where: eq(trades.accessor, addon.tradeAccessor),
      })
      const tradeId = tradeEntry?.id || -1
      return {
        label: addon.label,
        accessor: addon.accessor,
        description: addon.description,
        imageUrl: addon.imageUrl,
        tradeId,
      }
    }),

  )
  await db
    .insert(addons)
    .values(newAddons)
    .onConflictDoUpdate({
      target: addons.accessor,
      set: {
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,
        tradeId: sql`EXCLUDED.trade_id`,
      },
    })
}

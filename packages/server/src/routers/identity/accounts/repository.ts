import { db } from '@olis/db'

import { pricing } from '../../../../../db/dist/schema/remodel-x'
import { trades } from '@olis/db/schema/platform'
import { eq, getTableColumns } from 'drizzle-orm'

export async function findAllPricing() {
  return await db
    .select({ ...getTableColumns(pricing), trade: trades })
    .from(pricing)
    .innerJoin(trades, eq(pricing.tradeId, trades.id))
}

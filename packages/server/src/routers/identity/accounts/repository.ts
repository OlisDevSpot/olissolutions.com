import { db } from '@olis/db'

import {trades} from '@olis/db/schema/platform'
import { pricing } from '@olis/db/schema/one-stop-sales'
import { eq, getTableColumns } from 'drizzle-orm'

export async function findAllPricing() {
  return await db
    .select({ ...getTableColumns(pricing), trade: trades })
    .from(pricing)
    .innerJoin(trades, eq(pricing.tradeId, trades.id))
}

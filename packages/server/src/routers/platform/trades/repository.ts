import type { InsertTrade } from '@olis/db/schema/platform'

import type { TableFilters } from '@olis/server/types'

import type { Column, SQL } from 'drizzle-orm'
import { db } from '@olis/db'

import { addons, scopes, trades } from '@olis/db/schema/platform'
import { and, asc, eq } from 'drizzle-orm'

export async function findAll() {
  return await db
    .select()
    .from(trades)
    .orderBy(asc(trades.label))
}

export async function findOne(id: number) {
  const [trade] = await db.select().from(trades).where(eq(trades.id, id))

  if (!trade) {
    return null
  }

  return trade
}

export async function createOne(data: InsertTrade) {
  const [newTrade] = await db.insert(trades).values(data).returning()

  if (!newTrade) {
    return null
  }

  return newTrade
}

export async function findOneAndUpdate(id: number, data: Partial<InsertTrade>) {
  const [updatedTrade] = await db.update(trades).set(data).where(eq(trades.id, id)).returning()
  return updatedTrade
}

export async function find({ filters }: TableFilters<typeof trades>) {
  const conditions: SQL[] = []

  for (const [key, value] of Object.entries(filters)) {
    const column = trades[key as keyof typeof trades] as Column
    conditions.push(eq(column, value))
  }

  return await db.select().from(trades).where(and(...conditions))
}

export async function deleteOne(id: number) {
  return await db.delete(trades).where(eq(trades.id, id))
}

export async function findAllTradeAddons(tradeId: number) {
  const foundAddonsOfTrade = await db
    .select({ trade: trades, addon: addons })
    .from(trades)
    .leftJoin(addons, eq(addons.tradeId, trades.id))
    .where(eq(trades.id, tradeId))

  const trade = foundAddonsOfTrade[0]?.trade

  // if no trade found, return null (returned from Hono handler as 404)
  if (!trade) {
    return null
  }

  const foundAddons = foundAddonsOfTrade.map(foundAddon => foundAddon.addon).filter(Boolean)

  // if no addons found, return trade with empty addons array -> handle in consumer (not 404)
  if (foundAddons.length === 0) {
    return {
      trade: {
        ...trade,
      },
      addons: [],
    }
  }

  return {
    trade: {
      ...trade,
    },
    addons: foundAddons.map((foundAddon) => {
      return {
        ...foundAddon,
      }
    }),
  }
}

export async function findAllScopesByTradeAccessor(accessor: string) {
  const rows = await db
    .select({
      trade: trades,
      scope: scopes,
    })
    .from(trades)
    .where(eq(trades.accessor, accessor))
    .leftJoin(scopes, eq(scopes.tradeId, trades.id))

  const firstRow = rows[0]
  if (!firstRow) {
    return null
  }

  const tradeScopes = {
    trade: {
      ...firstRow.trade,
    },
    scopes: rows.map((row) => {
      return {
        ...row.scope,
      }
    }),
  }

  return tradeScopes
}

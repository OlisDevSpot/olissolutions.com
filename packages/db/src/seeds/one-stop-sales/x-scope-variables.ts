import type { DB } from '@olis/db'

import type { InsertXScopeVariable } from '@olis/db/schema/one-stop-sales/index'
import type { TradeAccessor } from '@olis/db/types/trades'

import { variables, x_scopeVariables } from '@olis/db/schema/one-stop-sales'
import { scopes } from '@olis/db/schema/platform'

import { sql } from 'drizzle-orm'
import { xScopeVariablesData } from './data/x-scope-variables'

export default async function seed(db: DB) {
  const trades = Object.keys(xScopeVariablesData) as TradeAccessor[]

  const mappedXScopeVariables: InsertXScopeVariable[] = []

  const [allScopes, allVariables] = await Promise.all([
    db.select().from(scopes),
    db.select().from(variables),
  ])

  for (const trade of trades) {
    const tradeVariables = xScopeVariablesData[trade as keyof typeof xScopeVariablesData]
    for (const scopeVariable of tradeVariables) {
      const scopeEntry = allScopes.find(dbScope => dbScope.accessor === scopeVariable.scopeAccessor)
      const variableEntry = allVariables.find(dbVariable => dbVariable.key === scopeVariable.variableKey)

      if (!scopeEntry || !variableEntry)
        continue

      mappedXScopeVariables.push({
        scopeId: scopeEntry.id,
        variableId: variableEntry.id,
      })
    }
  }

  await db
    .insert(x_scopeVariables)
    .values(mappedXScopeVariables)
    .onConflictDoUpdate({
      target: [x_scopeVariables.scopeId, x_scopeVariables.variableId],
      set: {
        scopeId: sql`EXCLUDED.scope_id`,
        variableId: sql`EXCLUDED.variable_id`,
      },
    })
}

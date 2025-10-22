import type { TradeAccessor } from '@olis/db/types/trades'

import type { DB } from '@olis/db'
import type { InsertXSolutionVariable } from '@olis/db/schema/one-stop-sales/index'

import { solutions, variables, x_solutionVariables } from '@olis/db/schema/one-stop-sales/index'

import { sql } from 'drizzle-orm'
import { xSolutionVariablesData } from './data/x-solution-variables'

export default async function seed(db: DB) {
  const trades = Object.keys(xSolutionVariablesData) as TradeAccessor[]

  const mappedXSolutionVariables: InsertXSolutionVariable[] = []

  const [allSolutions, allVariables] = await Promise.all([
    db.select().from(solutions),
    db.select().from(variables),
  ])

  for (const trade of trades) {
    const tradeVariables = xSolutionVariablesData[trade as keyof typeof xSolutionVariablesData]
    for (const solutionVariable of tradeVariables) {
      const solutionEntry = allSolutions.find(dbSolution => dbSolution.accessor === solutionVariable.solutionAccessor)
      const variableEntry = allVariables.find(dbVariable => dbVariable.key === solutionVariable.variableKey)

      if (!solutionEntry || !variableEntry)
        continue

      mappedXSolutionVariables.push({
        solutionId: solutionEntry.id,
        variableId: variableEntry.id,
      })
    }
  }

  await db
    .insert(x_solutionVariables)
    .values(mappedXSolutionVariables)
    .onConflictDoUpdate({
      target: [x_solutionVariables.solutionId, x_solutionVariables.variableId],
      set: {
        solutionId: sql`EXCLUDED.solution_id`,
        variableId: sql`EXCLUDED.variable_id`,
      },
    })
}

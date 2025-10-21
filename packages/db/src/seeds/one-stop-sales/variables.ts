import type { DB } from '@workspace/db'

import type { InsertVariable } from '@workspace/db/schema/one-stop-sales'
import type { UpgradeAccessor } from '@workspace/core/entities/upgrades/types'
import { variables } from '@workspace/db/schema/one-stop-sales'

import { sql } from 'drizzle-orm'

import { variablesData } from './data/variables'

export default async function seed(db: DB) {
  const upgrades = Object.keys(variablesData) as UpgradeAccessor[]

  const mappedVariables: InsertVariable[] = []
  for (const upgrade of upgrades) {
    const upgradeVariables = variablesData[upgrade]
    for (const variable of upgradeVariables) {
      mappedVariables.push({ ...variable })
    }
  }

  await db
    .insert(variables)
    .values(mappedVariables)
    .onConflictDoUpdate({
      target: variables.key,
      set: {
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        dataType: sql`EXCLUDED.data_type`,
        options: sql`EXCLUDED.options`,
      },
    })
}

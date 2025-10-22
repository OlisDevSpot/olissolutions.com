import type { DB } from '@olis/db'

import type { InsertXSolutionMaterial } from '@olis/db/schema/one-stop-sales'
import { materials, solutions, x_solutionMaterials } from '@olis/db/schema/one-stop-sales'

import { sql } from 'drizzle-orm'

import { xSolutionMaterialsData } from './data/x-solution-materials'

export default async function seed(db: DB) {
  const [allSolutions, allMaterials] = await Promise.all(
    [
      db.select().from(solutions),
      db.select().from(materials),
    ],
  )

  const mappedXSolutionMaterials: InsertXSolutionMaterial[] = []

  for (const solutionMaterial of xSolutionMaterialsData) {
    const solutionEntry = allSolutions.find(dbSolution => dbSolution.accessor === solutionMaterial.solutionAccessor)
    const materialEntry = allMaterials.find(dbMaterial => dbMaterial.accessor === solutionMaterial.materialAccessor)

    if (!solutionEntry || !materialEntry)
      continue

    mappedXSolutionMaterials.push({
      solutionId: solutionEntry.id,
      materialId: materialEntry.id,
      isMostPopular: solutionMaterial.isMostPopular,
    })
  }

  return await db
    .insert(x_solutionMaterials)
    .values(mappedXSolutionMaterials)
    .onConflictDoUpdate({
      target: [x_solutionMaterials.solutionId, x_solutionMaterials.materialId],
      set: {
        isMostPopular: sql`EXCLUDED.is_most_popular`,
        solutionId: sql`EXCLUDED.solution_id`,
        materialId: sql`EXCLUDED.material_id`,
      },
    })
}

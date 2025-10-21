import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";
import type { UpgradeAccessor } from "@/shared/entities/upgrades/types";

import type { InsertXSolutionVariable } from "@workspace/db/schema/one-stop-sales/index";

import { solutions, variables, x_solutionVariables } from "@workspace/db/schema/one-stop-sales/index";
import { xSolutionVariablesData } from "./data/x-solution-variables";

export default async function seed(db: DB) {
  const upgrades = Object.keys(xSolutionVariablesData) as UpgradeAccessor[];

  const mappedXSolutionVariables: InsertXSolutionVariable[] = [];

  const [allSolutions, allVariables] = await Promise.all([
    db.select().from(solutions),
    db.select().from(variables),
  ]);

  for (const upgrade of upgrades) {
    const upgradeVariables = xSolutionVariablesData[upgrade as keyof typeof xSolutionVariablesData];
    for (const solutionVariable of upgradeVariables) {
      const solutionEntry = allSolutions.find(dbSolution => dbSolution.accessor === solutionVariable.solutionAccessor);
      const variableEntry = allVariables.find(dbVariable => dbVariable.key === solutionVariable.variableKey);

      if (!solutionEntry || !variableEntry)
        continue;

      mappedXSolutionVariables.push({ 
        solutionId: solutionEntry.id, 
        variableId: variableEntry.id
      });
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
    });
}

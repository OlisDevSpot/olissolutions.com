import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";
import type { SolutionAccessor } from "@/shared/entities/solutions/types";
import type { InsertXSolutionBenefit } from "@/shared/schema";

import { benefits, solutions, x_solutionBenefits } from "@/shared/schema";

import { solutionBenefitsData } from "./data/x-solution-benefits";

export default async function seed(db: DB) {
  const upgradeAccessors = Object.keys(solutionBenefitsData) as (keyof typeof solutionBenefitsData)[]
  
  const [allSolutions, allBenefits] = await Promise.all([
    db.select().from(solutions),
    db.select().from(benefits),
  ])
  
  const mappedXSolutionBenefits: InsertXSolutionBenefit[] = [];
  
  for (const upgradeAccessor of upgradeAccessors) {
    const upgradeSolutions = solutionBenefitsData[upgradeAccessor as keyof typeof solutionBenefitsData];

    for (const [solutionAccessor, benefitsByCategory] of Object.entries(upgradeSolutions)) {
      const solutionEntry = allSolutions.find(dbSolution => dbSolution.accessor === solutionAccessor as SolutionAccessor);

      if (!solutionEntry)
        continue;

      for (const benefits of Object.values(benefitsByCategory) as string[]) {
        for (const benefit of benefits) {
          const benefitEntry = allBenefits.find(dbBenefit => dbBenefit.accessor === benefit);

          if (!benefitEntry)
            continue;

          mappedXSolutionBenefits.push({ 
            solutionId: solutionEntry.id, 
            benefitId: benefitEntry.id,
          });
        }
      }
    }
  }

  await db
    .insert(x_solutionBenefits)
    .values(mappedXSolutionBenefits)
    .onConflictDoUpdate({
      target: [x_solutionBenefits.solutionId, x_solutionBenefits.benefitId],
      set: { 
        solutionId: sql`EXCLUDED.solution_id`,
        benefitId: sql`EXCLUDED.benefit_id`,
      },
    });
}

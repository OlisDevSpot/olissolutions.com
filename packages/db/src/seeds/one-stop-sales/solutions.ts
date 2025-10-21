import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";
import type { UpgradeAccessor } from "@/shared/entities/upgrades/types";
import type { InsertSolution } from "@/shared/schema";

import { solutions, upgrades } from "@/shared/schema";

import { solutionsData } from "./data/solutions";

export default async function seed(db: DB) {
  const upgradeAccessors = Object.keys(solutionsData) as UpgradeAccessor[];
  const mappedSolutions: InsertSolution[] = [];
  const allUpgrades = await db.select().from(upgrades);

  for (const upgradeAccessor of upgradeAccessors) {
    const upgradeSolutions = solutionsData[upgradeAccessor];
    const upgradeEntry = allUpgrades.find(upgrade => upgrade.accessor === upgradeAccessor);

    if (!upgradeEntry || upgradeSolutions.length === 0)
      continue;

    for (const solution of upgradeSolutions) {
      mappedSolutions.push({ ...solution, upgradeId: upgradeEntry.id });
    }
  }

  await db
    .insert(solutions)
    .values(mappedSolutions)
    .onConflictDoUpdate({
      target: solutions.accessor,
      set: { 
        upgradeId: sql`EXCLUDED.upgrade_id`,
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,
        constructionType: sql`EXCLUDED.construction_type`,
        scopeOfWorkBase: sql`EXCLUDED.scope_of_work_base`,
      },
    })
}

import type * as schema from "@/shared/schema";

import db from "@/server/drizzle";
import * as seeds from "@/server/drizzle/seeds";

// eslint-disable-next-line node/no-process-env
const tables = process.env.npm_config_tables as keyof typeof schema;

// seed each table (order is semi-important)
(async () => {
  if (tables) {
    const allTables = tables.split(",")
    try {
      for (const table of allTables) {
        await seeds[table as keyof typeof seeds](db);
      }
    }
    catch (error) {
      console.error("Table not in schema", error);
      process.exit(1);
    }
  }
  else {
    await seeds.upgrades(db);
    await seeds.licenses(db);
    await seeds.solutions(db);
    await seeds.variables(db);
    await seeds.pricing(db);
    await seeds.materials(db);
    await seeds.benefitCategories(db);
    await seeds.benefits(db);
    await seeds.addons(db);
    await seeds.x_materialBenefits(db);
    await seeds.x_solutionBenefits(db);
    await seeds.x_solutionMaterials(db);
    await seeds.x_solutionVariables(db);
  }
})();

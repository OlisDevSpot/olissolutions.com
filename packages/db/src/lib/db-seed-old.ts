import type { Table } from "drizzle-orm";

import { getTableName, sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";

import db from "@/server/drizzle";
import * as seeds from "@/server/drizzle/seeds";
import * as schema from "@/shared/schema";

// define reset function
async function resetTable(db: DB, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE;`),
  );
}

// eslint-disable-next-line node/no-process-env
const tables = process.env.npm_config_tables as keyof typeof schema;

// seed each table (order is semi-important)
(async () => {
  if (tables) {
    const allTables = tables.split(",")
    try {
      for (const table of allTables) {
        await resetTable(db, schema[table as keyof typeof schema] as Table);
        await seeds[table as keyof typeof seeds](db);
      }
    }
    catch (error) {
      console.error("Table not in schema", error);
      process.exit(1);
    }
  }
  else {
    // run reset function for each table
    for (const table of [
      schema.benefitCategories,
      schema.licenses,
      schema.x_materialBenefits,
      schema.benefits,
      schema.materials,
      schema.addons,
      schema.solutions,
      schema.upgrades,
      schema.variables,
      schema.pricing,
      schema.x_materialBenefits,
      schema.x_solutionBenefits,
      schema.x_solutionMaterials,
      schema.x_solutionVariables,
    ]) {
      await resetTable(db, table);
    }

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

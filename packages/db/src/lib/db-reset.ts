import type { Table } from "drizzle-orm";

import { getTableName, sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";

import db from "@/server/drizzle";
import * as schema from "@/shared/schema";

async function resetTable(db: DB, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE "${getTableName(table)}" RESTART IDENTITY CASCADE;`));
}

async function deleteTable(db: DB, table: Table) {
  return db.execute(sql.raw(`DROP TABLE IF EXISTS "${getTableName(table)}" CASCADE;`));
}

const dynamicTables = [
  schema.customers,
  schema.projects,
  schema.jobsiteProfiles,
  schema.jobsiteRoofs,
  schema.financialProfiles,
  schema.x_projectCustomers,
  schema.x_projectSolutions,
];

const coreTables = [
  schema.addons,
  schema.benefitCategories,
  schema.benefits,
  schema.materials,
  schema.solutions,
  schema.upgrades,
  schema.variables,
  schema.licenses,
  schema.x_materialBenefits,
  schema.x_solutionMaterials,
  schema.x_upgradeBenefits,
];

// eslint-disable-next-line node/no-process-env
const tables = process.env.npm_config_dynamic === "true" ? dynamicTables : coreTables;

// eslint-disable-next-line node/no-process-env
const action = process.env.npm_config_drop === "true" ? deleteTable : resetTable;

(async () => {
  // run reset function for each table
  for (const table of tables) {
    await action(db, table);
  }
})();

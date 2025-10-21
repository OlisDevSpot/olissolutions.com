import { eq, getTableColumns } from "drizzle-orm";

import db from "@/server/drizzle";
import { pricing, upgrades } from "@/shared/schema";

export async function findAllPricing() {
  return await db
    .select({ ...getTableColumns(pricing), upgrade: upgrades })
    .from(pricing)
    .innerJoin(upgrades, eq(pricing.upgradeId, upgrades.id));
}

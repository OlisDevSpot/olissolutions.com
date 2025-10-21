import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";
import type { InsertPricing } from "@/shared/schema";

import { pricing, upgrades } from "@/shared/schema";

import { pricingData } from "./data/pricing";

export default async function seed(db: DB) {
  const allUpgrades = await db.select().from(upgrades);

  const mappedPricing: (InsertPricing & { upgradeId: number })[] = [];

  for (const [upgradeAccessor, prices] of Object.entries(pricingData)) {
    if (!prices || prices.length === 0)
      continue;
    
    const upgradeEntry = allUpgrades.find(upgrade => upgrade.accessor === upgradeAccessor);

    if (!upgradeEntry)
      continue;

    prices.forEach((price) => { 
      mappedPricing.push({
        ...price, 
        upgradeId: upgradeEntry.id
      })
    });
  }

  await db
    .insert(pricing)
    .values(mappedPricing)
    .onConflictDoUpdate({
      target: pricing.key,
      set: { 
        defaultValue: sql`EXCLUDED.default_value`,
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        upgradeId: sql`EXCLUDED.upgrade_id`,
      },
    })
}

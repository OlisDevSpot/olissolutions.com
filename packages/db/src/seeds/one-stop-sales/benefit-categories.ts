import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";

import { benefitCategories } from "@workspace/db/schema/one-stop-sales/index";
import { benefitCategoriesData } from "./data/benefit-categories";

export default async function seed(db: DB) {
  await db
    .insert(benefitCategories)
    .values(benefitCategoriesData)
    .onConflictDoUpdate({
      target: benefitCategories.accessor,
      set: { 
        label: sql`EXCLUDED.label`,
      },
    });
}

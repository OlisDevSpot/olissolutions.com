import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";

import { upgrades } from "@/shared/schema";

import { upgradesData } from "./data/upgrades";

export default async function seed(db: DB) {
  await db
    .insert(upgrades)
    .values(upgradesData)
    .onConflictDoUpdate({ 
      target: upgrades.accessor, 
      set: { 
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,
        location: sql`EXCLUDED.location`,
        slug: sql`EXCLUDED.slug`,
      }
    });
}

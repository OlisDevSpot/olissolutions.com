import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";

import { materials } from "@/shared/schema";

import { materialsData } from "./data/materials";

export default async function seed(db: DB) {
  await db
    .insert(materials)
    .values(materialsData)
    .onConflictDoUpdate({
      target: [materials.accessor],
      set: { 
        label: sql`EXCLUDED.label`,
        description: sql`EXCLUDED.description`,
        imageUrl: sql`EXCLUDED.image_url`,
        lifespan: sql`EXCLUDED.lifespan`,
        warranty: sql`EXCLUDED.warranty`,
      },
    })
}

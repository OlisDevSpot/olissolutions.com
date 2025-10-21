import { sql } from "drizzle-orm";

import type { DB } from "@/server/drizzle";

import { licenses } from "@workspace/db/schema/one-stop-sales/index";
import { LICENSE_TYPE_MAP } from "./data/licenses";

export default async function seed(db: DB) {
  const licensesData = Object.entries(LICENSE_TYPE_MAP).map(([code, label]) => ({
    code,
    label,
  }));
  await db
    .insert(licenses)
    .values(licensesData)
    .onConflictDoUpdate({
      target: licenses.code,
      set: { 
        label: sql`EXCLUDED.label`,
      },
    })
}

import { eq } from "drizzle-orm";

import db from "@/server/drizzle";
import { addons } from "@/shared/schema";

export async function findAll() {
  return await db
    .select()
    .from(addons);
}

export async function findOne(id: number) {
  const [addon] = await db
    .select()
    .from(addons)
    .where(eq(addons.id, id));
  return addon;
}

export async function findOneByAccessor(accessor: string) {
  const [addon] = await db
    .select()
    .from(addons)
    .where(eq(addons.accessor, accessor));
  return addon;
}

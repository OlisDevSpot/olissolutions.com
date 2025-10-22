import { db } from '@olis/db'

import { addons } from '@olis/db/schema/one-stop-sales'
import { eq } from 'drizzle-orm'

export async function findAll() {
  return await db
    .select()
    .from(addons)
}

export async function findOne(id: number) {
  const [addon] = await db
    .select()
    .from(addons)
    .where(eq(addons.id, id))
  return addon
}

export async function findOneByAccessor(accessor: string) {
  const [addon] = await db
    .select()
    .from(addons)
    .where(eq(addons.accessor, accessor))
  return addon
}

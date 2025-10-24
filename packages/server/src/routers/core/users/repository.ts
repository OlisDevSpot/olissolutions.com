import type { InsertUser } from '../../../../../db/dist/schema/platform'

import { db } from '@olis/db'

import { user } from '../../../../../db/dist/schema/platform'
import { eq } from 'drizzle-orm'

export async function findAll() {
  return await db.select().from(user)
}

export async function findOne(id: string) {
  const [note] = await db.select().from(user).where(eq(user.id, id))
  return note
}

export async function findOneAndUpdate(id: string, data: Partial<InsertUser>) {
  const [updatedNote] = await db.update(user).set(data).where(eq(user.id, id)).returning()
  return updatedNote
}

export async function deleteOne(id: string) {
  return await db.delete(user).where(eq(user.id, id))
}

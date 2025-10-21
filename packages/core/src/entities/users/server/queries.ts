import { eq } from "drizzle-orm";

import type { InsertUser } from "@/shared/schema";

import db from "@/server/drizzle";
import { user } from "@/shared/schema";

export async function findAll() {
  return await db.select().from(user);
}

export async function findOne(id: string) {
  const [note] = await db.select().from(user).where(eq(user.id, id));
  return note;
}

export async function findOneAndUpdate(id: string, data: Partial<InsertUser>) {
  const [updatedNote] = await db.update(user).set(data).where(eq(user.id, id)).returning();
  return updatedNote;
}

export async function deleteOne(id: string) {
  return await db.delete(user).where(eq(user.id, id));
}

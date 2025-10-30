import type { InsertXSubscription } from '@olis/db/schema/identity'
import { db } from '@olis/db'
import { xSubscriptions } from '@olis/db/schema/identity'
import { and, eq } from 'drizzle-orm'

export async function findAll(userId: string) {
  const subscriptions = await db
    .select()
    .from(xSubscriptions)
    .where(eq(xSubscriptions.userId, userId))

  return subscriptions
}

export async function findOne(userId: string, solutionId: number) {
  const [subscription] = await db
    .select()
    .from(xSubscriptions)
    .where(
      and(
        eq(xSubscriptions.userId, userId),
        eq(xSubscriptions.solutionId, solutionId),
      ),
    )

  return subscription
}

export async function create(data: InsertXSubscription) {
  const newSubscription = await db
    .insert(xSubscriptions)
    .values(data)
    .returning()

  return newSubscription
}

export async function update(userId: string, data: Partial<InsertXSubscription>) {
  const updatedSubscription = await db
    .update(xSubscriptions)
    .set(data)
    .where(eq(xSubscriptions.userId, userId))
    .returning()

  return updatedSubscription
}

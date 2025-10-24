import type { InsertCustomerSchema } from '@olis/db/schema/core'

import { db } from '@olis/db'
import { customers } from '@olis/db/schema/core'
import { fullAddress, x_projectCustomers } from '@olis/db/schema/one-stop-sales'
import { eq, getTableColumns } from 'drizzle-orm'

export async function findOne(userId: string, id: string) {
  const [customer] = await db
    .select({ ...getTableColumns(customers), fullAddress })
    .from(customers)
    .where(eq(customers.id, id))

  return customer
}

export async function findAll(_userId: string) {
  return await db
    .select()
    .from(customers)
}

export async function findAllByProjectId(projectId: string) {
  const foundCustomers = await db
    .select({ customer: customers, isPrimary: x_projectCustomers.isPrimary })
    .from(x_projectCustomers)
    .where(eq(x_projectCustomers.projectId, projectId))
    .leftJoin(customers, eq(customers.id, x_projectCustomers.customerId))

  return foundCustomers
}

export async function createOne(data: InsertCustomerSchema) {
  const [newCustomer] = await db
    .insert(customers)
    .values({ ...data })
    .returning()

  if (!newCustomer) {
    return null
  }

  return newCustomer
}

export async function findOneAndUpdate(id: string, data: Partial<InsertCustomerSchema>) {
  const [updatedCustomer] = await db
    .update(customers)
    .set(data)
    .where(eq(customers.id, id))
    .returning()
  return updatedCustomer
}

export async function deleteOne(id: string) {
  const [deletedCustomer] = await db
    .delete(customers)
    .where(eq(customers.id, id))
    .returning()

  return deletedCustomer
}

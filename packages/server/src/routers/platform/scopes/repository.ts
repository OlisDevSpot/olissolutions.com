import type { Benefit, InsertScopeSchema, Scope } from '@olis/db/schema/platform'

import type { TableFilters } from '@olis/server/types'

import type { Column, SQL } from 'drizzle-orm'
import { db } from '@olis/db'

import { benefitCategories, benefits, scopes, trades, x_scopeBenefits } from '@olis/db/schema/platform'
import { variables, x_projectScopes, x_scopeVariables } from '@olis/db/schema/remodel-x'
import { and, asc, eq, getTableColumns } from 'drizzle-orm'

export async function findAll() {
  return await db
    .select()
    .from(scopes)
    .orderBy(asc(scopes.label))
}

export async function findAllByTradeId(tradeId: number) {
  return await db.select().from(scopes).where(eq(scopes.tradeId, tradeId))
}

export async function findAllWithBenefits() {
  const rows = await db
    .select({ scope: scopes, benefit: benefits })
    .from(scopes)
    .innerJoin(x_scopeBenefits, eq(scopes.id, x_scopeBenefits.scopeId))
    .innerJoin(benefits, eq(x_scopeBenefits.benefitId, benefits.id))
    .innerJoin(benefitCategories, eq(benefits.categoryId, benefitCategories.id))

  const map = new Map<number, Scope & { benefits: Benefit[] }>()

  for (const row of rows) {
    if (!map.has(row.scope.id)) {
      map.set(row.scope.id, {
        ...row.scope,
        benefits: [],
      })
    }
    map.get(row.scope.id)!.benefits.push(row.benefit)
  }

  return Array.from(map.values())
}

export async function findOne(id: number) {
  const [scope] = await db
    .select()
    .from(scopes)
    .where(eq(scopes.id, id))

  if (!scope) {
    return null
  }

  return scope
}

export async function findOneByAccessor(accessor: string) {
  const [scope] = await db
    .select()
    .from(scopes)
    .where(eq(scopes.accessor, accessor))

  if (!scope) {
    return null
  }

  return scope
}

export async function findAllByProjectId(projectId: string) {
  const foundScopes = await db
    .select({ scope: scopes, trade: trades, variables: x_projectScopes.variablesData })
    .from(x_projectScopes)
    .where(eq(x_projectScopes.projectId, projectId))
    .innerJoin(scopes, eq(scopes.id, x_projectScopes.scopeId))
    .innerJoin(trades, eq(scopes.tradeId, trades.id))

  return foundScopes
}

export async function createOne(data: InsertScopeSchema) {
  const [newScope] = await db.insert(scopes).values(data).returning()

  if (!newScope) {
    return null
  }

  return newScope
}

export async function findScopeVariables(scopeId: number) {
  const scopeVariables = await db
    .select({ ...getTableColumns(variables) })
    .from(x_scopeVariables)
    .where(eq(x_scopeVariables.scopeId, scopeId))
    .innerJoin(variables, eq(variables.id, x_scopeVariables.variableId))

  return scopeVariables
}

export async function findScopeBenefits(id: number) {
  const foundBenefits = await db
    .select({ ...getTableColumns(benefits), category: { ...getTableColumns(benefitCategories) } })
    .from(x_scopeBenefits)
    .where(eq(x_scopeBenefits.scopeId, id))
    .innerJoin(benefits, eq(benefits.id, x_scopeBenefits.benefitId))
    .innerJoin(benefitCategories, eq(benefits.categoryId, benefitCategories.id))

  return foundBenefits
}

export async function findOneAndUpdate(id: number, data: Partial<InsertScopeSchema>) {
  const [updatedScope] = await db.update(scopes).set(data).where(eq(scopes.id, id)).returning()
  return updatedScope
}

export async function find({ filters }: TableFilters<typeof scopes>) {
  const conditions: SQL[] = []

  for (const [key, value] of Object.entries(filters)) {
    const column = scopes[key as keyof typeof scopes] as Column
    conditions.push(eq(column, value))
  }
  return await db.select().from(scopes).where(and(...conditions))
}

export async function deleteOne(id: number) {
  return await db.delete(scopes).where(eq(scopes.id, id))
}

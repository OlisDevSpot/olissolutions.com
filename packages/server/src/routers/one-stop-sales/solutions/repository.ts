import type { Benefit, InsertSolutionSchema, Solution } from '@olis/db/schema/one-stop-sales'

import type { TableFilters } from '@olis/server/types'

import type { Column, SQL } from 'drizzle-orm'
import { db } from '@olis/db'

import { benefitCategories, benefits, solutions, trades, variables, x_projectSolutions, x_solutionBenefits } from '@olis/db/schema/one-stop-sales'
import { x_solutionVariables } from '@olis/db/schema/one-stop-sales/x-scope-variables'
import { and, asc, eq, getTableColumns } from 'drizzle-orm'

export async function findAll() {
  return await db
    .select()
    .from(solutions)
    .orderBy(asc(solutions.label))
}

export async function findAllByTradeId(tradeId: number) {
  return await db.select().from(solutions).where(eq(solutions.tradeId, tradeId))
}

export async function findAllWithBenefits() {
  const rows = await db
    .select({ solution: solutions, benefit: benefits })
    .from(solutions)
    .innerJoin(x_solutionBenefits, eq(solutions.id, x_solutionBenefits.solutionId))
    .innerJoin(benefits, eq(x_solutionBenefits.benefitId, benefits.id))
    .innerJoin(benefitCategories, eq(benefits.categoryId, benefitCategories.id))

  const map = new Map<number, Solution & { benefits: Benefit[] }>()

  for (const row of rows) {
    if (!map.has(row.solution.id)) {
      map.set(row.solution.id, {
        ...row.solution,
        benefits: [],
      })
    }
    map.get(row.solution.id)!.benefits.push(row.benefit)
  }

  return Array.from(map.values())
}

export async function findOne(id: number) {
  const [solution] = await db
    .select()
    .from(solutions)
    .where(eq(solutions.id, id))

  if (!solution) {
    return null
  }

  return solution
}

export async function findOneByAccessor(accessor: string) {
  const [solution] = await db
    .select()
    .from(solutions)
    .where(eq(solutions.accessor, accessor))

  if (!solution) {
    return null
  }

  return solution
}

export async function findAllByProjectId(projectId: string) {
  const foundSolutions = await db
    .select({ solution: solutions, trade: trades, variables: x_projectSolutions.variablesData })
    .from(x_projectSolutions)
    .where(eq(x_projectSolutions.projectId, projectId))
    .innerJoin(solutions, eq(solutions.id, x_projectSolutions.solutionId))
    .innerJoin(trades, eq(solutions.tradeId, trades.id))

  return foundSolutions
}

export async function createOne(data: InsertSolutionSchema) {
  const [newSolution] = await db.insert(solutions).values(data).returning()

  if (!newSolution) {
    return null
  }

  return newSolution
}

export async function findSolutionVariables(solutionId: number) {
  const solutionVariables = await db
    .select({ ...getTableColumns(variables) })
    .from(x_solutionVariables)
    .where(eq(x_solutionVariables.solutionId, solutionId))
    .innerJoin(variables, eq(variables.id, x_solutionVariables.variableId))

  return solutionVariables
}

export async function findSolutionBenefits(id: number) {
  const foundBenefits = await db
    .select({ ...getTableColumns(benefits), category: { ...getTableColumns(benefitCategories) } })
    .from(x_solutionBenefits)
    .where(eq(x_solutionBenefits.solutionId, id))
    .innerJoin(benefits, eq(benefits.id, x_solutionBenefits.benefitId))
    .innerJoin(benefitCategories, eq(benefits.categoryId, benefitCategories.id))

  return foundBenefits
}

export async function findOneAndUpdate(id: number, data: Partial<InsertSolutionSchema>) {
  const [updatedSolution] = await db.update(solutions).set(data).where(eq(solutions.id, id)).returning()
  return updatedSolution
}

export async function find({ filters }: TableFilters<typeof solutions>) {
  const conditions: SQL[] = []

  for (const [key, value] of Object.entries(filters)) {
    const column = solutions[key as keyof typeof solutions] as Column
    conditions.push(eq(column, value))
  }
  return await db.select().from(solutions).where(and(...conditions))
}

export async function deleteOne(id: number) {
  return await db.delete(solutions).where(eq(solutions.id, id))
}

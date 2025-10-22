import type { PsychologyConcept, SolutionWithPsychologyConcepts } from '../types'
import { db } from '@olis/db'
import {
  psychologyConcepts,
  solutions,
  xSolutionsPsychologyConcepts,
} from '@olis/db/schema/core'
import { eq, inArray } from 'drizzle-orm'

export async function getAllSolutions(): Promise<
  SolutionWithPsychologyConcepts[]
> {
  const result = await db
    .select({
      id: solutions.id,
      name: solutions.name,
      description: solutions.description,
      whatItDoes: solutions.whatItDoes,
      howItHelps: solutions.howItHelps,
      easeOfUse: solutions.easeOfUse,
      pricePerMonth: solutions.pricePerMonth,
      isFeatured: solutions.isFeatured,
      psychologyConceptId: psychologyConcepts.id,
      psychologyConceptLabel: psychologyConcepts.label,
      psychologyConceptAccessor: psychologyConcepts.accessor,
      psychologyConceptDescription: psychologyConcepts.description,
    })
    .from(solutions)
    .leftJoin(
      xSolutionsPsychologyConcepts,
      eq(solutions.id, xSolutionsPsychologyConcepts.solutionId),
    )
    .leftJoin(
      psychologyConcepts,
      eq(
        xSolutionsPsychologyConcepts.psychologyConceptId,
        psychologyConcepts.id,
      ),
    )

  // Group by solution and aggregate psychology concepts
  const solutionMap = new Map<string, SolutionWithPsychologyConcepts>()

  result.forEach((row) => {
    if (!solutionMap.has(row.id)) {
      solutionMap.set(row.id, {
        id: row.id,
        name: row.name,
        description: row.description,
        whatItDoes: row.whatItDoes,
        howItHelps: row.howItHelps,
        easeOfUse: row.easeOfUse as 'easy' | 'moderate' | 'advanced',
        pricePerMonth: row.pricePerMonth,
        isFeatured: row.isFeatured,
        psychologyConcepts: [],
      })
    }

    const solution = solutionMap.get(row.id)!
    if (
      row.psychologyConceptId
      && !solution.psychologyConcepts.some(
        pc => pc.id === row.psychologyConceptId,
      )
    ) {
      solution.psychologyConcepts.push({
        id: row.psychologyConceptId,
        label: row.psychologyConceptLabel!,
        accessor: row.psychologyConceptAccessor!,
        description: row.psychologyConceptDescription!,
      })
    }
  })

  return Array.from(solutionMap.values())
}

export async function getSolutionById(
  id: string,
): Promise<SolutionWithPsychologyConcepts | null> {
  const result = await db
    .select({
      id: solutions.id,
      name: solutions.name,
      description: solutions.description,
      whatItDoes: solutions.whatItDoes,
      howItHelps: solutions.howItHelps,
      easeOfUse: solutions.easeOfUse,
      pricePerMonth: solutions.pricePerMonth,
      isFeatured: solutions.isFeatured,
      psychologyConceptId: psychologyConcepts.id,
      psychologyConceptLabel: psychologyConcepts.label,
      psychologyConceptAccessor: psychologyConcepts.accessor,
      psychologyConceptDescription: psychologyConcepts.description,
    })
    .from(solutions)
    .leftJoin(
      xSolutionsPsychologyConcepts,
      eq(solutions.id, xSolutionsPsychologyConcepts.solutionId),
    )
    .leftJoin(
      psychologyConcepts,
      eq(
        xSolutionsPsychologyConcepts.psychologyConceptId,
        psychologyConcepts.id,
      ),
    )
    .where(eq(solutions.id, id))

  if (result.length === 0) {
    return null
  }

  const firstRow = result[0]

  if (!firstRow) {
    return null
  }

  const solution: SolutionWithPsychologyConcepts = {
    id: firstRow.id,
    name: firstRow.name,
    description: firstRow.description,
    whatItDoes: firstRow.whatItDoes,
    howItHelps: firstRow.howItHelps,
    easeOfUse: firstRow.easeOfUse as 'easy' | 'moderate' | 'advanced',
    pricePerMonth: firstRow.pricePerMonth,
    isFeatured: firstRow.isFeatured,
    psychologyConcepts: [],
  }

  // Add psychology concepts
  result.forEach((row) => {
    if (
      row.psychologyConceptId
      && !solution.psychologyConcepts.some(
        pc => pc.id === row.psychologyConceptId,
      )
    ) {
      solution.psychologyConcepts.push({
        id: row.psychologyConceptId,
        label: row.psychologyConceptLabel!,
        accessor: row.psychologyConceptAccessor!,
        description: row.psychologyConceptDescription!,
      })
    }
  })

  return solution
}

export async function getSolutionsByPsychologyConcepts(
  conceptAccessors: string[],
): Promise<SolutionWithPsychologyConcepts[]> {
  const conceptIds = await db
    .select({ id: psychologyConcepts.id })
    .from(psychologyConcepts)
    .where(inArray(psychologyConcepts.accessor, conceptAccessors))

  if (conceptIds.length === 0)
    return []

  const solutionIds = await db
    .select({ solutionId: xSolutionsPsychologyConcepts.solutionId })
    .from(xSolutionsPsychologyConcepts)
    .where(
      inArray(
        xSolutionsPsychologyConcepts.psychologyConceptId,
        conceptIds.map(c => c.id),
      ),
    )

  if (solutionIds.length === 0)
    return []

  const result = await db
    .select({
      id: solutions.id,
      name: solutions.name,
      description: solutions.description,
      whatItDoes: solutions.whatItDoes,
      howItHelps: solutions.howItHelps,
      easeOfUse: solutions.easeOfUse,
      pricePerMonth: solutions.pricePerMonth,
      isFeatured: solutions.isFeatured,
      psychologyConceptId: psychologyConcepts.id,
      psychologyConceptLabel: psychologyConcepts.label,
      psychologyConceptAccessor: psychologyConcepts.accessor,
      psychologyConceptDescription: psychologyConcepts.description,
    })
    .from(solutions)
    .leftJoin(
      xSolutionsPsychologyConcepts,
      eq(solutions.id, xSolutionsPsychologyConcepts.solutionId),
    )
    .leftJoin(
      psychologyConcepts,
      eq(
        xSolutionsPsychologyConcepts.psychologyConceptId,
        psychologyConcepts.id,
      ),
    )
    .where(
      inArray(
        solutions.id,
        solutionIds.map(s => s.solutionId),
      ),
    )

  // Group by solution and aggregate psychology concepts
  const solutionMap = new Map<string, SolutionWithPsychologyConcepts>()

  result.forEach((row) => {
    if (!solutionMap.has(row.id)) {
      solutionMap.set(row.id, {
        id: row.id,
        name: row.name,
        description: row.description,
        whatItDoes: row.whatItDoes,
        howItHelps: row.howItHelps,
        easeOfUse: row.easeOfUse as 'easy' | 'moderate' | 'advanced',
        pricePerMonth: row.pricePerMonth,
        isFeatured: row.isFeatured,
        psychologyConcepts: [],
      })
    }

    const solution = solutionMap.get(row.id)!
    if (
      row.psychologyConceptId
      && !solution.psychologyConcepts.some(
        pc => pc.id === row.psychologyConceptId,
      )
    ) {
      solution.psychologyConcepts.push({
        id: row.psychologyConceptId,
        label: row.psychologyConceptLabel!,
        accessor: row.psychologyConceptAccessor!,
        description: row.psychologyConceptDescription!,
      })
    }
  })

  return Array.from(solutionMap.values())
}

export async function getAllPsychologyConcepts(): Promise<PsychologyConcept[]> {
  return await db.select().from(psychologyConcepts)
}

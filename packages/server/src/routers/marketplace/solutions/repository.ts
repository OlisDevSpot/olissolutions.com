import type { PsychologyConcept, Solution } from '@olis/db/schema/marketplace'
import type { SQL } from 'drizzle-orm'
import { db } from '@olis/db'
import { psychologyConcepts, solutions, xSolutionPsychologyConcepts } from '@olis/db/schema/marketplace'
import { and, eq } from 'drizzle-orm'

export async function findAll(options: { isActive?: boolean } = {}) {
  console.log('running db...')
  const filters: SQL[] = []

  if (options.isActive) {
    filters.push(eq(solutions.isActive, options.isActive))
  }

  const foundSolutions = await db
    .select({ solution: solutions, psychologyConcept: psychologyConcepts })
    .from(solutions)
    .where(
      and(
        ...filters,
      ),
    )
    .leftJoin(
      xSolutionPsychologyConcepts,
      eq(
        solutions.id,
        xSolutionPsychologyConcepts.solutionId,
      ),
    )
    .leftJoin(
      psychologyConcepts,
      eq(
        xSolutionPsychologyConcepts.psychologyConceptId,
        psychologyConcepts.id,
      ),

    )

  console.log({ foundSolutions })

  const mappedSolutions = foundSolutions.reduce((acc, cur) => {
    const solutionId = cur.solution.id

    if (!acc[solutionId]) {
      acc[solutionId] = {
        ...cur.solution,
        psychologyConcepts: [],
      }
    }
    if (cur.psychologyConcept) {
      acc[solutionId].psychologyConcepts.push(cur.psychologyConcept)
    }

    return acc
  }, {} as Record<number, Solution & { psychologyConcepts: PsychologyConcept[] }>)

  const mappedSolutionsArray = Object.values(mappedSolutions)

  return mappedSolutionsArray
}

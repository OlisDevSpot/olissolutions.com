import type db from '..'
import type {
  EaseOfUse,
} from '../schema'
import { eq } from 'drizzle-orm'
import {
  psychologyConcepts,
  solutions,
  xSolutionsPsychologyConcepts,
} from '../schema'
import solutionsData from './data/solutions.json'

export default async function seed(db: db) {
  await Promise.all(
    solutionsData.map(async (rawSolution) => {
      const { easeOfUse, ...rest } = rawSolution
      const solution = { easeOfUse, ...rest } as {
        easeOfUse: EaseOfUse
      } & Omit<typeof rawSolution, 'easeOfUse'>

      const [newSolution] = await db
        .insert(solutions)
        .values(solution)
        .returning()

      if (solution.salesPsychologyConcepts.length > 0) {
        const concepts = await Promise.all(
          solution.salesPsychologyConcepts.map(async (conceptAccessor) => {
            const [concept] = await db
              .select()
              .from(psychologyConcepts)
              .where(eq(psychologyConcepts.accessor, conceptAccessor))

            return {
              solutionId: newSolution.id,
              psychologyConceptId: concept.id,
            }
          }),
        )

        await db
          .insert(xSolutionsPsychologyConcepts)
          .values(concepts)
          .returning()
      }
    }),
  )
}

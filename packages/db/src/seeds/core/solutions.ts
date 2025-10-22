import type {
  EaseOfUse,
} from '@olis/core/types'
import type { DB } from '@olis/db'
import {
  psychologyConcepts,
  solutions,
  xSolutionsPsychologyConcepts,
} from '@olis/db/schema/core'
import { eq } from 'drizzle-orm'
import { solutionsData } from './data/solutions'

export default async function seed(db: DB) {
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

      if (solution.salesPsychologyConcepts.length > 0 && newSolution) {
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

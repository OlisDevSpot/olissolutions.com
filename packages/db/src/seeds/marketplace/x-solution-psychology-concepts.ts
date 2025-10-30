import type { DB } from '@olis/db'
import type { InsertXSolutionPsychologyConcept } from '@olis/db/schema/marketplace'
import { psychologyConcepts, solutions, xSolutionPsychologyConcepts } from '@olis/db/schema/marketplace'
import { xSolutionPsychologyConceptsData } from './data/x-solution-psychology-concepts'

export default async function seed(db: DB) {
  const [allSolutions, allPsychologyConcepts] = await Promise.all([
    db.select().from(solutions),
    db.select().from(psychologyConcepts),
  ])

  const mappedXSolutionPsychologyConcepts: InsertXSolutionPsychologyConcept[] = []

  for (const { solutionSlug, psychologyConcepts } of xSolutionPsychologyConceptsData) {
    const solution = allSolutions.find(s => s.slug === solutionSlug)

    for (const psychologyConcept of psychologyConcepts) {
      const psychologyConceptId = allPsychologyConcepts.find(pc => pc.accessor === psychologyConcept)?.id

      if (solution && psychologyConceptId) {
        mappedXSolutionPsychologyConcepts.push({
          solutionId: solution.id,
          psychologyConceptId,
        })
      }
    }
  }

  await db.insert(xSolutionPsychologyConcepts).values(mappedXSolutionPsychologyConcepts)
}

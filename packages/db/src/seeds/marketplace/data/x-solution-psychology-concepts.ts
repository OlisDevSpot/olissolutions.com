import type { PsychologyConceptsAccessor } from '@olis/db/types/marketplace/psychology-concepts'
import type { SolutionSlug } from '@olis/db/types/marketplace/solutions'

export const xSolutionPsychologyConceptsData = [
  {
    solutionSlug: 'one-stop-sales',
    psychologyConcepts: [
      'authority',
    ],
  },
  {
    solutionSlug: 'automatic-texts',
    psychologyConcepts: [
      'authority',
      'socialProof',
      'priceAnchoring',
    ],
  },
] as const satisfies { solutionSlug: SolutionSlug, psychologyConcepts: PsychologyConceptsAccessor[] }[]

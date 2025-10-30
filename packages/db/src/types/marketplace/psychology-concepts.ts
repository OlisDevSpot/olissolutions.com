import type { psychologyConceptsData } from '@olis/db/seeds/marketplace/data/psychologyConcepts'

export type PsychologyConceptsAccessor = (typeof psychologyConceptsData)[number]['accessor']

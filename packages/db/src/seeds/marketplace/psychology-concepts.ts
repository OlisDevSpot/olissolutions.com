import type { DB } from '@olis/db'
import { psychologyConcepts } from '@olis/db/schema/marketplace'
import { psychologyConceptsData } from './data/psychologyConcepts'

export default function seed(db: DB) {
  return db
    .insert(psychologyConcepts)
    .values(psychologyConceptsData)
    .returning()
}

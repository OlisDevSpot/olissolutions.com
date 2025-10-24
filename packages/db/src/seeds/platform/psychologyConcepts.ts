import type { DB } from '@olis/db'
import { psychologyConcepts } from 'dist/schema/platform'
import { psychologyConceptsData } from './data/psychologyConcepts'

export default function seed(db: DB) {
  return db
    .insert(psychologyConcepts)
    .values(psychologyConceptsData)
    .returning()
}

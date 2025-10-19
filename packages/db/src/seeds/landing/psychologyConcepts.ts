import type { DB } from '@/db'
import { psychologyConcepts } from '@/schema/landing'
import psychologyConceptsData from './data/psychologyConcepts.json'

export default function seed(db: DB) {
  return db
    .insert(psychologyConcepts)
    .values(psychologyConceptsData)
    .returning()
}

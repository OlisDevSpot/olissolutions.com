import { db } from '@olis/db'
import { solutions } from 'dist/schema/platform'
import { solutionsData } from './data/solutions'

export default async function seedSolutions() {
  await db.insert(solutions).values(solutionsData)
}

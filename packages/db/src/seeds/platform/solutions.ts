import type { DB } from '@olis/db'

import { solutions } from '@olis/db/schema/platform'
import { solutionsData } from './data/solutions'

export default async function seedSolutions(db: DB) {
  await db.insert(solutions).values(solutionsData)
}

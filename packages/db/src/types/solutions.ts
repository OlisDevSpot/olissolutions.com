import type { TableOptions } from '@olis/core/types'
import type { solutionsData } from '@olis/db/seeds/one-stop-sales/data/solutions'

export type SolutionAccessor = typeof solutionsData[keyof typeof solutionsData][number]['accessor']
export type SolutionAccessorOfTrade<T extends keyof typeof solutionsData> = typeof solutionsData[T][number]['accessor']

export type JoinTableAccessors = 'benefits' | 'variables'

export type SolutionsTableOptions = TableOptions<JoinTableAccessors>

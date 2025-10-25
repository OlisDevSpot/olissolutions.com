import type { TableOptions } from '@olis/core/types'
import type { scopesData } from '@olis/db/seeds/platform/data/scopes'

export type ScopeAccessor = typeof scopesData[keyof typeof scopesData][number]['accessor']
export type ScopeAccessorOfTrade<T extends keyof typeof scopesData> = typeof scopesData[T][number]['accessor']

export type JoinTableAccessors = 'benefits' | 'variables'

export type ScopesTableOptions = TableOptions<JoinTableAccessors>

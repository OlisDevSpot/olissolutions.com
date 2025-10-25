import type { PaginationParams } from '@olis/core/types'

export const scopeQueryKeys = {
  all: ['scopes'] as const,
  allWithBenefits: ['scopes', 'with-benefits'] as const,
  filtered: (params: PaginationParams) => [...scopeQueryKeys.all, params] as const,
  byId: (id: number) => [...scopeQueryKeys.all, id] as const,
  byAccessor: (accessor: string) => [...scopeQueryKeys.all, accessor] as const,
  withVariables: (id: number) => [...scopeQueryKeys.byId(id), 'variables'] as const,
  withBenefits: (id: number) => [...scopeQueryKeys.byId(id), 'benefits'] as const,
}

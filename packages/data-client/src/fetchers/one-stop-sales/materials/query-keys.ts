import type { PaginationParams } from '@olis/core/types'

export const materialQueryKeys = {
  all: ['materials'] as const,
  filtered: (params: PaginationParams) => [...materialQueryKeys.all, params] as const,
  byId: (id: number) => [...materialQueryKeys.all, id] as const,
  byAccessor: (accessor: string) => [...materialQueryKeys.all, accessor] as const,
  withBenefits: (id: number) => [...materialQueryKeys.byId(id), 'benefits'] as const,
}

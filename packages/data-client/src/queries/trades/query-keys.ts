import type { PaginationParams } from '@olis/core/types'

export const tradeQueryKeys = {
  all: ['trades'] as const,
  filtered: (params: PaginationParams) => [...tradeQueryKeys.all, params] as const,
  byId: (id: number) => [...tradeQueryKeys.all, id] as const,
  withSolutions: (id: number) => [...tradeQueryKeys.byId(id), 'solutions'] as const,
  withAddons: (id: number) => [...tradeQueryKeys.byId(id), 'addons'] as const,
}

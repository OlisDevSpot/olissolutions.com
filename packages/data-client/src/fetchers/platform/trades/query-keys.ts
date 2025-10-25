import type { PaginationParams } from '@olis/core/types'

export const tradeQueryKeys = {
  all: ['trades'] as const,
  filtered: (params: PaginationParams) => [...tradeQueryKeys.all, params] as const,
  byId: (id: number) => [...tradeQueryKeys.all, id] as const,
  withScopes: (id: number) => [...tradeQueryKeys.byId(id), 'scopes'] as const,
  withAddons: (id: number) => [...tradeQueryKeys.byId(id), 'addons'] as const,
}

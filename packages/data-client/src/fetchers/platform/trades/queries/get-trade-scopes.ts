import type { UseQueryOptions } from '@tanstack/react-query'

import type { GetTradeScopesResponse } from '../types'

import { honoClient } from '@olis/server/apps/clients/one-stop-sales'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { tradeQueryKeys } from '../query-keys'

export function getTradeScopesQueryOptions(
  tradeId: number,
  options?: Omit<UseQueryOptions<GetTradeScopesResponse>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: tradeQueryKeys.withScopes(tradeId),
    queryFn: async () => {
      const res = await honoClient.api.platform.trades[':id'].scopes.$get({ param: {
        id: String(tradeId),
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const scopes = await res.json()
      return scopes
    },
  })
}

export function useGetTradeScopes(
  tradeId: number,
  options?: Omit<UseQueryOptions<GetTradeScopesResponse>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getTradeScopesQueryOptions(tradeId, options))
}

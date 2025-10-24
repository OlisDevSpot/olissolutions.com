import type { UseQueryOptions } from '@tanstack/react-query'

import type { GetTradeSolutionsResponse } from '../types'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { tradeQueryKeys } from '../query-keys'

export function getTradeSolutionsQueryOptions(
  tradeId: number,
  options?: Omit<UseQueryOptions<GetTradeSolutionsResponse>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: tradeQueryKeys.withSolutions(tradeId),
    queryFn: async () => {
      const res = await honoClient.api.trades[':id'].solutions.$get({ param: {
        id: String(tradeId),
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const solutions = await res.json()
      return solutions
    },
  })
}

export function useGetTradeSolutions(
  tradeId: number,
  options?: Omit<UseQueryOptions<GetTradeSolutionsResponse>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getTradeSolutionsQueryOptions(tradeId, options))
}

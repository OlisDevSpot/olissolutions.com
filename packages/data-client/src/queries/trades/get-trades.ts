import type { UseQueryOptions } from '@tanstack/react-query'

import type { GetTradesResponse } from './types'

import { honoClient } from '@olis/server/hono-client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { tradeQueryKeys } from './query-keys'

export function getTradesQueryOptions(
  options?: Omit<UseQueryOptions<GetTradesResponse>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: tradeQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api['one-stop-sales'].trades.$get()

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const trades = await res.json()
      return trades
    },

  })
}

export function useGetTrades(
  options?: Omit<UseQueryOptions<GetTradesResponse>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getTradesQueryOptions(options))
}

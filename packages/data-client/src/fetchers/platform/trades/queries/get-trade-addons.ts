import type { UseQueryOptions } from '@tanstack/react-query'

import type { GetTradeAddonsResponse } from '../types'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { tradeQueryKeys } from '../query-keys'

export function getTradeAddonsQueryOptions(
  tradeId: number,
  options?: Omit<UseQueryOptions<GetTradeAddonsResponse>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: tradeQueryKeys.withAddons(tradeId),
    queryFn: async () => {
      const res = await honoClient.api.platform.trades[':id'].addons.$get({ param: {
        id: String(tradeId),
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const tradeAddons = await res.json()
      return tradeAddons
    },
  })
}

export function useGetTradeAddons(
  tradeId: number,
  options?: Omit<UseQueryOptions<GetTradeAddonsResponse>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getTradeAddonsQueryOptions(tradeId, options))
}

import type { UseQueryOptions } from '@tanstack/react-query'

import type { GetTradesResponse } from '../types'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { getTradesQueryFn } from '../api/get-trades'
import { tradeQueryKeys } from '../query-keys'

export function getTradesQueryOptions(
  options?: Omit<UseQueryOptions<GetTradesResponse>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: tradeQueryKeys.all,
    queryFn: () => getTradesQueryFn(),
  })
}

export function useGetTrades(
  options?: Omit<UseQueryOptions<GetTradesResponse>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getTradesQueryOptions(options))
}

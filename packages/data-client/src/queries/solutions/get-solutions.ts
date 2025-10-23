import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/hono-client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { solutionQueryKeys } from './query-keys'

export type Request = InferRequestType<typeof honoClient.api['one-stop-sales']['solutions']['$get']>
export type Response = InferResponseType<typeof honoClient.api['one-stop-sales']['solutions']['$get'], 200>

export function getSolutionsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: solutionQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api['one-stop-sales'].solutions.$get()

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const solutions = await res.json()
      return solutions
    },

  })
}

export function useGetSolutions(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getSolutionsQueryOptions(options))
}

import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { solutionQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api['solutions'][':id{[0-9]+}']['$get']>
export type Response = InferResponseType<typeof honoClient.api['solutions'][':id{[0-9]+}']['$get'], 200>

export function getSolutionQueryOptions(
  solutionId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: solutionQueryKeys.byId(solutionId),
    queryFn: async () => {
      const res = await honoClient.api.solutions[':id{[0-9]+}'].$get({ param: {
        id: String(solutionId),
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const solution = await res.json()
      return solution
    },
  })
}

export function useGetSolution(
  solutionId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getSolutionQueryOptions(solutionId, options))
}

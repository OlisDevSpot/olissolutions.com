import type { SolutionAccessor } from '@olis/db/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { solutionQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api['solutions'][':accessor']['$get']>
export type Response = InferResponseType<typeof honoClient.api['solutions'][':accessor']['$get'], 200>

export function getSolutionByAccessorQueryOptions(
  solutionAccessor: SolutionAccessor,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: solutionQueryKeys.byAccessor(solutionAccessor),
    queryFn: async () => {
      const res = await honoClient.api.solutions[':accessor'].$get({ param: {
        accessor: solutionAccessor,
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const solution = await res.json()
      return solution
    },
  })
}

export function useGetSolutionByAccessor(
  solutionAccessor: SolutionAccessor,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getSolutionByAccessorQueryOptions(solutionAccessor, options))
}

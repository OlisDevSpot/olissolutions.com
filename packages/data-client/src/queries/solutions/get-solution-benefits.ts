import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/hono-client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { solutionQueryKeys } from './query-keys'

export type Request = InferRequestType<typeof honoClient.api.solutions[':id']['benefits']['$get']>
export type Response = InferResponseType<typeof honoClient.api.solutions[':id']['benefits']['$get'], 200>

export function getSolutionBenefitsQueryOptions(
  solutionId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: solutionQueryKeys.withBenefits(solutionId),
    queryFn: async () => {
      const res = await honoClient.api.solutions[':id'].benefits.$get({ param: {
        id: String(solutionId),
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const benefits = await res.json()
      return benefits
    },

  })
}

export function useGetSolutionBenefits(
  solutionId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getSolutionBenefitsQueryOptions(solutionId, options))
}

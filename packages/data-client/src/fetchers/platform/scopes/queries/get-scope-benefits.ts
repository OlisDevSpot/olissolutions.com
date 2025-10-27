import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/apps/clients/one-stop-sales'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { scopeQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api['platform']['scopes'][':id']['benefits']['$get']>
export type Response = InferResponseType<typeof honoClient.api['platform']['scopes'][':id']['benefits']['$get'], 200>

export function getScopeBenefitsQueryOptions(
  scopeId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: scopeQueryKeys.withBenefits(scopeId),
    queryFn: async () => {
      const res = await honoClient.api.platform.scopes[':id'].benefits.$get({ param: {
        id: String(scopeId),
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const benefits = await res.json()
      return benefits
    },

  })
}

export function useGetScopeBenefits(
  scopeId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getScopeBenefitsQueryOptions(scopeId, options))
}

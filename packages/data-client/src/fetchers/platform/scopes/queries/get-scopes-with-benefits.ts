import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { scopeQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api.platform.scopes['with-benefits']['$get']>
export type Response = InferResponseType<typeof honoClient.api.platform.scopes['with-benefits']['$get'], 200>

export function getScopesWithBenefitsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: scopeQueryKeys.allWithBenefits,
    queryFn: async () => {
      const res = await honoClient.api.platform.scopes['with-benefits'].$get()

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const scopes = await res.json()
      return scopes
    },

  })
}

export function useGetScopesWithBenefits(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getScopesWithBenefitsQueryOptions(options))
}

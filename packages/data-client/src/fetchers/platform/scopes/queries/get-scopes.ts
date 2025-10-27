import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/apps/clients/one-stop-sales'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { scopeQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api.platform.scopes['$get']>
export type Response = InferResponseType<typeof honoClient.api.platform.scopes['$get'], 200>

export function getScopesQueryOptions(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: scopeQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.platform.scopes.$get()

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const scopes = await res.json()
      return scopes
    },

  })
}

export function useGetScopes(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getScopesQueryOptions(options))
}

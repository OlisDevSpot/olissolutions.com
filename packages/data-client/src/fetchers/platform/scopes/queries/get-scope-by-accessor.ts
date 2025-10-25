import type { ScopeAccessor } from '@olis/db/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { scopeQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api['platform']['scopes'][':accessor']['$get']>
export type Response = InferResponseType<typeof honoClient.api['platform']['scopes'][':accessor']['$get'], 200>

export function getScopeByAccessorQueryOptions(
  scopeAccessor: ScopeAccessor,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: scopeQueryKeys.byAccessor(scopeAccessor),
    queryFn: async () => {
      const res = await honoClient.api.platform.scopes[':accessor'].$get({ param: {
        accessor: scopeAccessor,
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const scope = await res.json()
      return scope
    },
  })
}

export function useGetScopeByAccessor(
  scopeAccessor: ScopeAccessor,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getScopeByAccessorQueryOptions(scopeAccessor, options))
}

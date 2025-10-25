import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { scopeQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api['platform']['scopes'][':id{[0-9]+}']['$get']>
export type Response = InferResponseType<typeof honoClient.api['platform']['scopes'][':id{[0-9]+}']['$get'], 200>

export function getScopeQueryOptions(
  scopeId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: scopeQueryKeys.byId(scopeId),
    queryFn: async () => {
      const res = await honoClient.api.platform.scopes[':id{[0-9]+}'].$get({ param: {
        id: String(scopeId),
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const scope = await res.json()
      return scope
    },
  })
}

export function useGetScope(
  scopeId: number,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getScopeQueryOptions(scopeId, options))
}

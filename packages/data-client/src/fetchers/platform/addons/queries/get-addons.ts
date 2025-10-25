import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { addonQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api['platform']['addons']['$get']>
export type Response = InferResponseType<typeof honoClient.api['platform']['addons']['$get'], 200>

export function getAddonsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: addonQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.platform.addons.$get()

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const addons = await res.json()
      return addons
    },

  })
}

export function useGetAddons(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getAddonsQueryOptions(options))
}

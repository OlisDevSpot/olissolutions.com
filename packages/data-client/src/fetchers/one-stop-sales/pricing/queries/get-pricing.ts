import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { pricingQueryKeys } from './query-keys'

export type Request = InferRequestType<typeof honoClient.api['pricing']['$get']>
export type Response = InferResponseType<typeof honoClient.api['pricing']['$get'], 200>

export function getPricingQueryOptions(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: pricingQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.pricing.$get()

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const pricing = await res.json()
      return pricing
    },

  })
}

export function useGetPricing(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getPricingQueryOptions(options))
}

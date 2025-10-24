import type { UseQueryOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { materialQueryKeys } from '../query-keys'

export type Request = InferRequestType<typeof honoClient.api['materials']['$get']>
export type Response = InferResponseType<typeof honoClient.api['materials']['$get'], 200>

export function getMaterialsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: materialQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.materials.$get()

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const materials = await res.json()
      return materials
    },

  })
}

export function useGetMaterials(
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getMaterialsQueryOptions(options))
}

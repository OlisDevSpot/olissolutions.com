import type { MaterialAccessor } from '@olis/db/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { materialQueryKeys } from './query-keys'

export type Request = InferRequestType<typeof honoClient.api['materials'][':accessor']['$get']>
export type Response = InferResponseType<typeof honoClient.api['materials'][':accessor']['$get'], 200>

export function getMaterialByAccessorQueryOptions(
  materialAccessor: MaterialAccessor,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: materialQueryKeys.byAccessor(materialAccessor),
    queryFn: async () => {
      const res = await honoClient.api.materials[':accessor'].$get({ param: {
        accessor: materialAccessor,
      } })

      if (!res.ok) {
        throw new Error('Trades not found')
      }

      const material = await res.json()
      return material
    },
  })
}

export function useGetMaterialByAccessor(
  materialAccessor: MaterialAccessor,
  options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) {
  return useQuery(getMaterialByAccessorQueryOptions(materialAccessor, options))
}

import { honoClient } from '@olis/server/routers/identity/client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { accountQueryKeys } from '@/features/account-management/data/query-keys'

function getPricingVariablesQueryOptions() {
  return queryOptions({
    queryKey: accountQueryKeys.pricingVariables(),
    queryFn: async () => {
      const res = await honoClient.api.identity.account.pricing.$get()

      if (!res.ok) {
        throw new Error('Pricing variables not found')
      }

      return res.json()
    },
  })
}

export function useGetPricingVariables() {
  return useQuery(getPricingVariablesQueryOptions())
}

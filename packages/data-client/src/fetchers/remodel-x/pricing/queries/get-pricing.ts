import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetPricing() {
  const trpc = useTRPC()
  return useQuery(trpc.identity.accounts.findAllPricing.queryOptions())
}

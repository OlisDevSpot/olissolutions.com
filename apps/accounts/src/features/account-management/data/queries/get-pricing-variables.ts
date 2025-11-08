import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'

export function useGetPricingVariables() {
  const trpc = useTRPC()
  return useQuery(trpc.identity.accounts.findAllPricing.queryOptions())
}

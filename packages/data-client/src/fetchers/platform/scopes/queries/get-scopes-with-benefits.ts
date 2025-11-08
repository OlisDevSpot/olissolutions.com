import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetScopesWithBenefits() {
  const trpc = useTRPC()
  return useQuery(trpc.platform.scopes.findAllWithBenefits.queryOptions())
}

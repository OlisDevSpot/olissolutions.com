import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetScopeBenefits(scopeId: number) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.scopes.findScopeBenefits.queryOptions({ id: scopeId }))
}

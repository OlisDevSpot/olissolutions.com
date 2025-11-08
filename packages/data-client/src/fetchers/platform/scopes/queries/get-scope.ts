import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetScope(scopeId: number) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.scopes.findOne.queryOptions({ id: scopeId }))
}

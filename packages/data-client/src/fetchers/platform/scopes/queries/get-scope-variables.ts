import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetScopeVariables(scopeId: number, { enabled }: { enabled?: boolean } = {}) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.scopes.findScopeVariables.queryOptions({ id: scopeId }, { enabled }))
}

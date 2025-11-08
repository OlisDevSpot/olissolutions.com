import type { ScopeAccessor } from '@olis/db/types'
import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetScopeByAccessor(
  scopeAccessor: ScopeAccessor,
) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.scopes.findOneByAccessor.queryOptions({ accessor: scopeAccessor }))
}

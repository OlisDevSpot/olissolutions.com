import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetScopes() {
  const trpc = useTRPC()
  return useQuery(trpc.platform.scopes.findAll.queryOptions())
}

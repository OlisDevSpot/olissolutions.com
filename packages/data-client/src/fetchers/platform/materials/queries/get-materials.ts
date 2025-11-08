import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetMaterials() {
  const trpc = useTRPC()
  return useQuery(trpc.platform.materials.findAll.queryOptions())
}

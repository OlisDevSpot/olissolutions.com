import type { MaterialAccessor } from '@olis/db/types'
import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetMaterialByAccessor(materialAccessor: MaterialAccessor) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.materials.findOneByAccessor.queryOptions({ accessor: materialAccessor }))
}

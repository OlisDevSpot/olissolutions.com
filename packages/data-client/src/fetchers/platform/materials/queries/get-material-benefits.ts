import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetMaterialBenefits(materialId: number) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.materials.findMaterialBenefits.queryOptions({ id: materialId }))
}

import type { AddonAccessor } from '@olis/db/types'
import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetAddonByAccessor(addonAccessor: AddonAccessor) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.addons.findOneByAccessor.queryOptions({ accessor: addonAccessor }))
}

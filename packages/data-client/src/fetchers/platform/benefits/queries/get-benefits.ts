import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetBenefits() {
  const trpc = useTRPC()
  return useQuery(trpc.platform.benefits.findAll.queryOptions())
}

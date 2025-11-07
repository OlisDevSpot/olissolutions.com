import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetTrades() {
  const trpc = useTRPC()
  return useQuery(trpc.platform.trades.findAll.queryOptions())
}

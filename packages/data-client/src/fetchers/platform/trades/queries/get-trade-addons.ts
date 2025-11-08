import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetTradeAddons(tradeId: number, { enabled }: { enabled: boolean }) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.trades.findAddons.queryOptions({ id: tradeId }, { enabled }))
}

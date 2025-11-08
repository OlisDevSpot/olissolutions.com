import { useTRPC } from '@olis/data-client/trpc/client'
import { useQuery } from '@tanstack/react-query'

export function useGetTradeScopes(tradeId: number, { enabled }: { enabled: boolean }) {
  const trpc = useTRPC()
  return useQuery(trpc.platform.trades.findScopes.queryOptions({ id: tradeId }, { enabled }))
}

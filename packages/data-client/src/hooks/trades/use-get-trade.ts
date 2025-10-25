import { useGetTrades } from '@olis/data-client/fetchers/platform/trades/queries/get-trades'

export function useGetTradeById(id: number) {
  const trades = useGetTrades()

  if (!trades.data) {
    return null
  }

  return trades.data.find(trade => trade.id === id)
}

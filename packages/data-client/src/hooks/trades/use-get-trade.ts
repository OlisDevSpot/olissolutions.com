import { useGetTrades } from '@olis/data-client/queries/trades/get-trades'

export function useGetTradeById(id: number) {
  const trades = useGetTrades()

  if (!trades.data) {
    return null
  }

  return trades.data.find(trade => trade.id === id)
}

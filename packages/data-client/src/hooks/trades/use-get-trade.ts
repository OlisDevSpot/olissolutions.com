import { useGetTrades } from '../../../dist/fetchers/one-stop-sales/trades/queries/get-trades'

export function useGetTradeById(id: number) {
  const trades = useGetTrades()

  if (!trades.data) {
    return null
  }

  return trades.data.find(trade => trade.id === id)
}

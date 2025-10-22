import { useGetTrades } from "@/shared/entities/trades/data/queries/get-trades";

export function useGetTradeById(id: number) {
  const trades = useGetTrades();

  if (!trades.data) {
    return null;
  }

  return trades.data.find(trade => trade.id === id);
}

import { honoClient } from '@olis/server/routers/one-stop-sales/client'

export async function getTradesQueryFn() {
  const res = await honoClient.api.trades.$get()

  if (!res.ok) {
    throw new Error('Trades not found')
  }

  const trades = await res.json()
  return trades
}

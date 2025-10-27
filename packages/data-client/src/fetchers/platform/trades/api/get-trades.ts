import { honoClient } from '@olis/server/apps/clients/one-stop-sales'

export async function getTradesQueryFn() {
  const res = await honoClient.api.platform.trades.$get()

  if (!res.ok) {
    throw new Error('Trades not found')
  }

  const trades = await res.json()
  return trades
}

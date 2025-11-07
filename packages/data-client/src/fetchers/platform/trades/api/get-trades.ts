import type { BaseTRPCClient } from '@olis/data-client/types'

// import { honoClient } from '@olis/server/apps/clients/one-stop-sales'

export async function getTradesQueryFn(trpc: BaseTRPCClient) {
  // const res = await honoClient.api.platform.trades.$get()
  const data = await trpc.platform.trades.findAll.query()

  console.log({ data })

  if (!data) {
    throw new Error('Trades not found')
  }

  return data
}

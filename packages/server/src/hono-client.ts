import type { AppRouter } from '@olis/server'

import { hc } from 'hono/client'

export const honoClient = hc<AppRouter>(process.env.NEXT_PUBLIC_BASE_URL!)

async function test() {
  const projects = await honoClient.api['one-stop-sales'].projects.$get({ query: { joinCustomers: 'true' } })
}

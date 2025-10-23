import type { AppRouter } from '@olis/server'

import type { InferResponseType } from 'hono/client'
import { hc } from 'hono/client'

export const honoClient = hc<AppRouter>(process.env.NEXT_PUBLIC_BASE_URL!)

type InferResponse = InferResponseType<typeof honoClient.api['tests']['test']['$post'], 200>

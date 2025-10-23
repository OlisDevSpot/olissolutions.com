import type { AppRouter } from '@olis/server'

import { hc } from 'hono/client'

export const honoClient = hc<AppRouter>(process.env.NEXT_PUBLIC_BASE_URL!)

import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { auth } from '@olis/auth/server' // path to your auth package

export async function createContext(opts: FetchCreateContextFnOptions) {
  const session = await auth.api.getSession({
    headers: opts.req.headers,
  })

  return {
    ...session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>

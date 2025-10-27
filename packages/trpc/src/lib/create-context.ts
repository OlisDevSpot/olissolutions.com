import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { auth } from '@olis/auth/server'

export async function createHonoTRPCContext(_opts: FetchCreateContextFnOptions) {
  const session = await auth.api.getSession({
    headers: _opts.req.headers,
  })

  return {
    ...session,
  }
}
export type Context = Awaited<ReturnType<typeof createHonoTRPCContext>>

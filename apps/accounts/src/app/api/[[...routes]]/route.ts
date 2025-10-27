import { trpcServer } from '@hono/trpc-server'
import { auth } from '@olis/auth/server'
import app from '@olis/server/apps/identity'
import { createHonoTRPCContext } from '@olis/trpc/lib/create-context'
import { identityAppRouter } from '@olis/trpc/routers/app/identity/index'
import { handle } from 'hono/vercel'

app.use('/trpc/*', trpcServer({
  router: identityAppRouter,
  endpoint: '/api/trpc',
  createContext: createHonoTRPCContext,
}))

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)

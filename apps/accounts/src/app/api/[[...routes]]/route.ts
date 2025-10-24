// import { trpcServer } from '@hono/trpc-server'
// import { auth } from '@olis/auth/server'
import app from '@olis/server/routers/core/app'
// import { appRouter } from '@olis/trpc/app-router'
import { handle } from 'hono/vercel'

// app.use('/trpc/*', trpcServer({
//   router: appRouter,
//   createContext: async (ctx) => {
//     const session = await auth.api.getSession({
//       headers: ctx.req.headers,
//     })

//     return {
//       ...session,
//       req: ctx.req,
//     }
//   },
// }))

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const OPTIONS = handle(app)

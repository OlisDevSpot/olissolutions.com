import type { Context } from './lib/create-context'
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,

  /**
   * Format the error object before it's sent to the client.
   */
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        code: error.code,
        // you can include cause or strip stack traces here
        cause: error.cause instanceof Error ? error.cause.message : error.cause,
      },
    }
  },
})

export function createTRPCContext() {
  return { userId: '123' }
}

export const createTRPCRouter = t.router
export const createMiddleware = t.middleware
export const createCallerFactory = t.createCallerFactory
export const mergeRouters = t.mergeRouters
export const publicProcedure = t.procedure
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({ ctx: { ...ctx, user: ctx.user, session: ctx.session } })
})

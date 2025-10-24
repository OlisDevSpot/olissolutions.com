import type { Context } from './lib/create-context'
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
})

export const createTRPCRouter = t.router

export const createMiddleware = t.middleware

export const createCallerFactory = t.createCallerFactory

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({ ctx })
})

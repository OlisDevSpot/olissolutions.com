import { TRPCError } from '@trpc/server'
import { createMiddleware } from '../init'

export const isAuthed = createMiddleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

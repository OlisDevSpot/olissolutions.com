import { createTRPCRouter, protectedProcedure } from '@olis/trpc/init'
import z from 'zod'

export const usersRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user
  }),
  getUser: protectedProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .query(async ({ ctx: __, input }) => {
      const { userId: _ } = input

      return 'USER!'
    }),
})

import * as repository from '@olis/server/routers/identity/users/repository'
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
  findAll: protectedProcedure.query(async () => {
    const users = await repository.findAll()
    return users
  }),
  findOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const user = await repository.findOne(input.id)
    return user
  }),
  deleteOne: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    const user = await repository.deleteOne(input.id)
    return user
  }),
})

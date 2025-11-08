import { insertXSubscriptionSchema } from '@olis/db/schema/identity'
import * as repository from '@olis/server/routers/marketplace/x-subscriptions/repository'
import { createTRPCRouter, protectedProcedure } from '@olis/trpc/init'
import z from 'zod'

export const xSubscriptionsRouter = createTRPCRouter({
  findAll: protectedProcedure
    .query(async ({ ctx }) => {
      const subscriptions = await repository.findAll(ctx.user.id)
      return subscriptions
    }),
  findOne: protectedProcedure
    .input(z.object({ solutionId: z.number() }))
    .query(async ({ input, ctx }) => {
      const subscription = await repository.findOne(ctx.user.id, input.solutionId)
      return subscription
    }),
  create: protectedProcedure
    .input(insertXSubscriptionSchema.omit({ userId: true }))
    .mutation(async ({ input, ctx }) => {
      const data = {
        ...input,
        userId: ctx.user.id,
      }

      const subscription = await repository.create(data)
      return subscription
    }),
  update: protectedProcedure
    .input(insertXSubscriptionSchema.partial())
    .mutation(async ({ input, ctx }) => {
      const subscription = await repository.update(ctx.user.id, input)
      return subscription
    }),
})

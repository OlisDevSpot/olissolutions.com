import { insertCustomerSchema } from '@olis/db/schema/platform'
import { createTRPCRouter, protectedProcedure } from '@olis/trpc/init'
import z from 'zod'
import * as repository from './repository'

export const customersRouter = createTRPCRouter({
  findAll: protectedProcedure
    .query(async ({ ctx }) => {
      const customers = await repository.findAll(ctx.user.id)
      return customers
    }),
  createOne: protectedProcedure
    .input(insertCustomerSchema.strict())
    .mutation(async ({ input }) => {
      const customer = await repository.createOne(input)
      return customer
    }),
  updateOne: protectedProcedure
    .input(z.object({ id: z.string(), ...insertCustomerSchema.strict().partial().shape }))
    .mutation(async ({ input }) => {
      const customer = await repository.updateOne(input.id, input)
      return customer
    }),
  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const customer = await repository.deleteOne(input.id)
      return customer
    }),
})

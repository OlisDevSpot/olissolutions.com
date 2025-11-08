import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import z from 'zod'
import * as repository from './repository'

export const addonsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const addons = await repository.findAll()
    return addons
  }),
  findOne: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const addon = await repository.findOne(input.id)
    return addon
  }),
  findOneByAccessor: publicProcedure.input(z.object({ accessor: z.string() })).query(async ({ input }) => {
    const addon = await repository.findOneByAccessor(input.accessor)
    return addon
  }),
})

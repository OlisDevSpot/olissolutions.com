import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import * as repository from './repository'

export const benefitsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const benefits = await repository.findAll()
    return benefits
  }),
})

import * as repository from '@olis/server/routers/platform/benefits/repository'
import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'

export const benefitsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const benefits = await repository.findAll()
    return benefits
  }),
})

import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import * as repository from './repository'

export const accountsRouter = createTRPCRouter({
  findAllPricing: publicProcedure.query(async () => {
    const pricing = await repository.findAllPricing()
    return pricing
  }),
})

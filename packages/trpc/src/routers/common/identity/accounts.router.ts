import * as repository from '@olis/server/routers/identity/accounts/repository'
import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'

export const accountsRouter = createTRPCRouter({
  findAllPricing: publicProcedure.query(async () => {
    const pricing = await repository.findAllPricing()
    return pricing
  }),
})

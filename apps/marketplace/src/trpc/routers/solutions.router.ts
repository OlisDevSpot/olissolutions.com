import * as repository from '@olis/server/routers/marketplace/solutions/repository'
import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import z from 'zod'

export const solutionsRouter = createTRPCRouter({
  findAll: publicProcedure
    .input(z.object({
      isActive: z.boolean().optional(),
    }))
    .query(async ({ input }) => {
      const foundSolutions = await repository.findAll({ isActive: input.isActive })
      return foundSolutions
    }),
})

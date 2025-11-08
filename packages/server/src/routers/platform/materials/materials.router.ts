import { createTRPCRouter, publicProcedure } from '@olis/trpc/init'
import z from 'zod'

import * as repository from './repository'

export const materialsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const materials = await repository.findAll()
    return materials
  }),
  findOne: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const material = await repository.findOne(input.id)
    return material
  }),
  findOneByAccessor: publicProcedure.input(z.object({ accessor: z.string() })).query(async ({ input }) => {
    const material = await repository.findOneByAccessor(input.accessor)
    return material
  }),
  findMaterialBenefits: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const materialBenefits = await repository.findMaterialBenefits(input.id)
    return materialBenefits
  }),
})

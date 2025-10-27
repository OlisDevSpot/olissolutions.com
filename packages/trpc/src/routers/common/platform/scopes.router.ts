import * as repository from '@olis/server/routers/platform/scopes/repository'
import { createTRPCRouter, protectedProcedure } from '@olis/trpc/init'
import z from 'zod'

export const scopesRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async () => {
    const scopes = await repository.findAll()
    return scopes
  }),
  findAllByTradeId: protectedProcedure.input(z.object({ tradeId: z.number() })).query(async ({ input }) => {
    const scopes = await repository.findAllByTradeId(input.tradeId)
    return scopes
  }),
  findAllWithBenefits: protectedProcedure.query(async () => {
    const scopes = await repository.findAllWithBenefits()
    return scopes
  }),
  findOne: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const scope = await repository.findOne(input.id)
    return scope
  }),
  findOneByAccessor: protectedProcedure.input(z.object({ accessor: z.string() })).query(async ({ input }) => {
    const scope = await repository.findOneByAccessor(input.accessor)
    return scope
  }),
  findScopeVariables: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const variables = await repository.findScopeVariables(input.id)
    return variables
  }),
  findScopeBenefits: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const benefits = await repository.findScopeBenefits(input.id)
    return benefits
  }),
})

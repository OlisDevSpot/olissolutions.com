import { insertTradeSchema } from '@olis/db/schema/platform'
import * as scopesRepository from '@olis/server/routers/platform/scopes/repository'
import * as repository from '@olis/server/routers/platform/trades/repository'
import { createTRPCRouter, protectedProcedure } from '@olis/trpc/init'
import { TRPCError } from '@trpc/server'
import z from 'zod'

export const tradesRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async () => {
    const trades = await repository.findAll()
    return trades
  }),
  findOne: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const trade = await repository.findOne(input.id)
    return trade
  }),
  createOne: protectedProcedure.input(insertTradeSchema).mutation(async ({ input }) => {
    const trade = await repository.createOne(input)
    if (!trade) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create trade' })
    }
    return trade
  }),
  updateOne: protectedProcedure.input(z.object({ id: z.number(), ...insertTradeSchema.strict().partial().shape })).mutation(async ({ input }) => {
    const trade = await repository.updateOne(input.id, input)
    if (!trade) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update trade' })
    }
    return trade
  }),
  deleteOne: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    const trade = await repository.deleteOne(input.id)
    if (!trade) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete trade' })
    }
    return trade
  }),
  findScopes: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const scopes = await scopesRepository.findAllByTradeId(input.id)
    return scopes
  }),
  findScopesByAccessor: protectedProcedure.input(z.object({ accessor: z.string() })).query(async ({ input }) => {
    const scopes = await repository.findAllScopesByTradeAccessor(input.accessor)
    return scopes
  }),
  findAddons: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const addons = await repository.findAllTradeAddons(input.id)
    return addons
  }),
})

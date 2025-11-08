import * as customersRepository from "@olis/server/routers/platform/customers/repository"
import * as scopesRepository from "@olis/server/routers/platform/scopes/repository"
import * as repository from "@olis/server/routers/remodel-x/project-creator/repository"
import { createTRPCRouter, protectedProcedure } from "@olis/trpc/init"
import z from "zod"

import { insertCustomerSchema } from "@olis/db/schema/platform"
import { insertFinancialProfileSchema, insertJobsiteProfileSchema, insertJobsiteRoofSchema, insertProjectSchema, insertXProjectScopeSchema } from "@olis/db/schema/remodel-x"

export const projectsRouter = createTRPCRouter({
  findAll: protectedProcedure
    .query(async ({ ctx }) => {
      const { user } = ctx
      const foundProjects = await repository.findAll(user.id)
      return foundProjects
    }),
  findOne: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const project = await repository.findOne(ctx.user.id, input.projectId)
      return project
    }),
  findProjectScopes: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const scopes = await scopesRepository.findAllByProjectId(input.projectId)
      return scopes
    }),
  findProjectJobsite: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const jobsite = await repository.findProjectJobsite(input.projectId)
      return jobsite
    }),
  findProjectFinancialProfile: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const financialProfile = await repository.findProjectFinancialProfile(input.projectId)
      return financialProfile
    }),
  findProjectCustomers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const customers = await customersRepository.findAllByProjectId(input.projectId)
      return customers
    }),
  createOne: protectedProcedure
    .input(insertProjectSchema.strict())
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx
      const project = await repository.createOne(user.id, input)
      return project
    }),
  init: protectedProcedure
    .input(z.object({
      projectData: insertProjectSchema,
      customerData: insertCustomerSchema,
      jobsiteData: insertJobsiteProfileSchema.pick({
        numStories: true,
        yearBuilt: true,
        electricProvider: true,
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx
      const project = await repository.initProject(user.id, input)
      return project
    }),
  updateOne: protectedProcedure
    .input(z.object({ projectId: z.string(), ...insertProjectSchema.strict().partial().shape }))
    .mutation(async ({ input }) => {
      const { projectId, ...data } = input
      const project = await repository.findOneAndUpdate(projectId, data)
      return project
    }),
  deleteOne: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input }) => {
      const project = await repository.deleteOne(input.projectId)
      return project
    }),
  updateFinancialProfile: protectedProcedure
    .input(z.object({ projectId: z.string(), ...insertFinancialProfileSchema.strict().partial().shape }))
    .mutation(async ({ input }) => {
      const { projectId, ...data } = input
      const project = await repository.updateProjectFinancialProfile(projectId, data)
      return project
    }),
  updateJobsite: protectedProcedure
    .input(z.object({
      projectId: z.string(),
      roofData: insertJobsiteRoofSchema.partial().strict(),
      jobsiteData: insertJobsiteProfileSchema.partial().strict(),
    }))
    .mutation(async ({ input }) => {
      const { projectId, ...data } = input
      const project = await repository.updateProjectJobsiteProfile(projectId, data)
      return project
    }),
  createProjectScopes: protectedProcedure
    .input(z.object({ projectId: z.string(), scopeIds: z.array(z.number()) }))
    .mutation(async ({ input }) => {
      const { projectId, scopeIds } = input
      const project = await repository.createProjectScopes(projectId, scopeIds)
      return project
    }),
  updateProjectScope: protectedProcedure
    .input(z.object({ projectId: z.string(), scopeId: z.number(), ...insertXProjectScopeSchema.partial().strict().shape }))
    .mutation(async ({ input }) => {
      const { projectId, scopeId, ...data } = input
      const project = await repository.updateProjectScope(projectId, scopeId, data)
      return project
    }),
})

// .patch('/:id/scopes/:scopeId', ...handlers.updateProjectScope)

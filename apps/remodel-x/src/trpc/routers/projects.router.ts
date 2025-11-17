import * as repository from "@olis/server/routers/remodel-x/project-creator/repository"
import z from "zod"

import { insertCustomerSchema } from "@olis/db/schema/platform"
import { insertJobsiteProfileSchema, insertProjectSchema } from "@olis/db/schema/remodel-x"
import { createTRPCRouter, protectedProcedure } from "@olis/trpc/init"

import { projectCustomersRouter } from "./project-customers.router"
import { projectFinancialProfileRouter } from "./project-financial-profile.router"
import { projectJobsiteRouter } from "./project-jobsite.router"
import { projectScopesRouter } from "./project-scopes.router"

export const projectsRouter = createTRPCRouter({
  scopes: projectScopesRouter,
  jobsite: projectJobsiteRouter,
  financialProfile: projectFinancialProfileRouter,
  customers: projectCustomersRouter,
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
  createOne: protectedProcedure
    .input(insertProjectSchema.strict())
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx
      const project = await repository.createOne(user.id, input)
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
  init: protectedProcedure
    .input(z.object({
      project: insertProjectSchema,
      customer: insertCustomerSchema,
      jobsite: insertJobsiteProfileSchema.pick({
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
})

import * as scopesRepository from "@olis/server/routers/platform/scopes/repository"
import * as repository from "@olis/server/routers/remodel-x/project-creator/repository"
import z from "zod";

import { insertXProjectScopeSchema } from "@olis/db/schema/remodel-x";
import { createTRPCRouter, protectedProcedure } from "@olis/trpc/init";

export const projectScopesRouter = createTRPCRouter({
  findProjectScopes: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const scopes = await scopesRepository.findAllByProjectId(input.projectId)
      return scopes
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

import * as repository from "@olis/server/routers/remodel-x/project-creator/repository"
import z from "zod";

import { insertFinancialProfileSchema } from "@olis/db/schema/remodel-x";
import { createTRPCRouter, protectedProcedure } from "@olis/trpc/init";

export const projectFinancialProfileRouter = createTRPCRouter({
  findProjectFinancialProfile: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const financialProfile = await repository.findProjectFinancialProfile(input.projectId)
      return financialProfile
    }),
  updateFinancialProfile: protectedProcedure
    .input(z.object({ projectId: z.string(), ...insertFinancialProfileSchema.strict().partial().shape }))
    .mutation(async ({ input }) => {
      const { projectId, ...data } = input
      const project = await repository.updateProjectFinancialProfile(projectId, data)
      return project
    }),
})

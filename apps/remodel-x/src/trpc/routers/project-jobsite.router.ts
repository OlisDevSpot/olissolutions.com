import * as repository from "@olis/server/routers/remodel-x/project-creator/repository"
import z from "zod";

import { insertJobsiteProfileSchema, insertJobsiteRoofSchema } from "@olis/db/schema/remodel-x";
import { createTRPCRouter, protectedProcedure } from "@olis/trpc/init";

export const projectJobsiteRouter = createTRPCRouter({
  findProjectJobsite: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const jobsite = await repository.findProjectJobsite(input.projectId)
      return jobsite
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
})

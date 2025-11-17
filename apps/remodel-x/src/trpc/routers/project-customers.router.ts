import * as customersRepository from "@olis/server/routers/platform/customers/repository"
import * as repository from "@olis/server/routers/remodel-x/project-creator/repository"
import { TRPCError } from "@trpc/server";
import z from "zod";

import { insertCustomerSchema } from "@olis/db/schema/platform";
import { createTRPCRouter, protectedProcedure } from "@olis/trpc/init";

export const projectCustomersRouter = createTRPCRouter({
  findProjectCustomers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const customers = await customersRepository.findAllByProjectId(input.projectId)
      return customers
    }),
  createProjectCustomer: protectedProcedure
    .input(z.object({ projectId: z.string(), customer: insertCustomerSchema.strict() }))
    .mutation(async ({ input }) => {
      const { projectId, customer } = input
      try {
        const newCustomer = await customersRepository.createOne(customer)

        if (!newCustomer) {
          throw new Error("Failed to create customer")
        }

        const projectCustomer = await repository.createProjectCustomer(projectId, newCustomer.id)

        return projectCustomer
      }
      catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error instanceof Error ? error.message : String(error) })
      }
    })
})

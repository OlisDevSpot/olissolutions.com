import type { UseMutationOptions } from "@tanstack/react-query";
import type { inferInput, inferOutput } from "@trpc/tanstack-react-query";

import { useMutation } from "@tanstack/react-query"

import type { trpc } from "@/trpc/server";

import { useTRPC } from "@/trpc/client"

type CreateProjectCustomerInput = inferInput<typeof trpc.projects.customers.createProjectCustomer>
type CreateProjectCustomerOutput = inferOutput<typeof trpc.projects.customers.createProjectCustomer>

export function useCreateProjectCustomer(opts?: UseMutationOptions<CreateProjectCustomerOutput, unknown, CreateProjectCustomerInput>) {
  const trpc = useTRPC()
  return useMutation(trpc.projects.customers.createProjectCustomer.mutationOptions(opts))
}

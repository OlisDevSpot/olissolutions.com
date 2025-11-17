import type { trpc } from '@olis/data-client/trpc/server'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { inferInput, inferOutput } from '@trpc/tanstack-react-query'
import { useTRPC } from '@olis/data-client/trpc/client'
import { useMutation } from '@tanstack/react-query'

type CreateCustomerOutput = inferOutput<typeof trpc.platform.customers.createOne>
type CreateCustomerInput = inferInput<typeof trpc.platform.customers.createOne>

export function useCreateCustomer(opts?: UseMutationOptions<CreateCustomerOutput, unknown, CreateCustomerInput>) {
  const trpc = useTRPC()
  return useMutation(trpc.platform.customers.createOne.mutationOptions(opts))
}

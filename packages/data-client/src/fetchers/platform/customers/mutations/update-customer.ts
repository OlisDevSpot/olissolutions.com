import type { trpc } from '@olis/data-client/trpc/server'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { inferInput, inferOutput } from '@trpc/tanstack-react-query'
import { useTRPC } from '@olis/data-client/trpc/client'
import { useMutation } from '@tanstack/react-query'

type UpdateCustomerOutput = inferOutput<typeof trpc.platform.customers.updateOne>
type UpdateCustomerInput = inferInput<typeof trpc.platform.customers.updateOne>

export function useUpdateCustomer(opts?: UseMutationOptions<UpdateCustomerOutput, unknown, UpdateCustomerInput>) {
  const trpc = useTRPC()
  return useMutation(trpc.platform.customers.updateOne.mutationOptions(opts))
}

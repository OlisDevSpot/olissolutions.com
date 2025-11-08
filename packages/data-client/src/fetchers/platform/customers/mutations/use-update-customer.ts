import { useTRPC } from '@olis/data-client/trpc/client'
import { useMutation } from '@tanstack/react-query'

export function useUpdateCustomer() {
  const trpc = useTRPC()
  return useMutation(trpc.platform.customers.updateOne.mutationOptions())
}

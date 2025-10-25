import type { InferRequestType, InferResponseType } from 'hono'

import { honoClient } from '@olis/server/routers/one-stop-sales/client'
import { useMutation } from '@tanstack/react-query'

type UpdateCustomerRequest = InferRequestType<typeof honoClient.api['platform']['customers'][':id']['$patch']>['json']
type UpdateCustomerResponse = InferResponseType<typeof honoClient.api['platform']['customers'][':id']['$patch'], 200>

export function useUpdateCustomer(customerId: string) {
  return useMutation<UpdateCustomerResponse, unknown, UpdateCustomerRequest>({
    mutationFn: async (data) => {
      const res = await honoClient.api.platform.customers[':id'].$patch({ param: { id: customerId }, json: data })

      if (!res.ok) {
        throw new Error('Error updating customer')
      }

      return await res.json()
    },
  })
}

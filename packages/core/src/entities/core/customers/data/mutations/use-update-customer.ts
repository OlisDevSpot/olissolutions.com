import type { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { honoClient } from "@/shared/clients/hono-client";

type UpdateCustomerRequest = InferRequestType<typeof honoClient.api.customers[":id"]["$patch"]>["json"];
type UpdateCustomerResponse = InferResponseType<typeof honoClient.api.customers[":id"]["$patch"], 200>;

export function useUpdateCustomer(customerId: string) {
  const queryClient = useQueryClient();

  return useMutation<UpdateCustomerResponse, unknown, UpdateCustomerRequest>({
    mutationFn: async (data) => {
      const res = await honoClient.api.customers[":id"].$patch({ param: { id: customerId }, json: data });

      if (!res.ok) {
        throw new Error("Error updating customer");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Customer updated");
    },
  });
}

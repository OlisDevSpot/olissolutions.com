import type { UseMutationOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import { mutationOptions, useMutation } from "@tanstack/react-query";

export type Request = InferRequestType<typeof honoClient.api["projects"][":id"]["financial-profile"]["$patch"]>["json"];
export type Response = InferResponseType<typeof honoClient.api["projects"][":id"]["financial-profile"]["$patch"], 200>;

export function updateProjectFinancialProfileMutationOptions(
  projectId: string,
  options?: Omit<UseMutationOptions<Response, Error, Request>, "mutationFn">,
) {
  return mutationOptions({
    ...options,
    mutationFn: async (data) => {
      const res = await honoClient.api.projects[":id"]["financial-profile"].$patch({
        param: {
          id: projectId,
        },
        json: data,
      });

      if (!res.ok) {
        throw new Error("Error updating project jobsite profile");
      }

      const updatedJobsite = res.json();

      return updatedJobsite;
    },
  });
}

export function useUpdateProjectFinancialProfile(
  projectId: string,
  options?: Omit<UseMutationOptions<Response, Error, Request>, "mutationFn">,
) {
  return useMutation(updateProjectFinancialProfileMutationOptions(projectId, options));
}

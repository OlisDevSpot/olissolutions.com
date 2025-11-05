import type { UseMutationOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import { mutationOptions, useMutation } from "@tanstack/react-query";

export type Request = InferRequestType<typeof honoClient.api["projects"][":id"]["scopes"][":scopeId"]["$patch"]>["json"];
export type Response = InferResponseType<typeof honoClient.api["projects"][":id"]["scopes"][":scopeId"]["$patch"], 200>;

export function updateProjectScopeMutationOptions(
  projectId: string,
  scopeId: number,
  options?: Omit<UseMutationOptions<Response, Error, Request>, "mutationFn">,
) {
  return mutationOptions({
    ...options,
    mutationFn: async (data) => {
      const res = await honoClient.api.projects[":id"].scopes[":scopeId"].$patch({
        param: {
          id: projectId,
          scopeId: String(scopeId),
        },
        json: data,
      });

      if (!res.ok) {
        throw new Error("Error updating project jobsite profile");
      }

      const updatedProjectScope = res.json();

      return updatedProjectScope;
    },
  });
}

export function useUpdateProjectScope(
  projectId: string,
  scopeId: number,
  options?: Omit<UseMutationOptions<Response, Error, Request>, "mutationFn">,
) {
  return useMutation(updateProjectScopeMutationOptions(projectId, scopeId, options));
}

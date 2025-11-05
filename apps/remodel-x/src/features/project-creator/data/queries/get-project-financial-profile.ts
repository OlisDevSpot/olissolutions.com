import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import { queryOptions, useQuery } from "@tanstack/react-query"; 

import { projectQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api["projects"][":id"]["financial-profile"]["$get"]>;
export type Response = InferResponseType<typeof honoClient.api["projects"][":id"]["financial-profile"]["$get"], 200>;

export function getProjectFinancialProfileQueryOptions(
  projectId: string,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    ...options,
    queryKey: projectQueryKeys.withFinancialProfile(projectId),
    queryFn: async () => {
      const res = await honoClient.api.projects[":id"]["financial-profile"].$get({ param: {
        id: projectId,
      } });

      if (!res.ok) {
        throw new Error("Project financial profile not found");
      }

      const data = await res.json();

      return data;
    },
  });
}

export function useGetProjectFinancialProfile(
  projectId: string,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getProjectFinancialProfileQueryOptions(projectId, options));
}

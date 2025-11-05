import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import { queryOptions, useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api["projects"][":id"]["$get"]>;
export type Response = InferResponseType<typeof honoClient.api["projects"][":id"]["$get"], 200>;

export function getProjectQueryOptions(
  projectId: string,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: 30,
    ...options,
    queryKey: projectQueryKeys.byId(projectId),
    queryFn: async () => {
      const res = await honoClient.api.projects[":id"].$get({ param: {
        id: projectId,
      } });

      if (!res.ok) {
        throw new Error("Project not found");
      }

      const data = await res.json();

      return data;
    },
  });
}

export function useGetProject(
  projectId: string,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getProjectQueryOptions(projectId, options));
}

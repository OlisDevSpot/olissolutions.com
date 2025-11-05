import type { PaginationParams } from "@olis/core/types";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

import { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import { queryOptions, useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "../query-keys";

export type Response = InferResponseType<typeof honoClient.api["projects"]["$get"], 200>;

export function getProjectsQueryOptions(
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    ...options,
    queryKey: projectQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.projects.$get({ query: {
        joinCustomers: "true",
      } });

      if (!res.ok) {
        throw new Error("Projects not found");
      }
      
      const projects = await res.json();
      console.log(projects);

      return projects;
    },
  });
}

export function useGetProjects(
  params?: PaginationParams,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getProjectsQueryOptions(params, options));
}

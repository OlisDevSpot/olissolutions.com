import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { honoClient } from "@/shared/clients/hono-client";

import { solutionQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api.solutions[":id"]["variables"]["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.solutions[":id"]["variables"]["$get"], 200>;

export function getSolutionVariablesQueryOptions(
  solutionId: number,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: solutionQueryKeys.withVariables(solutionId),
    queryFn: async () => {
      const res = await honoClient.api.solutions[":id"].variables.$get({ param: {
        id: String(solutionId),
      } });

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const variables = await res.json();
      return variables;
    },
  });
}

export function useGetSolutionVariables(
  solutionId: number,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getSolutionVariablesQueryOptions(solutionId, options));
}

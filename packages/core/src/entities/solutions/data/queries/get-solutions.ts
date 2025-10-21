import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { honoClient } from "@/shared/clients/hono-client";

import { solutionQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api.solutions["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.solutions["$get"], 200>;

export function getSolutionsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: solutionQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.solutions.$get();

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const solutions = await res.json();
      return solutions;
    },

  });
}

export function useGetSolutions(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getSolutionsQueryOptions(options));
}

import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { honoClient } from "@/shared/clients/hono-client";

import { solutionQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api.solutions["with-benefits"]["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.solutions["with-benefits"]["$get"], 200>;

export function getSolutionsWithBenefitsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: solutionQueryKeys.allWithBenefits,
    queryFn: async () => {
      const res = await honoClient.api.solutions["with-benefits"].$get();

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const solutions = await res.json();
      return solutions;
    },

  });
}

export function useGetSolutionsWithBenefits(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getSolutionsWithBenefitsQueryOptions(options));
}

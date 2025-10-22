import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { honoClient } from "@/shared/clients/hono-client";

import { benefitQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api.benefits["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.benefits["$get"], 200>;

export function getBenefitsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: benefitQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.benefits.$get();

      if (!res.ok) {
        throw new Error("Trades not found");
      }

      const benefits = await res.json();
      
      return benefits;
    },

  });
}

export function useGetBenefits(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getBenefitsQueryOptions(options));
}

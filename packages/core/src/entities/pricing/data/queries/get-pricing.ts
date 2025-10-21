import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { honoClient } from "@/shared/clients/hono-client";

import { pricingQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api.pricing["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.pricing["$get"], 200>;

export function getPricingQueryOptions(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: pricingQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.pricing.$get();

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const pricing = await res.json();
      return pricing;
    },

  });
}

export function useGetPricing(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getPricingQueryOptions(options));
}

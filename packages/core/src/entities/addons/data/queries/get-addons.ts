import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { honoClient } from "@/shared/clients/hono-client";

import { addonQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api.addons["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.addons["$get"], 200>;

export function getAddonsQueryOptions(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: addonQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.addons.$get();

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const addons = await res.json();
      return addons;
    },

  });
}

export function useGetAddons(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getAddonsQueryOptions(options));
}

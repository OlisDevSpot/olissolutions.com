import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import type { AddonAccessor } from "@/shared/entities/addons/types";

import { honoClient } from "@/shared/clients/hono-client";
import { addonQueryKeys } from "@/shared/entities/addons/data/query-keys";

export type Request = InferRequestType<typeof honoClient.api.addons[":accessor"]["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.addons[":accessor"]["$get"], 200>;

export function getAddonByAccessorQueryOptions(
  addonAccessor: AddonAccessor,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: addonQueryKeys.byAccessor(addonAccessor),
    queryFn: async () => {
      const res = await honoClient.api.addons[":accessor"].$get({ param: {
        accessor: addonAccessor
      } })

      if (!res.ok) {
        throw new Error("Trades not found");
      }

      const addon = await res.json();
      return addon
    },
  });
}

export function useGetAddonByAccessor(
  addonAccessor: AddonAccessor,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getAddonByAccessorQueryOptions(addonAccessor, options));
}

import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import type { MaterialAccessor } from "@/shared/entities/materials/types";

import { honoClient } from "@/shared/clients/hono-client";
import { materialQueryKeys } from "@/shared/entities/materials/data/query-keys";

export type Request = InferRequestType<typeof honoClient.api.materials[":accessor"]["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.materials[":accessor"]["$get"], 200>;

export function getMaterialByAccessorQueryOptions(
  materialAccessor: MaterialAccessor,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: materialQueryKeys.byAccessor(materialAccessor),
    queryFn: async () => {
      const res = await honoClient.api.materials[":accessor"].$get({ param: {
        accessor: materialAccessor
      } })

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const material = await res.json();
      return material
    },
  });
}

export function useGetMaterialByAccessor(
  materialAccessor: MaterialAccessor,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getMaterialByAccessorQueryOptions(materialAccessor, options));
}

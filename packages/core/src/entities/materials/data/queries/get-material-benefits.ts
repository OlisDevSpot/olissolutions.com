import type { UseQueryOptions } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { honoClient } from "@/shared/clients/hono-client";

import { materialQueryKeys } from "../query-keys";

export type Request = InferRequestType<typeof honoClient.api.materials[":id"]["benefits"]["$get"]>;
export type Response = InferResponseType<typeof honoClient.api.materials[":id"]["benefits"]["$get"], 200>;

export function getMaterialBenefitsQueryOptions(
  materialId: number,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: materialQueryKeys.withBenefits(materialId),
    queryFn: async () => {
      const res = await honoClient.api.materials[":id"].benefits.$get({ param: {
        id: String(materialId),
      } });

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const benefits = await res.json();
      return benefits;
    },

  });
}

export function useGetMaterialBenefits(
  materialId: number,
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  return useQuery(getMaterialBenefitsQueryOptions(materialId, options));
}

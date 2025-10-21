import type { UseQueryOptions } from "@tanstack/react-query";

import { queryOptions, useQuery } from "@tanstack/react-query";

import type { GetUpgradeSolutionsResponse } from "@/shared/entities/upgrades/types";

import { honoClient } from "@/shared/clients/hono-client";
import { upgradeQueryKeys } from "@/shared/entities/upgrades/data/query-keys";

export function getUpgradeSolutionsQueryOptions(
  upgradeId: number,
  options?: Omit<UseQueryOptions<GetUpgradeSolutionsResponse>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: upgradeQueryKeys.withSolutions(upgradeId),
    queryFn: async () => {
      const res = await honoClient.api.upgrades[":id"].solutions.$get({ param: {
        id: String(upgradeId),
      } });

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const solutions = await res.json();
      return solutions;
    },
  });
}

export function useGetUpgradeSolutions(
  upgradeId: number,
  options?: Omit<UseQueryOptions<GetUpgradeSolutionsResponse>, "queryKey" | "queryFn">,
) {
  return useQuery(getUpgradeSolutionsQueryOptions(upgradeId, options));
}

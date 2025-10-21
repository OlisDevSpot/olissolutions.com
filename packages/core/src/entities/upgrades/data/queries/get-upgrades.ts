import type { UseQueryOptions } from "@tanstack/react-query";

import { queryOptions, useQuery } from "@tanstack/react-query";

import type { GetUpgradesResponse } from "@/shared/entities/upgrades/types";

import { honoClient } from "@/shared/clients/hono-client";
import { upgradeQueryKeys } from "@/shared/entities/upgrades/data/query-keys";

export function getUpgradesQueryOptions(
  options?: Omit<UseQueryOptions<GetUpgradesResponse>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: upgradeQueryKeys.all,
    queryFn: async () => {
      const res = await honoClient.api.upgrades.$get();

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const upgrades = await res.json();
      return upgrades;
    },

  });
}

export function useGetUpgrades(
  options?: Omit<UseQueryOptions<GetUpgradesResponse>, "queryKey" | "queryFn">,
) {
  return useQuery(getUpgradesQueryOptions(options));
}

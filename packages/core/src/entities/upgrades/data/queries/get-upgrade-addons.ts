import type { UseQueryOptions } from "@tanstack/react-query";

import { queryOptions, useQuery } from "@tanstack/react-query";

import type { GetUpgradeAddonsResponse } from "@/shared/entities/upgrades/types";

import { honoClient } from "@/shared/clients/hono-client";
import { upgradeQueryKeys } from "@/shared/entities/upgrades/data/query-keys";

export function getUpgradeAddonsQueryOptions(
  upgradeId: number,
  options?: Omit<UseQueryOptions<GetUpgradeAddonsResponse>, "queryKey" | "queryFn">,
) {
  return queryOptions({
    staleTime: Infinity,
    ...options,
    queryKey: upgradeQueryKeys.withAddons(upgradeId),
    queryFn: async () => {
      const res = await honoClient.api.upgrades[":id"].addons.$get({ param: {
        id: String(upgradeId),
      } });

      if (!res.ok) {
        throw new Error("Upgrades not found");
      }

      const upgradeAddons = await res.json();
      return upgradeAddons;
    },
  });
}

export function useGetUpgradeAddons(
  upgradeId: number,
  options?: Omit<UseQueryOptions<GetUpgradeAddonsResponse>, "queryKey" | "queryFn">,
) {
  return useQuery(getUpgradeAddonsQueryOptions(upgradeId, options));
}

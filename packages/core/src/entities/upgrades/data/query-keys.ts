import type { PaginationParams } from "@/types";

export const upgradeQueryKeys = {
  all: ["upgrades"] as const,
  filtered: (params: PaginationParams) => [...upgradeQueryKeys.all, params] as const,
  byId: (id: number) => [...upgradeQueryKeys.all, id] as const,
  withSolutions: (id: number) => [...upgradeQueryKeys.byId(id), "solutions"] as const,
  withAddons: (id: number) => [...upgradeQueryKeys.byId(id), "addons"] as const,
};

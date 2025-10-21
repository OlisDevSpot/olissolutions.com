import type { PaginationParams } from "@workspace/core/types";

export const addonQueryKeys = {
  all: ["addons"] as const,
  filtered: (params: PaginationParams) => [...addonQueryKeys.all, params] as const,
  byId: (id: number) => [...addonQueryKeys.all, id] as const,
  byAccessor: (accessor: string) => [...addonQueryKeys.all, accessor] as const,
};

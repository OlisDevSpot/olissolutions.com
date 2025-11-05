import type { PaginationParams } from "@olis/core/types";

export const projectQueryKeys = {
  all: ["projects"] as const,
  filtered: (params: PaginationParams) => [...projectQueryKeys.all, params] as const,
  byId: (id: string) => [...projectQueryKeys.all, id] as const,
  withCustomers: (id: string) => [...projectQueryKeys.byId(id), "customers"] as const,
  withScopes: (id: string) => [...projectQueryKeys.byId(id), "scopes"] as const,
  withJobsite: (id: string) => [...projectQueryKeys.byId(id), "jobsite"] as const,
  withFinancialProfile: (id: string) => [...projectQueryKeys.byId(id), "financial-profile"] as const,
};

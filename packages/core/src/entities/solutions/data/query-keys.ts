import type { PaginationParams } from "@workspace/core/types";

export const solutionQueryKeys = {
  all: ["solutions"] as const,
  allWithBenefits: ["solutions", "with-benefits"] as const,
  filtered: (params: PaginationParams) => [...solutionQueryKeys.all, params] as const,
  byId: (id: number) => [...solutionQueryKeys.all, id] as const,
  byAccessor: (accessor: string) => [...solutionQueryKeys.all, accessor] as const,
  withVariables: (id: number) => [...solutionQueryKeys.byId(id), "variables"] as const,
  withBenefits: (id: number) => [...solutionQueryKeys.byId(id), "benefits"] as const,
};

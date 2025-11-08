import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useGetProjectFinancialProfile(projectId: string) {
  const trpc = useTRPC();
  return useQuery(trpc.projects.findProjectFinancialProfile.queryOptions({ projectId }));
}

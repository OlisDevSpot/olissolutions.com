import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useGetProjectScopes(projectId: string) {
  const trpc = useTRPC();
  return useQuery(trpc.projects.scopes.findProjectScopes.queryOptions({ projectId }));
}

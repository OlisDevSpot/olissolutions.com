import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useGetProjectJobsite(projectId: string) {
  const trpc = useTRPC()
  return useQuery(trpc.projects.jobsite.findProjectJobsite.queryOptions({ projectId }));
}

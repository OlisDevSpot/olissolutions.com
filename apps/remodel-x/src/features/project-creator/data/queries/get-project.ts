import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useGetProject(projectId: string, { enabled }: { enabled?: boolean } = {}) {
  const trpc = useTRPC()
  return useQuery(trpc.projects.findOne.queryOptions({ projectId }, { 
    enabled
  }));
}

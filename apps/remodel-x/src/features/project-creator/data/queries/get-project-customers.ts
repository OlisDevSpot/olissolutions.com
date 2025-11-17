import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useGetProjectCustomers(projectId: string) {
  const trpc = useTRPC()
  return useQuery(trpc.projects.customers.findProjectCustomers.queryOptions({ projectId }));
}

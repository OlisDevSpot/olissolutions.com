import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useUpdateProjectScope() {
  const trpc = useTRPC();
  return useMutation(trpc.projects.scopes.updateProjectScope.mutationOptions());
}

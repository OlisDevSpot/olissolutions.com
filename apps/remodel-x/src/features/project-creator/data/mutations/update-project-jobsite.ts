import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useUpdateProjectJobsite() {
  const trpc = useTRPC()
  return useMutation(trpc.projects.updateJobsite.mutationOptions());
}

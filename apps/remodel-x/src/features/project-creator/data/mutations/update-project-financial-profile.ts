import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function useUpdateProjectFinancialProfile() {
  const trpc = useTRPC()
  return useMutation(trpc.projects.updateFinancialProfile.mutationOptions());
}

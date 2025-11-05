import type { UseMutationOptions } from "@tanstack/react-query";
import type { InferResponseType } from "hono";

import { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import { mutationOptions, useMutation } from "@tanstack/react-query";

import type { InitProjectFormSchema } from "@/features/project-creator/ui/components/forms/init-project-form/schemas";

export type Reponse = InferResponseType<typeof honoClient.api["projects"]["init"]["$post"], 201>;

export function initProjectMutationOptions(
  options?: Omit<UseMutationOptions<Reponse, Error, InitProjectFormSchema>, "mutationFn">,
) {
  return mutationOptions({
    ...options,
    mutationFn: async (data: InitProjectFormSchema) => {
      const res = await honoClient.api.projects.init.$post({ json: {
        projectData: data.project,
        customerData: data.customer,
        jobsiteData: data.jobsite,
      } });

      if (!res.ok) {
        throw new Error("Error creating project");
      }

      const project = await res.json();

      return project;
    },
  });
}

export function useInitProject(
  options?: UseMutationOptions<Reponse, Error, InitProjectFormSchema>,
) {
  return useMutation(initProjectMutationOptions(options));
}

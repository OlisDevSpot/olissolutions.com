import type { UseQueryOptions } from "@tanstack/react-query";

import type { Response } from "@/features/project-creator/data/queries/get-project";

import { useGetProject } from "@/features/project-creator/data/queries/get-project";

import { useCurrentProjectId } from "./use-current-project-id";

export function useCurrentProject(
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">,
) {
  const projectId = useCurrentProjectId();
  const project = useGetProject(projectId, options);

  return project;
}

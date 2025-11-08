import { useGetProject } from "@/features/project-creator/data/queries/get-project";

import { useCurrentProjectId } from "./use-current-project-id";

export function useCurrentProject({ enabled = true }: { enabled?: boolean } = {}) {
  const projectId = useCurrentProjectId();
  const project = useGetProject(projectId, { enabled });

  return project;
}

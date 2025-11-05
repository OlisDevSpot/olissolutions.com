"use client";

import { Loader2 } from "lucide-react";

import { useCurrentProject } from "@/features/project-creator/hooks/use-current-project";
import { ProjectHomeSituationForm } from "@/features/project-creator/ui/components/forms/update-home-situation-form";

export function ProjectHomeSituationView() {
  const { data: project, isLoading } = useCurrentProject();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return <div className="w-full h-full flex items-center justify-center">Project not found!</div>;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-full flex flex-col gap-6">
        <ProjectHomeSituationForm projectId={project.id} />
      </div>
    </div>
  );
}

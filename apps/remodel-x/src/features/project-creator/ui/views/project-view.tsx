"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect } from "react";

import { useGetProject } from "@/features/project-creator/data/queries/get-project";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { ProjectProgress } from "@/features/project-creator/ui/components/info-cards/project-progress";
import { ProjectSummary } from "@/features/project-creator/ui/components/info-cards/project-summary";
import { PropertyInfo } from "@/features/project-creator/ui/components/info-cards/property-info";
import { SimpleMap } from "@/features/project-creator/ui/components/simple-map";
import { useTRPC } from "@/trpc/client";

export function ProjectView() {
  const projectId = useCurrentProjectId();
  const queryClient = useQueryClient();
  const trpc = useTRPC()
  const { data: project, isLoading } = useGetProject(projectId);

  const prefetch = useCallback(() => {
    queryClient.prefetchQuery(trpc.projects.customers.findProjectCustomers.queryOptions({ projectId }));
    queryClient.prefetchQuery(trpc.projects.scopes.findProjectScopes.queryOptions({ projectId }));
    queryClient.prefetchQuery(trpc.projects.jobsite.findProjectJobsite.queryOptions({ projectId }));
    queryClient.prefetchQuery(trpc.projects.financialProfile.findProjectFinancialProfile.queryOptions({ projectId }));
  }, [projectId, queryClient]);

  useEffect(() => {
    prefetch();
  }, [prefetch]);

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

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 grid-rows-auto h-full order-2 lg:order-1 grow min-h-0 overflow-y-auto">

          <div className="h-auto overflow-y-auto rounded-xl">
            <div className="flex flex-col gap-4 self-start overflow-y-auto">
              <ProjectProgress project={project} />
              <PropertyInfo projectId={project.id} />
              <ProjectSummary project={project} />
            </div>
          </div>
          <div className="rounded-lg w-full h-auto overflow-hidden xl:col-span-2 order-first lg:order-2 min-h-56">
            <SimpleMap street={project.address} city={project.city} />
          </div>
        </div>
      </div>
    </div>
  );
}

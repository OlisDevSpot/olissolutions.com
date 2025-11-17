"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import type { Scope } from "@olis/db/schema/platform";

import { useCreateProjectScopes } from "@/features/project-creator/data/mutations/create-project-scopes";
import { useGetProjectScopes } from "@/features/project-creator/data/queries/get-project-scopes";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { useProjectScopesStore } from "@/features/project-creator/hooks/use-project-scopes-store";
import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { useTRPC } from "@/trpc/client";
import { Button } from "@olis/ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@olis/ui/components/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@olis/ui/components/tooltip";

import { projectScopesSteps } from "./sections"

export function ProjectScopes() {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const projectId = useCurrentProjectId();
  const projectScopes = useGetProjectScopes(projectId);
  const mutation = useCreateProjectScopes({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.projects.scopes.findProjectScopes.queryOptions({ projectId }));
    },
  });

  const { selectedScopes, addScopes, removeScopes } = useProjectScopesStore();

  useEffect(() => {
    function syncStoreData(scopes: Scope[]) {
      removeScopes();

      if (scopes.length === 0) {
        return;
      }

      addScopes(scopes);
    }

    if (projectScopes.data) {
      syncStoreData(projectScopes.data.map(projectScope => projectScope.scope));
    }
  }, [projectScopes.data]);

  function handleSave() {
    mutation.mutate({
      projectId,
      scopeIds: selectedScopes.map(scope => scope.id),
    }, {
      onSuccess: () => {
        toast.success("Project scopes updated");
      },
    });
  }

  function handleReset() {
    mutation.mutate({
      projectId,
      scopeIds: [],
    }, {
      onSuccess: () => {
        toast.success("Project scopes removed!");
      },
    });
  }

  return (
    <div className="w-full h-full min-h-0">
      <ProjectFlowSection className="h-full p-0">
        <ProjectFlowSection.Content className="px-0 flex h-full ">
          <Tabs defaultValue={projectScopesSteps[0]!.accessor} className="w-full bg-transparent">
            <div className="flex w-full justify-between shrink-0">
              <TabsList className="h-[120px] bg-transparent dark:bg-transparent">
                {projectScopesSteps.map(({ label, accessor, description }) => (
                  <TabsTrigger key={accessor} minimalCSS value={accessor} className="flex items-center justify-center w-[300px] dark:data-[state=active]:bg-transparent data-[state=active]:outline-none border-b-white rounded-b-none border-b-0 data-[state=active]:border-b-4 p-2 [&_h3]:text-white/30 [&_p]:text-muted-foreground/30 data-[state=active]:[&_h3]:text-white data-[state=active]:[&_p]:text-muted-foreground">
                    <div className="w-full h-fit justify-start">
                      <h3 className="font-semibold text-lg">{label}</h3>
                      <p className="text-muted-foreground font-sm text-nowrap text-clip">{description}</p>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex items-center gap-2 pr-8">
                <Button variant="destructive" disabled={!projectScopes.data?.length || mutation.isPending} onClick={handleReset}>Reset</Button>
                <Tooltip>
                  <TooltipTrigger asChild disabled={!selectedScopes.length}>
                    <Button variant="outline" className="cursor-auto">
                      {selectedScopes.length}
                      {" "}
                      selected
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-popover text-popover-foreground px-3">
                    <div className="flex flex-col gap-1">
                      {selectedScopes.map(scope => (
                        <span key={scope.id} className="flex items-center gap-1 text-sm">
                          •
                          {" "}
                          <p key={scope.id}>{scope.label}</p>
                        </span>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
                <Button disabled={!selectedScopes.length || mutation.isPending} onClick={handleSave}>Save</Button>
              </div>
            </div>

            <div className="w-full grow min-h-0 overflow-y-auto ">
              {projectScopesSteps.map(({ accessor, Component }) => (
                <TabsContent value={accessor} key={accessor} className="h-full">
                  <div className="p-4 h-full overflow-y-auto">
                    <Component />
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </ProjectFlowSection.Content>
      </ProjectFlowSection>
    </div>
  );
}

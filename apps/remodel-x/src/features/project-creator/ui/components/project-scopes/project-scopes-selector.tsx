import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Scope } from "@olis/db/schema/platform";

import { useCreateProjectScopes } from "@/features/project-creator/data/mutations/create-project-scopes";
import { useGetProjectScopes } from "@/features/project-creator/data/queries/get-project-scopes";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { useProjectScopesStore } from "@/features/project-creator/hooks/use-project-scopes-store";
import { ProjectFlowSection } from "@/features/project-creator/ui/components/project-flow-section";
import { ScopeSelector } from "@/shared/entities/scopes/ui/components/scope-selector";
import { AddonSelector } from "@/shared/entities/trades/ui/components/addon-selector";
import { TradeSelector } from "@/shared/entities/trades/ui/components/trade-selector";
import { useTRPC } from "@/trpc/client";
import { Button } from "@olis/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@olis/ui/components/tooltip";

export function ProjectScopesSelector() {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [currentTradeId, setCurrentTradeId] = useState<number | null>(null);

  const projectId = useCurrentProjectId();
  const projectScopes = useGetProjectScopes(projectId);
  const mutation = useCreateProjectScopes({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.projects.findProjectScopes.queryOptions({ projectId }));
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
    <div className="w-full grow min-h-0">
      <ProjectFlowSection className="h-full">
        <ProjectFlowSection.Header title="Scopes Selection" description="Select the scopes for the project" className="justify-between items-start">
          <div className="flex items-center gap-2">
            <Button variant="destructive" disabled={!projectScopes.data?.length || mutation.isPending} onClick={handleReset}>Reset</Button>
            <Tooltip>
              <TooltipTrigger asChild disabled={!selectedScopes.length}>
                <Button variant="outline" className="cursor-auto">
                  {selectedScopes.length}
                  {" "}
                  selected
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-popover text-popover-foreground 1px-3">
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
        </ProjectFlowSection.Header>
        <ProjectFlowSection.Content>
          <div className="w-full h-full grid grid-cols-[200px_1fr_200px] gap-8">
            <div className="w-full h-full overflow-y-auto">
              <TradeSelector currentTradeId={currentTradeId} setCurrentTradeId={setCurrentTradeId} />
            </div>
            <div className="w-full h-full overflow-y-auto main-container">
              <ScopeSelector currentTradeId={currentTradeId} />
            </div>
            <div className="w-full h-full overflow-y-auto">
              <AddonSelector currentTradeId={currentTradeId} />
            </div>
          </div>
        </ProjectFlowSection.Content>
      </ProjectFlowSection>
    </div>
  );
}

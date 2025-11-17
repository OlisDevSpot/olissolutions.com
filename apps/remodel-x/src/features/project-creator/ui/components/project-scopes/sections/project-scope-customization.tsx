import { useGetScopeVariables } from "@olis/data-client/fetchers/platform/scopes/queries/get-scope-variables";
import { useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Scope } from "@olis/db/schema/platform";

import { useGetProjectJobsite } from "@/features/project-creator/data/queries/get-project-jobsite-profile";
import { useGetProjectScopes } from "@/features/project-creator/data/queries/get-project-scopes";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { useProjectScopesStore } from "@/features/project-creator/hooks/use-project-scopes-store";
import { UpdateProjectScopeForm } from "@/features/project-creator/ui/components/forms/update-project-scope-form";
import { ProjectFinancialsColumn } from "@/features/project-creator/ui/components/project-financials/project-financials-column";
import { useScopeInfoDialogStore } from "@/shared/entities/scopes/hooks/use-scope-info-dialog-store";
import { useTRPC } from "@/trpc/client";
import { ROOTS } from "@olis/core/constants";
import { Button } from "@olis/ui/components/button";
import { Card } from "@olis/ui/components/card";
import { LoadingState } from "@olis/ui/components/states/loading-state";

export function ProjectScopeCustomization() {
  const queryClient = useQueryClient();
  const trpc = useTRPC()
  const projectId = useCurrentProjectId();
  
  const jobsite = useGetProjectJobsite(projectId);
  const projectScopes = useGetProjectScopes(projectId);
  const { open: showInfoModal } = useScopeInfoDialogStore();
  const { removeScopes, addScopes } = useProjectScopesStore();
  const [currentScope, setCurrentScope] = useState<Scope | null>(null);
  const scopeVariables = useGetScopeVariables(currentScope?.id || -1, { enabled: !!currentScope });

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
  
  if (projectScopes.isLoading || jobsite.isLoading) {
    return (
      <LoadingState
        title="Loading financials..." 
        description="This might take a few seconds"
      />
    );
  }
  
  if (!jobsite.data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p>Project jobsite not configured!</p>
          <Button>
            <Link href={`${ROOTS.remodelX.getProjectsRoot()}/${projectId}/property`}>Configure jobsite</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  if (!projectScopes.data || projectScopes.data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p>Project scopes not set!</p>
          <Button>
            <Link href={`${ROOTS.remodelX.getProjectsRoot()}/${projectId}/scopes`}>Set scopes</Link>
          </Button>
        </div>
      </div>
    );
  }

  function showInfo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, scope: Scope) {
    e.stopPropagation();
    showInfoModal(scope);
  }

  function prefetch(scopeId: number) {
    queryClient.prefetchQuery(trpc.platform.scopes.findScopeVariables.queryOptions({ id: scopeId }));
  }
  
  return (
    <div className="flex gap-8 h-full">
      <ProjectFinancialsColumn title="Scopes" className="max-w-[250px]">
        {projectScopes.data?.map(({ scope }) => (
          <Card
            key={scope.id}
            data-selected={scope.id === currentScope?.id}
            className="aspect-square group cursor-pointer hover:shadow-lg brightness-50 hover:brightness-90 transition-all duration-300 border-0 bg-card rounded-lg overflow-hidden p-0 data-[selected=true]:border-primary data-[selected=true]:border-2 data-[selected=true]:brightness-100"
            onMouseEnter={() => prefetch(scope.id)}
            onClick={() => {
              if (scope.id === currentScope?.id) {
                setCurrentScope(null);
              }
              else {
                setCurrentScope(scope);
              }
            }}
          >
            <div className="relative h-full overflow-hidden">
              <img
                src={scope.imageUrl || undefined}
                alt={scope.label}
                className="object-cover group-hover:scale-105 transition-transform duration-500 h-full w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-3 left-3 text-foreground z-10">
                <h3 className="text-lg font-semibold group-hover:text-primary-foreground transition-colors">
                  {scope.label}
                </h3>
              </div>
              <div className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-transparent" />
              <div className="absolute top-12 left-3">
                <a href={`https://www.google.com/search?q=${scope.label.replace(/[^a-z0-9 ]/gi, "").replace(" ", "+")}+replacement+cost+california`} target="_blank" rel="noopener noreferrer" className="absolute w-full min-w-max text-foreground text-semibold bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md text-sm hover:bg-background/70 transition" onClick={e => e.stopPropagation()}>Compare on Google</a>
              </div>
              <div className="absolute top-3 right-3">
                <Button variant="ghost" onClick={e => showInfo(e, scope)}>
                  <Info className="size-6" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </ProjectFinancialsColumn>
      {scopeVariables.data && currentScope && (
        <ProjectFinancialsColumn className="w-full h-full">
          {currentScope && scopeVariables.data && (
            <UpdateProjectScopeForm
              projectVars={{
                numStories: jobsite.data.numStories || 1,
                roofType: jobsite.data.roofs?.roofType || "shingle",
              }}
              scope={currentScope}
              scopeVariables={scopeVariables.data}
            />
          )}
        </ProjectFinancialsColumn>
      )}
    </div>
  )
}

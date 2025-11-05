"use client";

import { getScopeVariablesQueryOptions, useGetScopeVariables } from "@olis/data-client/fetchers/platform/scopes/queries/get-scope-variables";
import { useGetPricing } from "@olis/data-client/fetchers/remodel-x/pricing/queries/get-pricing";
import { useQueryClient } from "@tanstack/react-query";
import { Info, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Scope } from "@olis/db/schema/platform";

import { useGetProjectJobsite } from "@/features/project-creator/data/queries/get-project-jobsite-profile";
import { useGetProjectScopes } from "@/features/project-creator/data/queries/get-project-scopes";
import { useCurrentProjectId } from "@/features/project-creator/hooks/use-current-project-id";
import { useProjectScopesStore } from "@/features/project-creator/hooks/use-project-scopes-store";
import { UpdateProjectScopeForm } from "@/features/project-creator/ui/components/forms/update-project-scope-form";
import { aggregatePricingByTrade } from "@/shared/entities/pricing/mappers";
import { useScopeInfoDialogStore } from "@/shared/entities/scopes/hooks/use-scope-info-dialog-store";
import { ROOTS } from "@olis/core/constants";
import { numberToUSD } from "@olis/core/lib/formatters";
import { Button } from "@olis/ui/components/button";
import { Card } from "@olis/ui/components/card";
import { LoadingState } from "@olis/ui/components/global/loading-state";
import { Separator } from "@olis/ui/components/separator";

import { ProjectFinancialsColumn } from "../components/project-financials/project-financials-column";

export function ProjectFinancialsView() {
  const queryClient = useQueryClient();

  const projectId = useCurrentProjectId();
  const pricing = useGetPricing();
  const jobsite = useGetProjectJobsite(projectId);
  const projectScopes = useGetProjectScopes(projectId);

  const { removeScopes, addScopes, selectedScopes, updateScopePricing } = useProjectScopesStore();
  const { open: showInfoModal } = useScopeInfoDialogStore();

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
            <Link href={`${ROOTS.saleos.getProjectsRoot()}/${projectId}/property`}>Configure jobsite</Link>
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
            <Link href={`${ROOTS.saleos.getProjectsRoot()}/${projectId}/scopes`}>Set scopes</Link>
          </Button>
        </div>
      </div>
    );
  }

  function prefetch(scopeId: number) {
    queryClient.prefetchQuery(getScopeVariablesQueryOptions(scopeId));
  }

  function showInfo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, scope: Scope) {
    e.stopPropagation();
    showInfoModal(scope);
  }

  function calculateTotals() {
    const price = selectedScopes.reduce((total, scope) => total + scope.pricing.price, 0);
    const tax = selectedScopes.reduce((total, scope) => total + scope.pricing.tax, 0);
    const priceBase = price - tax;
    return { price, tax, priceBase };
  }

  const total = calculateTotals().price || 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="h-full flex gap-6">
        <ProjectFinancialsColumn title="Scopes" className="max-w-[250px]">
          {projectScopes.data.map(({ scope }) => (
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
        <ProjectFinancialsColumn title="Variables" className="w-full">
          {currentScope && scopeVariables.data && pricing.data && (
            <UpdateProjectScopeForm
              pricingVars={aggregatePricingByTrade(pricing.data)}
              projectVars={{
                numStories: jobsite.data.numStories || 1,
                roofType: jobsite.data.roofs?.roofType || "shingle",
              }}
              scope={currentScope}
              scopeVariables={scopeVariables.data}
            />
          )}
        </ProjectFinancialsColumn>
        <ProjectFinancialsColumn title="Totals" className="w-full">
          <div className="w-full grow flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {selectedScopes.filter(scope => scope.pricing.price > 0).map(scope => (
                <div key={scope.id} className="relative group w-full flex flex-col gap-2 p-2">
                  <div
                    className="group-hover:bg-black/10 absolute inset-0 group-hover:backdrop-blur-xs rounded-lg transition cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  >
                    <Button
                      onClick={() => updateScopePricing(scope.id, null)}
                      variant="destructive"
                      className="flex gap-2"
                    >
                      <Trash className="h-4 w-4" />
                      Remove from project
                    </Button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span key={scope.id} className="w-full flex items-center gap-2">
                      <p>{scope.label}</p>
                      <span className="grow border-b border-dashed pt-3" />
                      {numberToUSD(scope.pricing.price)}
                    </span>
                    <span className="pl-6 text-muted-foreground text-sm w-full flex items-center justify-between">
                      <p>Base</p>
                      {numberToUSD(scope.pricing.priceBase)}
                    </span>
                    <span className="pl-6 text-muted-foreground text-sm w-full flex items-center justify-between">
                      <p>Tax</p>
                      {numberToUSD(scope.pricing.tax)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {total > 0 && (
              <>
                <Separator />
                <span className="w-full flex items-center justify-between font-bold">
                  <p>Total</p>
                  {numberToUSD(calculateTotals().price || 0)}
                </span>
              </>
            )}
          </div>
        </ProjectFinancialsColumn>
      </div>
    </div>
  );
}

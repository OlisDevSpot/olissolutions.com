"use client";

import { ArrowLeft, Building, TrendingUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import type { ScopeAccessor } from "@olis/db/types"

import { ShowroomItemBenefits } from "@/features/showroom/ui/components/showroom-item-benefits";
import { ShowroomItemHero, ShowroomItemHeroStatCard } from "@/features/showroom/ui/components/showroom-item-hero";
import { ROOTS } from "@olis/core/constants";
import { useGetScopeByAccessor } from "@olis/data-client/fetchers/platform/scopes/queries/get-scope-by-accessor";
import { Button } from "@olis/ui/components/button";
import { LoadingState } from "@olis/ui/components/states/loading-state";

export function ScopeShowroomView() {
  const pathname = usePathname();
  const router = useRouter();
  const scopeAccessor = pathname.split("/").pop() as ScopeAccessor;
  const rawScope = useGetScopeByAccessor(scopeAccessor);

  if (rawScope.isLoading) {
    return (
      <LoadingState
        title="Loading scope details..."
        description="This might take a few seconds"
      />
    );
  }

  if (!rawScope.data) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Building className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Scope not found</h1>
        <p className="text-muted-foreground">The scope you're looking for doesn't exist</p>
        <Button onClick={() => router.push(`${ROOTS.remodelX.getShowroomRoot()}/scopes`)} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Scopes
        </Button>
      </div>
    );
  }

  const scope = { 
    ...rawScope.data, 
    type: "scope" as const
  }

  return (
    <ShowroomItemHero 
      type="scope"
      item={scope}
    >
      <ShowroomItemHero.Content badge="New badge">
        <ShowroomItemHero.Stats>
          <ShowroomItemHeroStatCard Icon={TrendingUp} title="ROI" value="10%" description="Return on investment is a lot!" />
        </ShowroomItemHero.Stats>
        <ShowroomItemBenefits />
      </ShowroomItemHero.Content>
    </ShowroomItemHero>
  );
}

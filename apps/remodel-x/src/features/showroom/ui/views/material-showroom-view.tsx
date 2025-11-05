"use client";

import { ROOTS } from "@olis/core/constants";
import { getMaterialBenefitsQueryOptions } from "@olis/data-client/fetchers/platform/materials/queries/get-material-benefits";
import { useGetMaterialByAccessor } from "@olis/data-client/fetchers/platform/materials/queries/get-material-by-accessor";
import { ArrowLeft, Building, TrendingUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import type { MaterialAccessor } from "@olis/db/types";

import { ShowroomItemBenefits } from "@/features/showroom/ui/components/showroom-item-benefits";
import { ShowroomItemHero, ShowroomItemHeroStatCard } from "@/features/showroom/ui/components/showroom-item-hero";
import { Button } from "@olis/ui/components/button";
import { LoadingState } from "@olis/ui/components/global/loading-state";

export function MaterialShowroomView() {
  const pathname = usePathname();
  const router = useRouter();
  const materialAccessor = pathname.split("/").pop() as MaterialAccessor;
  const material = useGetMaterialByAccessor(materialAccessor);

  if (material.isLoading) {
    return (
      <LoadingState
        title="Loading material details..."
        description="This might take a few seconds"
      />
    );
  }

  if (!material.data) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Building className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Material not found</h1>
        <p className="text-muted-foreground">The material you're looking for doesn't exist</p>
        <Button onClick={() => router.push(`${ROOTS.saleos.getShowroomRoot()}/materials`)} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Materials
        </Button>
      </div>
    );
  }

  return (
    <ShowroomItemHero 
      type="material"
      item={material.data}
    >
      <ShowroomItemHero.Content badge="New badge">
        <ShowroomItemHero.Stats>
          <ShowroomItemHeroStatCard Icon={TrendingUp} title="ROI" value="10%" description="Return on investment is a lot!" />
        </ShowroomItemHero.Stats>
        <ShowroomItemBenefits queryOptions={getMaterialBenefitsQueryOptions(material.data.id)} />
      </ShowroomItemHero.Content>
    </ShowroomItemHero>
  );
}

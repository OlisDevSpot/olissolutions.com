"use client";

import { ROOTS } from "@olis/core/constants";
import { useGetAddonByAccessor } from "@olis/data-client/fetchers/platform/addons/queries/get-addon-by-accessor";
import { ArrowLeft, Building, TrendingUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import type { AddonAccessor } from "@olis/db/types";

import { ShowroomItemHero, ShowroomItemHeroStatCard } from "@/features/showroom/ui/components/showroom-item-hero";
import { Button } from "@olis/ui/components/button";
import { LoadingState } from "@olis/ui/components/global/loading-state";

export function AddonShowroomView() {
  const pathname = usePathname();
  const router = useRouter();
  const addonAccessor = pathname.split("/").pop() as AddonAccessor;
  const addon = useGetAddonByAccessor(addonAccessor);

  if (addon.isLoading) {
    return (
      <LoadingState
        title="Loading addon details..."
        description="This might take a few seconds"
      />
    );
  }

  if (!addon.data) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Building className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Addon not found</h1>
        <p className="text-muted-foreground">The addon you're looking for doesn't exist</p>
        <Button onClick={() => router.push(`${ROOTS.remodelX.getShowroomRoot()}/addons`)} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Addons
        </Button>
      </div>
    );
  }

  return (
    <ShowroomItemHero 
      type="addon"
      item={addon.data}
    >
      <ShowroomItemHero.Content badge="New badge">
        <ShowroomItemHero.Stats>
          <ShowroomItemHeroStatCard Icon={TrendingUp} title="ROI" value="10%" description="Return on investment is a lot!" />
        </ShowroomItemHero.Stats>
      </ShowroomItemHero.Content>
    </ShowroomItemHero>
  );
}

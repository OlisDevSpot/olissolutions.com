"use client";

import { useGetScopesWithBenefits } from "@olis/data-client/fetchers/platform/scopes/queries/get-scopes-with-benefits";
import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { useState } from "react";

import { ShowroomGrid } from "@/features/showroom/ui/components/showroom-grid";
import { Button } from "@olis/ui/components/button";
import { LoadingState } from "@olis/ui/components/states/loading-state";

import { BenefitsList } from "../components/benefits-list";

export function EnergyEfficiencyBenefitsView() {
  const [selectedBenefits, setSelectedBenefits] = useState<number[]>([]);
  const scopesBenefits = useGetScopesWithBenefits();
  const trades = useGetTrades();

  if (!scopesBenefits.data && !scopesBenefits.isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Error fetching benefits</p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="min-w-max shrink-0">Efficient Construction Benefits</h1>
        <Button 
          variant="outline"
          className="w-fit" 
          size="sm" 
          onClick={() => setSelectedBenefits([])}
        >
          Reset
        </Button>
      </div>

      {scopesBenefits.isLoading
        ? (
            <LoadingState
              title="Loading benefits..." 
              description="This might take a few seconds"
            />
          )
        : (
            <div className="grow min-h-0 flex gap-4">
              <BenefitsList selectedBenefits={selectedBenefits} setSelectedBenefits={setSelectedBenefits} />
              <div className="grow overflow-y-auto space-y-8">
                {trades.data?.map((trade) => {
                  const scopesOfTrade = scopesBenefits.data?.filter(scope => scope.tradeId === trade.id);

                  if (!scopesOfTrade || scopesOfTrade.length === 0) {
                    return null;
                  }

                  const scopes = scopesOfTrade.filter(scope => scope.benefits.map(benefit => benefit.id).some(id => selectedBenefits.includes(id)))
                  
                  if (!scopes || scopes.length === 0) {
                    return null;
                  }
                  
                  return (
                    <ShowroomGrid key={trade.id} type="scope" title={`${trade.label} Scopes`} items={scopes} isLoading={scopesBenefits.isLoading} />
                  ) 
                })}
              </div>
            </div>
          )}
    </div>
  );
}

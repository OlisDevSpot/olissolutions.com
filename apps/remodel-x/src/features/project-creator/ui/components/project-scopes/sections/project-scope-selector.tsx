"use client";

import { useState } from "react";

import { ProjectCustomizationColumn } from "@/features/project-creator/ui/components/project-customization-column";
import { FilterByLocation } from "@/features/showroom/ui/components/filter-by-location";
import { Filters, FiltersProvider } from "@/features/showroom/ui/components/filters";
import { SearchInput } from "@/features/showroom/ui/components/search-input";
import { ScopeSelector } from "@/shared/entities/scopes/ui/components/scope-selector";
import { AddonSelector } from "@/shared/entities/trades/ui/components/addon-selector";
import { TradeSelector } from "@/shared/entities/trades/ui/components/trade-selector";

export function ProjectScopeSelector() {
  const [currentTradeId, setCurrentTradeId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="w-full h-full flex gap-8">
      <ProjectCustomizationColumn title="Trades" className="max-w-[300px] w-full relative">
        <FiltersProvider type="trade">
          <div className="w-full flex gap-2">
            <SearchInput type="trade" searchTerm={searchTerm} setSearchTerm={setSearchTerm} className="w-full" />
            <Filters>
              <FilterByLocation />
            </Filters>
          </div>
        </FiltersProvider>
        <TradeSelector currentTradeId={currentTradeId} setCurrentTradeId={setCurrentTradeId} filter={{ searchTerm }} />
      </ProjectCustomizationColumn>
      <div className="w-full h-full overflow-y-auto main-container">
        <ScopeSelector currentTradeId={currentTradeId} />
      </div>
      <ProjectCustomizationColumn title="Trades" className="max-w-[300px] w-full">
        <AddonSelector currentTradeId={currentTradeId} />
      </ProjectCustomizationColumn>
    </div>
  )
}

"use client";

import { useGetScopes } from "@olis/data-client/fetchers/platform/scopes/queries/get-scopes";
import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { FilterByConstructionType } from "@/features/showroom/ui/components/filter-by-construction-type";
import { FilterByTrade } from "@/features/showroom/ui/components/filter-by-trade";
import { Filters, FiltersProvider } from "@/features/showroom/ui/components/filters";
import { ShowroomHeader } from "@/features/showroom/ui/components/header";
import { EmptyShowroomGrid, ScopeShowroomGrid } from "@/features/showroom/ui/components/showroom-grid";

export function ScopesShowroomView() {
  const { data: scopes, isLoading } = useGetScopes();
  const { data: trades } = useGetTrades();
  const [searchTerm, setSearchTerm] = useState("");
  
  const searchParams = useSearchParams()
  const tradeId = searchParams.get("trade-id")
  const constructionType = searchParams.get("construction-type")
  
  if (!scopes && !isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Error fetching scopes</p>
      </div>
    );
  }

  // Filter scopes based on search term
  const filteredScopes = scopes?.filter(scope =>
    scope.label.toLowerCase().includes(searchTerm.toLowerCase())
    || scope.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((scope) => {
    if (!tradeId) {
      return true;
    }
    return scope.tradeId.toString() === tradeId
  }).filter((scope) => {
    if (!constructionType) {
      return true;
    }
    return scope.constructionType === constructionType
  }) || [];

  const GridDisplay = () => filteredScopes.length === 0 && !isLoading
    ? <EmptyShowroomGrid type="scope" />
    : <ScopeShowroomGrid items={filteredScopes} isLoading={isLoading} title="Scopes" />;
  
  return (
    <div className="scrollbar-gutter-stable min-h-full flex flex-col gap-8">
      <ShowroomHeader type="scope">
        <ShowroomHeader.Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} disabled={isLoading}>
          <FiltersProvider>
            <Filters>
              {trades && <FilterByTrade />}
              <FilterByConstructionType />
            </Filters>
          </FiltersProvider>
        </ShowroomHeader.Filters>
      </ShowroomHeader>
      <GridDisplay />
    </div>
  );
}

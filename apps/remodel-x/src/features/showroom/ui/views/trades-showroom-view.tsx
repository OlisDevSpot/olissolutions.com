"use client";

// import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import type { TradeLocation } from "@olis/core/types";

import { FilterByLocation } from "@/features/showroom/ui/components/filter-by-location";
import { Filters, FiltersProvider } from "@/features/showroom/ui/components/filters";
import { ShowroomHeader } from "@/features/showroom/ui/components/header";
import { EmptyShowroomGrid } from "@/features/showroom/ui/components/showroom-grid";
import { useTRPC } from "@/trpc/client";

import { TradeShowroomGrid } from "../components/trades/trade-showroom-grid";

export function TradesShowroomView() {
  // const { data: trades, isLoading } = useGetTrades();
  const trpc = useTRPC();
  const { data: trades, isLoading } = useQuery(trpc.platform.trades.findAll.queryOptions());
  
  const locationParam = useSearchParams().get("location") as TradeLocation | undefined;
  const [searchTerm, setSearchTerm] = useState("");

  if (!trades && !isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Error fetching trades</p>
      </div>
    );
  }

  const filteredTrades = trades?.filter(trade =>
    trade.label.toLowerCase().includes(searchTerm.toLowerCase())
    || trade.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((trade) => {
    return !locationParam || trade.location === locationParam;
  }) || [];

  const exteriorTrades = filteredTrades.filter(trade => trade.location === "exterior");
  const interiorTrades = filteredTrades.filter(trade => trade.location === "interior");
  const lotTrades = filteredTrades.filter(trade => trade.location === "lot");

  const GridDisplay = () => !filteredTrades.length && !isLoading
    ? <EmptyShowroomGrid type="trade" />
    : (
        <>
          {(exteriorTrades.length > 0 || isLoading) && (
            <TradeShowroomGrid items={exteriorTrades} title="Exterior Trades" isLoading={isLoading} />
          )}
          {(interiorTrades.length > 0 || isLoading) && (
            <TradeShowroomGrid items={interiorTrades} title="Interior Trades" isLoading={isLoading} />
          )}
          {(lotTrades.length > 0 || isLoading) && (
            <TradeShowroomGrid items={lotTrades} title="Lot Trades" isLoading={isLoading} />
          )}
        </>
      )

  return (
    <div className="scrollbar-gutter-stable min-h-full flex flex-col gap-8">
      <ShowroomHeader type="trade">
        <ShowroomHeader.Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} disabled={isLoading}>
          <FiltersProvider>
            <Filters>
              <FilterByLocation />
            </Filters>
          </FiltersProvider>
        </ShowroomHeader.Filters>
      </ShowroomHeader>
      <GridDisplay />
    </div>
  );
}

import { ROOTS } from "@olis/core/constants";
import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { useRouter, useSearchParams } from "next/navigation";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@olis/ui/components/select";

import { useFiltersContext } from "./filters";

export function FilterByTrade() {
  const { setModalOpen, setSelectedFilters } = useFiltersContext();
  const { data: trades } = useGetTrades();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!trades) {
    return (
      <div className="flex items-center gap-6 justify-between">
        <p className="text-muted-foreground min-w-max text-sm flex-1">Trade</p>
        <Select value="all" onValueChange={() => {}}>
          <SelectTrigger className="max-w-[220px] w-full">
            <SelectValue placeholder="Loading..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }
  
  function updateTradeFilter(tradeId: string) {
    setModalOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());

    if (tradeId === "all") {
      newParams.delete("trade-id");
      setSelectedFilters(prev => [...prev.filter(filter => filter.id !== "trade-id")]);
    }
    else {
      newParams.set("trade-id", tradeId);
      setSelectedFilters(prev => [...prev.filter(filter => filter.id !== "trade-id"), { id: "trade-id", value: tradeId }]);
    }

    router.push(`${ROOTS.remodelX.getShowroomRoot()}/scopes?${newParams.toString()}`);
  }

  const currentTradeId = searchParams.get("trade-id") || "all"
  
  return (
    <div className="flex items-center gap-6 justify-between">
      <p className="text-muted-foreground min-w-max text-sm flex-1">Trade</p>
      <Select value={currentTradeId || "all"} onValueChange={updateTradeFilter}>
        <SelectTrigger className="max-w-[220px] w-full">
          <SelectValue placeholder="Filter by group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {trades.map(trade => (
            <SelectItem key={trade.id} value={String(trade.id)}>
              {trade.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

import { ROOTS } from "@olis/core/constants";
import { useGetTrades } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { Loader2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { scopeFiltersDef } from "@/features/showroom/constants/filters";

import { useFiltersContext } from "./filters";
import { useShowroomContext } from "./header";

export function FiltersDisplay() {
  const { type } = useShowroomContext();
  const { data: trades } = useGetTrades();
  const { selectedFilters, setSelectedFilters } = useFiltersContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  if (selectedFilters.length === 0) {
    return null;
  }

  function removeFilter(id: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(id);
    router.push(`${ROOTS.remodelX.getShowroomRoot()}/${type}s?${newParams.toString()}`);

    const newFilters = selectedFilters.filter(f => f.id !== id);
    setSelectedFilters(newFilters);
  }

  return (
    <div className="flex items-center flex-wrap gap-2">
      {selectedFilters.map((filter) => {
        const filterDef = scopeFiltersDef.find(f => f.id === filter.id);
        let value: string = filter.value;

        if (!filterDef) {
          return null
        }

        if (filterDef.id === "trade-id") {
          if (!trades) {
            return (
              <div key={filter.id} className="flex items-center justify-center gap-2 border rounded-lg h-9 px-4 text-sm text-muted-foreground pointer-default select-none min-w-[100px]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </div>
            )
          }
          else {
            const trade = trades.find(trade => trade.id === Number(filter.value));
            if (trade) {
              value = trade.label;
            }
          }
        }

        return (
          <div key={filter.id} className="flex items-center gap-2 border rounded-lg h-9 px-4 text-sm text-muted-foreground pointer-default select-none">
            <span>{filterDef.render(value)}</span>
            <X
              onClick={() => removeFilter(filter.id)}
              className="cursor-pointer size-4 text-muted-foreground hover:text-muted-foreground/70 transition"
            />
          </div>
        ) 
      })}
    </div>
  )
}

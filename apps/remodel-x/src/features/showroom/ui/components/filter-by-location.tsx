import { useRouter, useSearchParams } from "next/navigation";

import type { TradeLocation } from "@olis/core/types";

import { ROOTS } from "@olis/core/constants";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@olis/ui/components/select";

import { useFiltersContext } from "./filters";

export function FilterByLocation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setModalOpen, setSelectedFilters } = useFiltersContext();
  
  function updateLocationFilter(location: TradeLocation | "all") {
    setModalOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());
    if (location === "all") {
      newParams.delete("location");
      setSelectedFilters(prev => [...prev.filter(filter => filter.id !== "location")]);
      return router.push(`${ROOTS.remodelX.getShowroomRoot()}/trades?${newParams.toString()}`);
    }
  
    newParams.set("location", location);
    setSelectedFilters(prev => [...prev.filter(filter => filter.id !== "location"), { id: "location", value: location }]);
    router.push(`${ROOTS.remodelX.getShowroomRoot()}/trades?${newParams.toString()}`);
  }
  
  const currentLocation = searchParams.get("location") || ""
  
  return (
    <div className="flex items-center gap-6 justify-between">
      <p className="text-muted-foreground min-w-max text-sm">By location</p>
      <Select defaultValue={currentLocation || "all"} onValueChange={updateLocationFilter}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="exterior">Exterior</SelectItem>
          <SelectItem value="interior">Interior</SelectItem>
          <SelectItem value="lot">Lot</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

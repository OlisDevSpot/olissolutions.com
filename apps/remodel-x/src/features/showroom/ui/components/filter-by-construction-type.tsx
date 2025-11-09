import { useRouter, useSearchParams } from "next/navigation";

import type { ConstructionType } from "@olis/core/types";

import { CONSTRUCTION_TYPES_LABEL_MAP, constructionTypes } from "@olis/core/constants";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@olis/ui/components/select";

import { useFiltersContext } from "./filters";

export function FilterByConstructionType() {
  const { setModalOpen, setSelectedFilters } = useFiltersContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateTradeFilter(constructionType: ConstructionType | "all") {
    setModalOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());
    if (constructionType === "all") {
      newParams.delete("construction-type");
      setSelectedFilters(prev => [...prev.filter(filter => filter.id !== "construction-type")]);
      return router.push(`/showroom/scopes?${newParams.toString()}`);
    }

    newParams.set("construction-type", constructionType);
    setSelectedFilters(prev => [...prev.filter(filter => filter.id !== "construction-type"), { id: "construction-type", value: constructionType }]);
    router.push(`/showroom/scopes?${newParams.toString()}`);
  }

  const currentConstructionType = searchParams.get("construction-type") || ""
  
  return (
    <div className="flex items-center gap-6 justify-between">
      <p className="text-muted-foreground min-w-max text-sm">Construction Type</p>
      <Select defaultValue={currentConstructionType || "all"} onValueChange={updateTradeFilter}>
        <SelectTrigger className="max-w-[220px] w-full">
          <SelectValue placeholder="Filter by group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {constructionTypes.map(type => (
            <SelectItem key={type} value={type}>{CONSTRUCTION_TYPES_LABEL_MAP[type]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

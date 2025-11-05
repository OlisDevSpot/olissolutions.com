import type { Dispatch, SetStateAction } from "react";

import { ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

import type { ShowroomFilter } from "@/features/showroom/types";

import { Button } from "@olis/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@olis/ui/components/popover";

import { FiltersDisplay } from "./filters-display";

interface FilterContextProps { 
  modalOpen: boolean; 
  setModalOpen: (open: boolean) => void;
  selectedFilters: Omit<ShowroomFilter, "render">[];
  setSelectedFilters: Dispatch<SetStateAction<Omit<ShowroomFilter, "render">[]>>;
}

const filtersContext = createContext<FilterContextProps | null>(null);

export function useFiltersContext() {
  const context = useContext(filtersContext);

  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }

  return context;
}

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams(); 

  const initialFilters = [...searchParams.entries()]
    .map(([id, value]) => {
      return { id, value };
    })
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Omit<ShowroomFilter, "render">[]>(initialFilters);
  
  return (
    <filtersContext.Provider value={{ 
      modalOpen, 
      setModalOpen, 
      selectedFilters, 
      setSelectedFilters
    }}
    >
      {children}
      <FiltersDisplay />
    </filtersContext.Provider>
  );
}

export function Filters({ children }: { children: React.ReactNode }) {
  const { modalOpen, setModalOpen } = useFiltersContext();
  
  return (
    <Popover open={modalOpen} onOpenChange={setModalOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ListFilter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={8} align="start" className="min-w-[400px] space-y-2">
        {children}
      </PopoverContent>
    </Popover>
  )
}

import type { Dispatch, SetStateAction } from "react";

import { capitalize } from "@olis/core/lib/formatters";
import { createContext, useContext } from "react";

import type { ShowroomItemType } from "@/features/showroom/types";

import { PageHeaderSection } from "@olis/ui/components/global/page-header";

import { SearchInput } from "./search-input";

interface Props {
  type: ShowroomItemType;
  children: React.ReactNode;
}

const showroomHeaderContext = createContext<{ type: ShowroomItemType } | null>(null);

export function useShowroomContext() {
  const context = useContext(showroomHeaderContext);
  if (!context) {
    throw new Error("useShowroomContext must be used within a ShowroomHeaderProvider");
  }
  return context;
}

function ShowroomHeaderProvider({ children, type }: { children: React.ReactNode; type: ShowroomItemType }) {
  return (
    <showroomHeaderContext.Provider value={{ type }}>
      {children}
    </showroomHeaderContext.Provider>
  )
}

export function ShowroomHeader({ type, children }: Props) {
  return (
    <ShowroomHeaderProvider type={type}>
      <PageHeaderSection>
        <PageHeaderSection.Frame>
          <PageHeaderSection.Header title={`${capitalize(type)} Catalog`} description={`Transform your home with our comprehensive selection of premium ${type}s.`} />
          {children}
        </PageHeaderSection.Frame>
      </PageHeaderSection>
    </ShowroomHeaderProvider>
  )
}

interface ShowroomHeaderFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  children?: React.ReactNode;
}

function ShowroomHeaderFilters({ searchTerm, setSearchTerm, disabled = false, children }: ShowroomHeaderFiltersProps) {
  const { type } = useShowroomContext();
  
  return (
    <PageHeaderSection.Filters>
      <SearchInput disabled={disabled} type={type} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {children}
    </PageHeaderSection.Filters>
  )
}

ShowroomHeader.Filters = ShowroomHeaderFilters;

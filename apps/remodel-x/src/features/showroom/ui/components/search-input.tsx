import type { Dispatch, SetStateAction } from "react";

import { Search, X } from "lucide-react";
import { useRef } from "react";

import type { ShowroomItemType } from "@/features/showroom/types";

import { Input } from "@olis/ui/components/input";

interface Props {
  disabled?: boolean;
  type: ShowroomItemType;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function SearchInput({ disabled = false, type, searchTerm, setSearchTerm }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="relative min-w-[300px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        disabled={disabled}
        placeholder={`Search ${type}s...`}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="pl-10"
      />
      {searchTerm && (
        <X 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-muted-foreground/70 transition"
          onClick={() => {
            setSearchTerm("");
            inputRef.current?.focus();
          }}
        />
      )}
    </div>
  )
}

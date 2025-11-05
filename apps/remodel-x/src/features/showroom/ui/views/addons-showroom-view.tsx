"use client";

import { useGetAddons } from "@olis/data-client/fetchers/platform/addons/queries/get-addons";
import { useState } from "react";

import { ShowroomHeader } from "@/features/showroom/ui/components/header";
import { EmptyShowroomGrid, ShowroomGrid } from "@/features/showroom/ui/components/showroom-grid";

export function AddonsShowroomView() {
  const { data: addons, isLoading } = useGetAddons();
  const [searchTerm, setSearchTerm] = useState("");

  if (!addons && !isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Error fetching addons</p>
      </div>
    );
  }

  // Filter addons based on search term
  const filteredAddons = addons?.filter(addon =>
    addon.label.toLowerCase().includes(searchTerm.toLowerCase())
    || addon.description.toLowerCase().includes(searchTerm.toLowerCase()),
  ) || [];

  const GridDisplay = () => filteredAddons.length === 0 && !isLoading 
    ? <EmptyShowroomGrid type="addon" />
    : <ShowroomGrid type="addon" items={filteredAddons} isLoading={isLoading} />;

  return (
    <div className="scrollbar-gutter-stable min-h-full flex flex-col gap-8">
      <ShowroomHeader type="addon">
        <ShowroomHeader.Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} disabled={isLoading} />
      </ShowroomHeader>
      <GridDisplay />
    </div>
  );
}

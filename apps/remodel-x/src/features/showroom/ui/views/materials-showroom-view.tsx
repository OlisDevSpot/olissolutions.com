"use client";

import { useGetMaterials } from "@olis/data-client/fetchers/platform/materials/queries/get-materials";
import { useState } from "react";

import { ShowroomHeader } from "@/features/showroom/ui/components/header";
import { EmptyShowroomGrid, ShowroomGrid } from "@/features/showroom/ui/components/showroom-grid";

export function MaterialsShowroomView() {
  const { data: materials, isLoading } = useGetMaterials();
  const [searchTerm, setSearchTerm] = useState("");

  if (!materials && !isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Error fetching materials</p>
      </div>
    );
  }

  // Filter materials based on search term
  const filteredMaterials = materials?.filter(material =>
    material.label.toLowerCase().includes(searchTerm.toLowerCase())
    || material.description.toLowerCase().includes(searchTerm.toLowerCase()),
  ) || [];

  const GridDisplay = () => filteredMaterials.length === 0 && !isLoading
    ? <EmptyShowroomGrid type="material" />
    : <ShowroomGrid type="material" items={filteredMaterials} isLoading={isLoading} />;

  return (
    <div className="scrollbar-gutter-stable min-h-full flex flex-col gap-8">
      <ShowroomHeader type="material">
        <ShowroomHeader.Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} disabled={isLoading} />
      </ShowroomHeader>
      <GridDisplay />
    </div>
  );
}

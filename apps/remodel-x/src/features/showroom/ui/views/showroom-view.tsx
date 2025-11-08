"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import type { ShowroomItemType } from "@/features/showroom/types";

import { useTRPC } from "@/trpc/client";
import { ROOTS } from "@olis/core/constants";

export function ShowroommView() {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  useEffect(() => {
    queryClient.prefetchQuery(trpc.platform.trades.findAll.queryOptions());
    queryClient.prefetchQuery(trpc.platform.scopes.findAll.queryOptions());
    queryClient.prefetchQuery(trpc.platform.materials.findAll.queryOptions());
    queryClient.prefetchQuery(trpc.platform.addons.findAll.queryOptions());
  }, [])

  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <ShowroomNavCard showroomItemType="trade" />
      <ShowroomNavCard showroomItemType="scope" />
      <ShowroomNavCard showroomItemType="addon" />
      <ShowroomNavCard showroomItemType="material" />
    </div>
  );
}

interface ShowroomNavCardProps {
  showroomItemType: ShowroomItemType;
}

function ShowroomNavCard({ showroomItemType }: ShowroomNavCardProps) {
  const router = useRouter()

  return (
    <div 
      className="w-full h-full flex items-center justify-center border rounded-2xl hover:bg-muted transition-colors cursor-pointer"
      onClick={() => router.push(`${ROOTS.remodelX.getShowroomRoot()}/${showroomItemType}s`)}
    >
      <h1 className="text-2xl font-extrabold uppercase">
        { showroomItemType }
        s
      </h1>
    </div>
  )
}

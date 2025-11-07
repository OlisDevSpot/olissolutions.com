"use client";

import type { UseQueryOptions } from "@tanstack/react-query";

import { ROOTS } from "@olis/core/constants";
import { getAddonsQueryOptions } from "@olis/data-client/fetchers/platform/addons/queries/get-addons";
import { getMaterialsQueryOptions } from "@olis/data-client/fetchers/platform/materials/queries/get-materials";
import { getScopesQueryOptions } from "@olis/data-client/fetchers/platform/scopes/queries/get-scopes";
import { getTradesQueryOptions } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import type { ShowroomItemType } from "@/features/showroom/types";

export function ShowroommView() {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <ShowroomNavCard showroomItemType="trade" queryOptions={getTradesQueryOptions()} />
      <ShowroomNavCard showroomItemType="scope" queryOptions={getScopesQueryOptions()} />
      <ShowroomNavCard showroomItemType="addon" queryOptions={getAddonsQueryOptions()} />
      <ShowroomNavCard showroomItemType="material" queryOptions={getMaterialsQueryOptions()} />
    </div>
  );
}

interface ShowroomNavCardProps {
  showroomItemType: ShowroomItemType;
  queryOptions: UseQueryOptions<any>;
}

function ShowroomNavCard({ showroomItemType, queryOptions }: ShowroomNavCardProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  queryClient.prefetchQuery(queryOptions);
  
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

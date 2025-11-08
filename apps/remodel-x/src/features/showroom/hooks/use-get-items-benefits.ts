import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client"

import type { ShowroomItem, ShowroomItemType } from "../types"

interface Props {
  item: ShowroomItem & { id: number };
  type: ShowroomItemType;
}

export function useGetItemsBenefits({ item, type }: Props) {
  const trpc = useTRPC()
  switch (type) {
    case "scope":
      return useQuery(trpc.platform.scopes.findScopeBenefits.queryOptions({ id: item.id }))
    case "material":
      return useQuery(trpc.platform.materials.findMaterialBenefits.queryOptions({ id: item.id }))
    default:
      return null
  }
}

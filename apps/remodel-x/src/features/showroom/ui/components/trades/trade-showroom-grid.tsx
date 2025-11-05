import type { ShowroomItem } from "@/features/showroom/types";

import { ShowroomGrid } from "../showroom-grid";

interface Props {
  items: ShowroomItem[];
  title?: string;
  isLoading?: boolean;
}

export function TradeShowroomGrid({ items, title, isLoading }: Props) {
  return (
    <ShowroomGrid type="trade" items={items} title={title} isLoading={isLoading} estimatedPrice="25000" roiPercentage="50" presentationMode />
  )
}

export function ScopeShowroomGrid({ items, title, isLoading }: Props) {
  return (
    <ShowroomGrid type="scope" items={items} title={title} isLoading={isLoading} />
  )
}

export function AddonShowroomGrid({ items, title, isLoading }: Props) {
  return (
    <ShowroomGrid type="addon" items={items} title={title} isLoading={isLoading} />
  )
}

export function MaterialShowroomGrid({ items, title, isLoading }: Props) {
  return (
    <ShowroomGrid type="material" items={items} title={title} isLoading={isLoading} />
  )
}

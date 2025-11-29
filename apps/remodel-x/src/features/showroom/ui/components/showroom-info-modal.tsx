import { ScopeInfoModal } from "@olis/ui/components/dialogs/scope-info-modal";

import type { ShowroomItem } from "../../types";

interface Props {
  item: ShowroomItem;
}

export function ShowroomInfoModal({ item }: Props) {
  switch (item.type) {
    case "trade":
      return null
    case "scope":
      return <ScopeInfoModal scope={item} />
    case "addon":
    case "material":
      return null
    default:
      return null
  }
}

import type { ConstructionType, TradeLocation } from "@olis/core/types";

import { CONSTRUCTION_TYPES_LABEL_MAP, TRADE_LOCATIONS_LABEL_MAP } from "@olis/core/constants";

import type { ShowroomFilter } from "@/features/showroom/types";

export const scopeFiltersDef = [
  {
    id: "trade-id",
    render: (value: string): string => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  {
    id: "construction-type",
    render: (value: string): typeof CONSTRUCTION_TYPES_LABEL_MAP[ConstructionType] => CONSTRUCTION_TYPES_LABEL_MAP[value as ConstructionType]
  },
  {
    id: "location",
    render: (value: string): typeof TRADE_LOCATIONS_LABEL_MAP[TradeLocation] => TRADE_LOCATIONS_LABEL_MAP[value as TradeLocation]
  }
] as const satisfies Omit<ShowroomFilter, "value">[]

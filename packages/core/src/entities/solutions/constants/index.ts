import type { ConstructionType } from "@workspace/core/types/enums";

export const CONSTRUCTION_TYPES_LABEL_MAP = {
  "energy-efficient": "Energy Efficient",
  "rough-construction": "Rough Construction",
  "finish-construction": "Finish Construction"
} as const satisfies Record<ConstructionType, string>;

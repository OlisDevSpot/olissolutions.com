import type { UpgradeLocation } from "@workspace/core/types/enums";

export const UPGRADE_LOCATIONS_LABEL_MAP = {
  exterior: "Exterior",
  interior: "Interior",
  lot: "Lot"
} as const satisfies Record<UpgradeLocation, string>;

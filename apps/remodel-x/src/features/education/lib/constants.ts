import { ROOTS } from "@olis/core/constants";
import { HandHelping, Home, Leaf, TrendingUp } from "lucide-react";

import type { NavItem } from "../types";

export const ENERGY_EFFICIENCY_MENU_ITEMS = [
  {
    label: "Overview",
    href: `${ROOTS.remodelX.getEnergyEfficiencyRoot()}`,
    Icon: Home,
  },
  {
    label: "California Pre-1990",
    href: `${ROOTS.remodelX.getEnergyEfficiencyRoot()}/california-pre-1990`,
    Icon: Home,
  },
  {
    label: "California 2025",
    href: `${ROOTS.remodelX.getEnergyEfficiencyRoot()}/california-2025`,
    Icon: Leaf,
  },
  {
    label: "Assistance Programs",
    href: `${ROOTS.remodelX.getEnergyEfficiencyRoot()}/assistance-programs`,
    Icon: HandHelping,
  },
  {
    label: "Benefits",
    href: `${ROOTS.remodelX.getEnergyEfficiencyRoot()}/benefits`,
    Icon: TrendingUp,
  },
] as const satisfies NavItem[];

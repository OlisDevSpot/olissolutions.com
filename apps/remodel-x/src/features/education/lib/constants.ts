import { HandHelping, Home, Leaf, TrendingUp } from "lucide-react";

import type { NavItem } from "../types";

export const ENERGY_EFFICIENCY_MENU_ITEMS = [
  {
    label: "Overview",
    accessor: "overview",
    href: "/",
    Icon: Home,
  },
  {
    label: "California Pre-1990",
    accessor: "california-pre-1990",
    href: `california-pre-1990`,
    Icon: Home,
  },
  {
    label: "California 2025",
    accessor: "california-2025",
    href: `california-2025`,
    Icon: Leaf,
  },
  {
    label: "Assistance Programs",
    accessor: "assistance-programs",
    href: `assistance-programs`,
    Icon: HandHelping,
  },
  {
    label: "Benefits",
    accessor: "benefits",
    href: `benefits`,
    Icon: TrendingUp,
  },
] as const satisfies NavItem[];

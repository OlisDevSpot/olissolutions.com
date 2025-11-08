import { AirVent, Building2, Calculator, Drill, Fence, Hammer, HousePlus, Leaf, Paintbrush } from "lucide-react";

import type { useTRPC } from "@/trpc/client";

import { ROOTS } from "@olis/core/constants";

export const sidebarGroups = {
  build: "Build",
  education: "Education",
} as const;

export const sidebarItems = {
  build: [
    {
      title: "Projects",
      url: `${ROOTS.remodelX.getProjectsRoot()}`,
      icon: HousePlus,
    },
  ],
  education: [
    {
      title: "About Us",
      url: `${ROOTS.remodelX.dashboard}/about-us`,
      icon: Building2,
    },
    {
      title: "Energy Efficiency",
      url: `${ROOTS.remodelX.dashboard}/energy-efficiency`,
      icon: Leaf,
    },
    {
      title: "Savings Calculator",
      url: `${ROOTS.remodelX.dashboard}/calculator`,
      icon: Calculator,
    },
    {
      title: "Showroom",
      url: `${ROOTS.remodelX.getShowroomRoot()}`,
      icon: Hammer,
      subItems: [
        {
          title: "Trades",
          url: `${ROOTS.remodelX.getShowroomRoot()}/trades`,
          icon: Drill,
          enablePrefetch: true,
          handleMouseEnter: (trpc: ReturnType<typeof useTRPC>) => {
            return trpc.platform.trades.findAll.queryOptions()
          }
        },
        {
          title: "Scopes",
          url: `${ROOTS.remodelX.getShowroomRoot()}/scopes`,
          icon: AirVent,
          enablePrefetch: true,
          handleMouseEnter: (trpc: ReturnType<typeof useTRPC>) => {
            return trpc.platform.scopes.findAll.queryOptions()
          }
        },
        {
          title: "Addons",
          url: `${ROOTS.remodelX.getShowroomRoot()}/addons`,
          icon: Fence,
          enablePrefetch: true,
          handleMouseEnter: (trpc: ReturnType<typeof useTRPC>) => {
            return trpc.platform.addons.findAll.queryOptions()
          }
        },
        {
          title: "Materials",
          url: `${ROOTS.remodelX.getShowroomRoot()}/materials`,
          icon: Paintbrush,
          enablePrefetch: true,
          handleMouseEnter: (trpc: ReturnType<typeof useTRPC>) => {
            return trpc.platform.materials.findAll.queryOptions()
          }
        },
      ],
    },
  ],
};

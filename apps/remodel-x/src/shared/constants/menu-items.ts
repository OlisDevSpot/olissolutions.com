import { getAddonsQueryOptions } from "@olis/data-client/fetchers/platform/addons/queries/get-addons";
import { getMaterialsQueryOptions } from "@olis/data-client/fetchers/platform/materials/queries/get-materials";
import { getScopesQueryOptions } from "@olis/data-client/fetchers/platform/scopes/queries/get-scopes";
import { getTradesQueryOptions } from "@olis/data-client/fetchers/platform/trades/queries/get-trades";
import { AirVent, Building2, Calculator, Drill, Fence, Hammer, HousePlus, Leaf, Paintbrush } from "lucide-react";

import { ROOTS } from "@olis/core/constants";

export const sidebarGroups = {
  build: "Build",
  education: "Education",
} as const;

export const sidebarItems = {
  build: [
    {
      title: "Projects",
      url: `${ROOTS.saleos.getProjectsRoot()}`,
      icon: HousePlus,
    },
  ],
  education: [
    {
      title: "About Us",
      url: `${ROOTS.saleos.dashboard}/about-us`,
      icon: Building2,
    },
    {
      title: "Energy Efficiency",
      url: `${ROOTS.saleos.dashboard}/energy-efficiency`,
      icon: Leaf,
    },
    {
      title: "Savings Calculator",
      url: `${ROOTS.saleos.dashboard}/calculator`,
      icon: Calculator,
    },
    {
      title: "Showroom",
      url: `${ROOTS.saleos.getShowroomRoot()}`,
      icon: Hammer,
      subItems: [
        {
          title: "Trades",
          url: `${ROOTS.saleos.getShowroomRoot()}/trades`,
          icon: Drill,
          enablePrefetch: true,
          queryOptions: getTradesQueryOptions,
        },
        {
          title: "Scopes",
          url: `${ROOTS.saleos.getShowroomRoot()}/scopes`,
          icon: AirVent,
          enablePrefetch: true,
          queryOptions: getScopesQueryOptions,

        },
        {
          title: "Addons",
          url: `${ROOTS.saleos.getShowroomRoot()}/addons`,
          icon: Fence,
          enablePrefetch: true,
          queryOptions: getAddonsQueryOptions,
        },
        {
          title: "Materials",
          url: `${ROOTS.saleos.getShowroomRoot()}/materials`,
          icon: Paintbrush,
          enablePrefetch: true,
          queryOptions: getMaterialsQueryOptions,
        },
      ],
    },
  ],
};

import { AirVent, Building2, Calculator, Drill, Fence, Hammer, HousePlus, Leaf, Paintbrush } from "lucide-react";

export const sidebarGroups = {
  build: "Build",
  education: "Education",
} as const;

export const sidebarItems = {
  build: [
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: HousePlus,
    },
  ],
  education: [
    {
      title: "About Us",
      url: "/dashboard/about-us",
      icon: Building2,
    },
    {
      title: "Energy Efficiency",
      url: "/dashboard/energy-efficiency",
      icon: Leaf,
    },
    {
      title: "Savings Calculator",
      url: "/dashboard/calculator",
      icon: Calculator,
    },
    {
      title: "Showroom",
      url: "/dashboard/showroom",
      icon: Hammer,
      subItems: [
        {
          title: "Trades",
          url: "/dashboard/showroom/trades",
          icon: Drill,
          enablePrefetch: true,
          // queryOptions: getTradesQueryOptions,
        },
        {
          title: "Scopes",
          url: "/dashboard/showroom/scopes",
          icon: AirVent,
          enablePrefetch: true,
          // queryOptions: getScopesQueryOptions,

        },
        {
          title: "Addons",
          url: "/dashboard/showroom/addons",
          icon: Fence,
          enablePrefetch: true,
          // queryOptions: getAddonsQueryOptions,
        },
        {
          title: "Materials",
          url: "/dashboard/showroom/materials",
          icon: Paintbrush,
          enablePrefetch: true,
          // queryOptions: getMaterialsQueryOptions,
        },
      ],
    },
  ],
};

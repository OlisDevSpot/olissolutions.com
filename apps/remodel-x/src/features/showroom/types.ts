import type { Addon, Material, Scope, Trade } from "@olis/db/schema/platform";

// export interface ShowroomItem<T extends ShowroomItemType = ShowroomItemType> {
//   label: string;
//   accessor: string;
//   description: string;
//   imageUrl: string;
//   estimatedROI?: T extends "addon" | "material" ? number : never;
//   estimatedPrice?: T extends "addon" | "material" ? number : never;
//   constructionType?: ConstructionType;
// }

export type ShowroomItem 
  = Trade & { type: "trade" }
    | Scope & { type: "scope" } 
    | Addon & { type: "addon" } 
    | Material & { type: "material" };

export interface ShowroomItemSubItemMap {
  trade: "scope";
  scope: "material";
}

export interface ShowroomFilter {
  id: string;
  value: string;
  render: (value: string) => string;
}

import type { ConstructionType } from "@olis/core/types";

export type ShowroomItemType = "trade" | "scope" | "addon" | "material";

export interface ShowroomItem<T extends ShowroomItemType = ShowroomItemType> {
  label: string;
  accessor: string;
  description: string;
  imageUrl: string;
  estimatedROI?: T extends "addon" | "material" ? number : never;
  estimatedPrice?: T extends "addon" | "material" ? number : never;
  constructionType?: ConstructionType;
}

export interface ShowroomItemSubItemMap {
  trade: "scope";
  scope: "material";
}

export interface ShowroomFilter {
  id: string;
  value: string;
  render: (value: string) => string;
}

export type ShowroomItemType = "trade" | "scope" | "addon" | "material";

export interface ShowroomItem {
  label: string;
  accessor: string;
  description: string;
  imageUrl: string;
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

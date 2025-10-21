import type { InferRequestType, InferResponseType } from "hono";

import type { upgradesData } from "@workspace/db/seeds/one-stop-sales/data/upgrades";
import type { honoClient } from "@workspace/hono/client";

export type UpgradeAccessor = (typeof upgradesData)[number]["accessor"];

export interface Described {
  description: string;
  label: string;
}

export interface Upgrade extends Described {
  accessor: UpgradeAccessor;
}

export type GetUpgradesResponse = InferResponseType<typeof honoClient.api.upgrades.$get, 200>;

export type GetUpgradeSolutionsRequest = InferRequestType<typeof honoClient.api.upgrades[":id"]["solutions"]["$get"]>;
export type GetUpgradeSolutionsResponse = InferResponseType<typeof honoClient.api.upgrades[":id"]["solutions"]["$get"], 200>;

export type GetUpgradeAddonsRequest = InferRequestType<typeof honoClient.api.upgrades[":id"]["addons"]["$get"]>;
export type GetUpgradeAddonsResponse = InferResponseType<typeof honoClient.api.upgrades[":id"]["addons"]["$get"], 200>;

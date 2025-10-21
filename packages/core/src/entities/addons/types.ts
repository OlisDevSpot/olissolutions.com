import type { addonsData } from "@workspace/db/seeds/one-stop-sales/data/addons";

export type AddonAccessor = typeof addonsData[number]["accessor"];

import type { addonsData } from "@olis/db/seeds/one-stop-sales/data/addons";

export type AddonAccessor = typeof addonsData[number]["accessor"];

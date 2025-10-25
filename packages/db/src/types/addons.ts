import type { addonsData } from "@olis/db/seeds/platform/data/addons";

export type AddonAccessor = typeof addonsData[number]["accessor"];

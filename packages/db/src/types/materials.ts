import type { materialsData } from "@olis/db/seeds/platform/data/materials";

export type MaterialAccessor = (typeof materialsData)[number]["accessor"];

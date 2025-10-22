import type { materialsData } from "@olis/db/seeds/one-stop-sales/data/materials";

export type MaterialAccessor = (typeof materialsData)[number]["accessor"];

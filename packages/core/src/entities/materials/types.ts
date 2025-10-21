import type { materialsData } from "@workspace/db/seeds/one-stop-sales/data/materials";

export type MaterialAccessor = (typeof materialsData)[number]["accessor"];

import type { solutionsData } from "@workspace/db/seeds/one-stop-sales/data/solutions";
import type { TableOptions } from "@workspace/core/types";

export type SolutionAccessor = typeof solutionsData[keyof typeof solutionsData][number]["accessor"];
export type SolutionAccessorOfUpgrade<T extends keyof typeof solutionsData> = typeof solutionsData[T][number]["accessor"];

export type JoinTableAccessors = "benefits" | "variables"

export type SolutionsTableOptions = TableOptions<JoinTableAccessors>

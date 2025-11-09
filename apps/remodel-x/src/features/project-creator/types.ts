import type { Prettify } from "@olis/core/types";
import type { Project } from "@olis/db/schema/remodel-x";

export type ProjectWithSQLProps<T extends string> = Prettify<
  Project & {
    [key in T]: string; }
>;

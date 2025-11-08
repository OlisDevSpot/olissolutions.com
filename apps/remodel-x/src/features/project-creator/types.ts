import type { Prettify } from "@olis/core/types";

import type { Project } from "../../../../../packages/db/dist/schema/remodel-x";

export type ProjectWithSQLProps<T extends string> = Prettify<
  Project & {
    [key in T]: string; }
>;

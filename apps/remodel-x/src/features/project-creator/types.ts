import type { Prettify } from "@olis/core/types";

import type { Project } from "@olis/db/schema/one-stop-sales";

export type ProjectWithSQLProps<T extends string> = Prettify<
  Project & {
    [key in T]: string; }
>;

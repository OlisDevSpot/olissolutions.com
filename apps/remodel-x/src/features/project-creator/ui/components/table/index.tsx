import type { honoClient } from "@olis/server/apps/clients/one-stop-sales";
import type { InferResponseType } from "hono";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  projects: InferResponseType<typeof honoClient.api["projects"]["$get"], 200>;
}

export function ProjectsTable({ projects }: Props) {
  return (
    <section className="h-full w-full overflow-auto">
      <div className="overflow-hidden rounded-md border">
        <DataTable columns={columns} data={projects} />
      </div>
    </section>
  );
}

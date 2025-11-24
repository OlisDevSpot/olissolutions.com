import type { GetProjectsOutput } from "@/features/project-creator/data/queries/get-projects";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  projects: GetProjectsOutput;
}

export function ProjectsTable({ projects }: Props) {
  return (
    <section className="h-full w-full overflow-auto">
      <div className="overflow-hidden rounded-md border h-full">
        <DataTable columns={columns} data={projects} />
      </div>
    </section>
  );
}

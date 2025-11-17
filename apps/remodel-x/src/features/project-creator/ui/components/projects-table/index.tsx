import type { AllProjectsOutput } from "@/features/project-creator/data/queries/get-projects";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  projects: AllProjectsOutput;
}

export function ProjectsTable({ projects }: Props) {
  console.log({ projects })
  
  return (
    <section className="h-full w-full overflow-auto">
      <div className="overflow-hidden rounded-md border">
        <DataTable columns={columns} data={projects} />
      </div>
    </section>
  );
}

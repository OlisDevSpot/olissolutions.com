import { useEffect } from "react";

import type { GetProjectsOutput } from "@/features/project-creator/data/queries/get-projects";

import { useModalStore } from "@/features/project-creator/hooks/dialogs/use-modal-store";

import { NewProjectModal } from "../dialogs/new-project-modal";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  projects: GetProjectsOutput;
}

export function ProjectsTable({ projects }: Props) {
  const { open, setModal } = useModalStore();

  useEffect(() => {
    setModal({ 
      Element: <NewProjectModal />, 
      accessor: "new-project-modal"
    });
  }, [])
  
  return (
    <section className="h-full w-full overflow-auto">
      <div className="overflow-hidden rounded-md border h-full">
        <DataTable columns={columns} data={projects} onEmptyButtonClick={() => open()} />
      </div>
    </section>
  );
}

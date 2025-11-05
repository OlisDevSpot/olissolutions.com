import { NewProjectModal } from "@/features/project-creator/ui/components/dialogs/new-project-modal";
import { ProjectsView } from "@/features/project-creator/ui/views/projects-view";

async function ProjectsPage() {
  return (
    <>
      <ProjectsView />
      <NewProjectModal />
    </>
  );
}
export default ProjectsPage;

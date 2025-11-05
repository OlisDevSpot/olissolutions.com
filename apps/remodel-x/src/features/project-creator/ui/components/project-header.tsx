import { useCurrentProject } from "@/features/project-creator/hooks/use-current-project";

export function ProjectHeader({ children }: { children?: React.ReactNode } = {}) {
  const { data: project } = useCurrentProject();

  if (!project) {
    return null;
  }

  return (
    <div className="flex items-center justify-between shrink-0 gap-6">
      <div className="flex flex-col items-center gap-4 justify-between w-full xl:flex-row">
        <div className="flex flex-col items-center gap-2 min-w-max xl:flex-row">
          <h1 className="text-3xl font-bold">{project.address || "Unnamed Project"}</h1>
          <p className="hidden xl:block">•</p>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            {project.city}
            ,
            {" "}
            {project.state}
            {" "}
            {project.zipCode}
          </p>
        </div>
        <div className="max-w-max flex items-center gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}

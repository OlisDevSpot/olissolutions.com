import { Home } from "lucide-react";

import { useGetProject } from "@/features/project-creator/data/queries/get-project";
import { useGetProjectJobsite } from "@/features/project-creator/data/queries/get-project-jobsite-profile";
import { capitalize } from "@olis/core/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@olis/ui/components/card";

interface Props {
  projectId: string;
}

export function PropertyInfo({ projectId }: Props) {
  const project = useGetProject(projectId);
  const jobsite = useGetProjectJobsite(projectId);

  if (!jobsite.data || !project.data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Stories:</span>
            <p className="font-medium">{jobsite.data.numStories || "N/A"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Roof Type:</span>
            <p className="font-medium">{capitalize(jobsite.data.roofs?.roofType || "N/A")}</p>
          </div>
          <div>
            <span className="text-muted-foreground">City:</span>
            <p className="font-medium">{project.data.city}</p>
          </div>
          <div>
            <span className="text-muted-foreground">State:</span>
            <p className="font-medium">{project.data.state}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

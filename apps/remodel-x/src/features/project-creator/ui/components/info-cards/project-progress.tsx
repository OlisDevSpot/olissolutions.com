import { Calendar, Clock, TrendingUp } from "lucide-react";

import type { Project } from "@olis/db/schema/remodel-x";

import { formatDate } from "@olis/core/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@olis/ui/components/card";
import { Progress } from "@olis/ui/components/progress";

interface ProjectProgressProps {
  project: Project;
}

const completionPercentage = 0; // Mock completion percentage

export function ProjectProgress({ project }: ProjectProgressProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Project Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Overall Completion</span>
            <span>
              {completionPercentage}
              %
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="flex flex-col gap-2 justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-2 justify-between w-full">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Started
              </span>
              {formatDate(project.createdAt)}
            </span>
            <span className="flex items-center gap-2 justify-between w-full">
              <span className="flex items-center gap-2 justify-between w-full">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Est. completion
                </span>
                <span className="text-xs text-muted-foreground">2-3 weeks</span>
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

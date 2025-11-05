import { FileText } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@olis/ui/components/card";
import { Separator } from "@olis/ui/components/separator";

export function ProjectSOW() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Scope of Work
        </CardTitle>
        <CardDescription>
          Detailed breakdown of work to be performed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Solar Installation</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Site assessment and engineering review</li>
              <li>Installation of 28 high-efficiency solar panels</li>
              <li>Inverter and monitoring system setup</li>
              <li>Electrical connections and permitting</li>
              <li>System commissioning and testing</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Energy Storage</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Tesla Powerwall installation</li>
              <li>Battery system integration</li>
              <li>Backup power configuration</li>
              <li>Mobile app setup for monitoring</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Project Timeline</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Permits & Design</span>
                <span className="text-muted-foreground">2-3 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Installation</span>
                <span className="text-muted-foreground">3-5 days</span>
              </div>
              <div className="flex justify-between">
                <span>Inspection & Activation</span>
                <span className="text-muted-foreground">1-2 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

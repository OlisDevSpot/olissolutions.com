import { Star } from "lucide-react";

import { Badge } from "@olis/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@olis/ui/components/card";

const mockIncentives = [
  { name: "Federal Solar Tax Credit", amount: 8550, status: "eligible" },
  { name: "California State Rebate", amount: 2000, status: "pending" },
  { name: "Utility Rebate Program", amount: 1200, status: "approved" },
];

export function ProjectIncentives() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Available Incentives & Rebates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockIncentives.map((incentive, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{incentive.name}</p>
                <p className="text-sm text-muted-foreground">
                  Status:
                  {" "}
                  <Badge variant={incentive.status === "eligible" ? "secondary" : incentive.status === "approved" ? "default" : "outline"}>{incentive.status}</Badge>
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">
                  $
                  {incentive.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

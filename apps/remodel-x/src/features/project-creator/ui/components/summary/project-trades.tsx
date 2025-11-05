import { Wrench } from "lucide-react";

import { Badge } from "@olis/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@olis/ui/components/card";

const mockTrades = [
  {
    id: 1,
    label: "Premium Roofing",
    description: "Architectural shingles with enhanced durability",
    price: 15000,
    selected: true,
  },
  {
    id: 2,
    label: "Energy Efficient Windows",
    description: "Double-pane low-E windows throughout",
    price: 8500,
    selected: true,
  },
  {
    id: 3,
    label: "Insulation Trade",
    description: "Premium spray foam insulation",
    price: 4200,
    selected: false,
  },
];

export function ProjectTrades() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Available Trades
        </CardTitle>
        <CardDescription>
          Optional trades to enhance your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTrades.map(trade => (
            <div key={trade.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{trade.label}</h3>
                  {trade.selected && <Badge>Selected</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{trade.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  $
                  {trade.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

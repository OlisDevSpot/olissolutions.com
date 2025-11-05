import { Badge } from "@olis/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@olis/ui/components/card";

const mockScopes = [
  {
    id: 1,
    label: "Premium Solar Package",
    description: "High-efficiency solar panels with 25-year warranty",
    price: 28500,
    status: "selected",
  },
  {
    id: 2,
    label: "Energy Storage System",
    description: "Tesla Powerwall for backup power",
    price: 12000,
    status: "selected",
  },
  {
    id: 3,
    label: "Smart Home Integration",
    description: "Complete smart home automation package",
    price: 5500,
    status: "considering",
  },
];

export function ProjectScopes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Scopes</CardTitle>
        <CardDescription>
          Home improvement scopes chosen for this project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockScopes.map(scope => (
            <div key={scope.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{scope.label}</h3>
                  <Badge variant={scope.status === "selected" ? "default" : "secondary"}>
                    {scope.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{scope.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  $
                  {scope.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

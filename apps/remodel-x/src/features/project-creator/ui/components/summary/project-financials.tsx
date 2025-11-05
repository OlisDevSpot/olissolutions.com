import { CreditCard } from "lucide-react";

import { Button } from "@olis/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@olis/ui/components/card";
import { Separator } from "@olis/ui/components/separator";

const mockFinancialInfo = {
  subtotal: 46000,
  tax: 3680,
  discounts: -2300,
  total: 47380,
  monthlyPayment: 315,
  financingTerm: 180, // months
  apr: 6.99,
  downPayment: 5000,
};

export function ProjectFinancials() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Financing Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Monthly Payment</label>
              <p className="text-2xl font-bold">
                $
                {mockFinancialInfo.monthlyPayment}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Loan Term</label>
              <p className="text-2xl font-bold">
                {mockFinancialInfo.financingTerm / 12}
                {" "}
                years
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">APR</label>
              <p className="text-2xl font-bold">
                {mockFinancialInfo.apr}
                %
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Down Payment</label>
              <p className="text-2xl font-bold">
                $
                {mockFinancialInfo.downPayment.toLocaleString()}
              </p>
            </div>
          </div>
          <Separator />
          <div className="text-center">
            <Button>Apply for Financing</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

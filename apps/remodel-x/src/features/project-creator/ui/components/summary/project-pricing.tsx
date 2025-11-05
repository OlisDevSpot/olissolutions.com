import { DollarSign } from "lucide-react";

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

export function ProjectPricing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Project Pricing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span className="font-medium">
              $
              {mockFinancialInfo.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax</span>
            <span className="font-medium">
              $
              {mockFinancialInfo.tax.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between py-2 text-green-600">
            <span>Discounts</span>
            <span className="font-medium">
              $
              {mockFinancialInfo.discounts.toLocaleString()}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between py-2 text-lg font-bold">
            <span>Total Project Cost</span>
            <span>
              $
              {mockFinancialInfo.total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

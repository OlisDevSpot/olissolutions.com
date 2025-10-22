'use client'

import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@olis/ui/components/card'
import { Calendar, CreditCard, Download } from 'lucide-react'
import { motion } from 'motion/react'

export default function Billing() {
  const invoices = [
    {
      id: 'INV-001',
      date: 'Feb 1, 2024',
      amount: '$88.00',
      status: 'paid',
      description: 'Monthly subscription - 2 solutions',
    },
    {
      id: 'INV-002',
      date: 'Jan 1, 2024',
      amount: '$88.00',
      status: 'paid',
      description: 'Monthly subscription - 2 solutions',
    },
    {
      id: 'INV-003',
      date: 'Dec 1, 2023',
      amount: '$49.00',
      status: 'paid',
      description: 'Sales Presentation Toolkit',
    },
  ]

  return (
    <div className="bg-background">
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Invoices</h1>
            <p className="text-muted-foreground">
              Manage your payment methods and download invoices.
            </p>
          </div>

          {/* Current Plan */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Premium Plan</p>
                  <p className="text-sm text-muted-foreground">2 active solutions</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">$88</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Next billing date: March 1, 2024
              </div>
            </CardContent>
          </Card>

          {/* Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                Download your past invoices and payment receipts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map(invoice => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">{invoice.id}</p>
                        <Badge variant="secondary">
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">{invoice.amount}</p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

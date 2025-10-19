'use client'

import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'
import { Separator } from '@workspace/ui/components/separator'
import { Calendar, CreditCard, Download, Settings, Star } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function Purchases() {
  // Mock data for user purchases
  const purchases = [
    {
      id: '1',
      name: 'Sales Presentation Toolkit',
      status: 'active',
      purchaseDate: '2024-01-15',
      nextBilling: '2024-02-15',
      price: 49,
      category: 'Sales Tool',
      description:
        'Professional presentation templates and tools for construction sales.',
      features: [
        'Customizable templates',
        'Project galleries',
        'Interactive pricing tools',
      ],
    },
    {
      id: '2',
      name: 'Commission Tracker Pro',
      status: 'active',
      purchaseDate: '2024-01-10',
      nextBilling: '2024-02-10',
      price: 39,
      category: 'Analytics',
      description: 'Advanced commission tracking and analytics platform.',
      features: [
        'Commission tracking',
        'Performance analytics',
        'Earning forecasts',
      ],
    },
    {
      id: '3',
      name: 'ROI Calculator Suite',
      status: 'trial',
      purchaseDate: '2024-01-20',
      trialEnds: '2024-02-03',
      price: 19,
      category: 'Sales Tool',
      description: 'Interactive calculators for project value demonstration.',
      features: [
        'Energy savings calculator',
        'Property value calculator',
        'Cost benefit analysis',
      ],
    },
    {
      id: '4',
      name: 'Smart Proposal Generator',
      status: 'cancelled',
      purchaseDate: '2023-12-05',
      cancelDate: '2024-01-05',
      price: 29,
      category: 'Documentation',
      description: 'Automated proposal creation with customizable templates.',
      features: [
        'Proposal templates',
        'Automated pricing',
        'Document management',
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'trial':
        return 'secondary'
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'trial':
        return 'Free Trial'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  return (
    <div className="bg-background">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Purchase History
            </h1>
            <p className="text-muted-foreground">
              Manage your subscriptions, billing, and solution access.
            </p>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Subscriptions</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$88</div>
                <p className="text-xs text-muted-foreground">Per month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Trial Ending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">Days remaining</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Purchases List */}
        <div className="space-y-6">
          {purchases.map((purchase, index) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">
                          {purchase.name}
                        </CardTitle>
                        <Badge variant={getStatusColor(purchase.status)}>
                          {getStatusText(purchase.status)}
                        </Badge>
                        <Badge variant="outline">{purchase.category}</Badge>
                      </div>
                      <CardDescription className="text-base">
                        {purchase.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        $
                        {purchase.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per month
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Features */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-foreground mb-3">
                        Features included:
                      </h4>
                      <ul className="space-y-1">
                        {purchase.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <Star className="h-3 w-3 mr-2 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions and Details */}
                    <div className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          Purchased:
                          {' '}
                          {purchase.purchaseDate}
                        </div>
                        {purchase.status === 'active' && (
                          <div className="flex items-center text-muted-foreground">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Next billing:
                            {' '}
                            {purchase.nextBilling}
                          </div>
                        )}
                        {purchase.status === 'trial' && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            Trial ends:
                            {' '}
                            {purchase.trialEnds}
                          </div>
                        )}
                        {purchase.status === 'cancelled' && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            Cancelled:
                            {' '}
                            {purchase.cancelDate}
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        {purchase.status === 'active' && (
                          <>
                            <Button
                              asChild
                              className="w-full btn-primary"
                              size="sm"
                            >
                              <Link href={`/solutions/${purchase.id}`}>
                                <Download className="mr-2 h-4 w-4" />
                                Access Solution
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full"
                              size="sm"
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Manage Subscription
                            </Button>
                          </>
                        )}
                        {purchase.status === 'trial' && (
                          <>
                            <Button
                              asChild
                              className="w-full btn-primary"
                              size="sm"
                            >
                              <Link href={`/solutions/${purchase.id}`}>
                                <Download className="mr-2 h-4 w-4" />
                                Access Trial
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full"
                              size="sm"
                            >
                              Upgrade to Full Version
                            </Button>
                          </>
                        )}
                        {purchase.status === 'cancelled' && (
                          <Button
                            asChild
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            <Link href={`/solutions/${purchase.id}`}>
                              Reactivate Solution
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

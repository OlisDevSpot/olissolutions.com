'use client'

import { Badge } from '@olis/ui/components/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@olis/ui/components/card'
import { BarChart3, Calendar, DollarSign, Target, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'

export default function Analytics() {
  const metrics = [
    { label: 'Total Sales', value: '$24,573', change: '+12.5%', icon: DollarSign },
    { label: 'Conversion Rate', value: '68%', change: '+5.2%', icon: Target },
    { label: 'Avg Deal Size', value: '$3,241', change: '+8.1%', icon: TrendingUp },
    { label: 'Active Prospects', value: '47', change: '+3', icon: Calendar },
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Performance Analytics</h1>
            <p className="text-muted-foreground">
              Track your sales performance and identify opportunities for growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <Badge variant="secondary" className="text-xs">
                      {metric.change}
                      {' '}
                      from last month
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Coming Soon
              </CardTitle>
              <CardDescription>
                Detailed analytics and reporting features are currently in development.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Advanced analytics dashboard will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

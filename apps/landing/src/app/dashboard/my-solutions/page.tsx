'use client'

import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@olis/ui/components/card'
import { Separator } from '@olis/ui/components/separator'
import {
  CheckCircle,
  Clock,
  ExternalLink,
  Play,
  Settings,
  Star,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { solutions } from '@/features/dashboard'

export default function MySolutions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'trial':
        return 'secondary'
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
              My Solutions
            </h1>
            <p className="text-muted-foreground">
              Access and manage your purchased solutions. Each tool opens in a
              new tab with single sign-on.
            </p>
          </motion.div>
        </div>

        {/* Quick Stats */}
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
                <p className="text-xs text-muted-foreground">Ready to use</p>
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
                  Total Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78</div>
                <p className="text-xs text-muted-foreground">This month</p>
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

        {/* Solutions Grid */}
        <div className="space-y-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                        {solution.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">
                            {solution.name}
                          </CardTitle>
                          <Badge variant={getStatusColor(solution.status)}>
                            {getStatusText(solution.status)}
                          </Badge>
                          <Badge variant="outline">{solution.category}</Badge>
                        </div>
                        <CardDescription className="text-base">
                          {solution.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        asChild
                        className="btn-primary"
                      >
                        <Link
                          href={solution.launchUrl}
                          target="_blank"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Launch
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
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
                        {solution.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <CheckCircle className="h-3 w-3 mr-2 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Usage Stats */}
                    <div className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          Last used:
                          {' '}
                          {solution.lastUsed}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Star className="h-4 w-4 mr-2" />
                          Used
                          {' '}
                          {solution.usageCount}
                          {' '}
                          times
                        </div>
                        {solution.status === 'trial' && (
                          <div className="flex items-center text-amber-600">
                            <Clock className="h-4 w-4 mr-2" />
                            Trial ends in
                            {' '}
                            {solution.trialEnds}
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          size="sm"
                        >
                          <Link
                            href={solution.launchUrl}
                            target="_blank"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Quick Demo
                          </Link>
                        </Button>
                        {solution.status === 'trial' && (
                          <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            Trade to Full Version
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

        {/* Empty State / Browse More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <Play className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Discover More Solutions
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Browse our marketplace to find more tools that can help boost
                your sales performance.
              </p>
              <Button
                asChild
                className="btn-primary"
              >
                <Link href="/dashboard/marketplace">
                  Browse Marketplace
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

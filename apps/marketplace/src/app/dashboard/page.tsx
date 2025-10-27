'use client'

import { useSession } from '@olis/auth/client'
import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@olis/ui/components/card'
import { LoadingState } from '@olis/ui/components/global/loading-state'
import {
  ArrowRight,
  Calendar,
  Package,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { PageHeader } from '@/components/page-header'
import { featuredSolutions, purchases, stats } from '@/features/dashboard'

export default function Dashboard() {
  const { data: session, isPending } = useSession()
  const user = session?.user

  console.log({ session })

  // useEffect(() => {
  //   if (!isPending && !session) {
  //     const redirectTo = encodeURIComponent(window.location.href)
  //     window.location.href = `${process.env.NEXT_PUBLIC_ACCOUNTS_URL!}/auth/sign-in?redirect_to=${redirectTo}`
  //   }
  // }, [isPending, session])

  if (isPending || !session) {
    return <LoadingState title="Loading dashboard..." />
  }

  return (
    <div className="bg-background">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <PageHeader
          label={`Welcome back, ${user?.name || 'User'}!`}
          description="Manage your solutions, track your progress, and discover new tools."
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Purchases */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    My Solutions
                    <Link href="/dashboard/purchases">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Your active solutions and subscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchases.map(purchase => (
                      <div
                        key={purchase.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {purchase.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                purchase.status === 'active'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {purchase.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {purchase.status === 'active'
                                ? `Next billing: ${purchase.nextBilling}`
                                : `Trial ends: ${purchase.trialEnds}`}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            $
                            {purchase.price}
                            /mo
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-full"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/marketplace">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Browse Marketplace
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/purchases">
                      <Package className="mr-2 h-4 w-4" />
                      Manage Solutions
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/contact-us">
                      <Calendar className="mr-2 h-4 w-4" />
                      Get Support
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Featured Solutions */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Recommended for You
                </h2>
                <p className="text-muted-foreground">
                  Solutions that complement your current setup
                </p>
              </div>
              <Button
                asChild
                variant="outline"
              >
                <Link href="/dashboard/marketplace">
                  View Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSolutions.map((solution, index) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{solution.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-sm text-muted-foreground">
                            {solution.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{solution.name}</CardTitle>
                      <CardDescription>{solution.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-foreground">
                          $
                          {solution.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          per month
                        </span>
                      </div>
                      <Button
                        asChild
                        className="w-full mt-4 btn-primary"
                      >
                        <Link href={`/solutions/${solution.id}`}>
                          Learn More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

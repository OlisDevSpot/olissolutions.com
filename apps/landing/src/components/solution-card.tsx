'use client'

import type { SolutionWithPsychologyConcepts } from '@/features/solutions/types'
import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@olis/ui/components/card'
import { ArrowRight, Brain, Star, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

interface SolutionCardProps extends SolutionWithPsychologyConcepts {
  showPsychologyConcepts?: boolean
}

export default function SolutionCard({
  id,
  name,
  description,
  whatItDoes,
  howItHelps,
  easeOfUse,
  pricePerMonth,
  isFeatured = false,
  psychologyConcepts,
  showPsychologyConcepts = true,
}: SolutionCardProps) {
  const getEaseOfUseColor = (ease: string) => {
    switch (ease) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow ${isFeatured ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <Badge className={getEaseOfUseColor(easeOfUse)}>
              {easeOfUse}
            </Badge>
            {isFeatured && (
              <Badge className="bg-primary text-primary-foreground">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Psychology Concepts */}
          {showPsychologyConcepts && psychologyConcepts.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {psychologyConcepts.slice(0, 3).map(concept => (
                <Badge key={concept.id} variant="outline" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  {concept.label}
                </Badge>
              ))}
              {psychologyConcepts.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +
                  {psychologyConcepts.length - 3}
                  {' '}
                  more
                </Badge>
              )}
            </div>
          )}

          <CardTitle className="text-xl mb-2">{name}</CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-1">What it does</h4>
                <p className="text-sm text-muted-foreground">{whatItDoes}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-1">How it helps</h4>
                <p className="text-sm text-muted-foreground">{howItHelps}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Star className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-1">Ease of use</h4>
                <p className="text-sm text-muted-foreground">{easeOfUse}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">
                $
                {pricePerMonth}
              </span>
              <span className="text-sm text-muted-foreground">per month</span>
            </div>

            <div className="flex flex-col space-y-2">
              <Button asChild className="btn-primary">
                <Link href={`/solutions/${id}`}>
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">Get Started</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

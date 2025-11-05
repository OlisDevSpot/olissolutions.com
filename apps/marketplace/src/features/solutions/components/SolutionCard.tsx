'use client'

import type { PsychologyConcept, Solution } from '@olis/db/schema/marketplace'
import { ROOTS } from '@olis/core/constants'
import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@olis/ui/components/card'
import { ArrowRightIcon, Brain, DollarSign, Star } from 'lucide-react'
import Link from 'next/link'

interface Props {
  solution: Solution
  showPsychologyConcepts?: boolean
  psychologyConcepts?: PsychologyConcept[]
  subscribed?: boolean
}

export default function SolutionCard({
  solution,
  showPsychologyConcepts = true,
  psychologyConcepts,
  subscribed = false,
}: Props) {
  const solutionUrl = process.env.NODE_ENV === 'production' ? `${solution.subdomain}.olissolutions.com` : `http://localhost:${solution.devPort}`

  const getEaseOfUseColor = (ease: string) => {
    switch (ease) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'moderate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border hover:border-primary/20 group w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
              {solution.name}
            </CardTitle>
            {solution.isFeatured && (
              <Badge className="mt-1 bg-primary/20 text-primary border-primary/30">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          {!subscribed && (
            <div className="text-right flex items-center gap-2">
              <div className="flex items-center text-2xl font-bold text-foreground">
                <DollarSign className="h-5 w-5" />
                {solution.pricePerMonth}
              </div>
              <div className="text-muted-foreground">/ mo</div>
            </div>
          )}
        </div>

        <CardDescription className="text-muted-foreground leading-relaxed w-full">
          {solution.generalDescription.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 grow flex flex-col gap-4">
        {/* What it does */}
        <div className="shrink-0">
          <h4 className="font-semibold text-foreground mb-2">What it does:</h4>
          <p className="text-sm text-muted-foreground">{solution.generalDescription.whatItDoes}</p>
        </div>

        {/* How it helps */}
        <div className="grow">
          <h4 className="font-semibold text-foreground mb-2">How it helps:</h4>
          <p className="text-sm text-muted-foreground">{solution.generalDescription.howItHelps}</p>
        </div>

        {/* Ease of Use */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Ease of use:</span>
          <Badge className={getEaseOfUseColor(solution.easeOfUse)}>
            {solution.easeOfUse}
          </Badge>
        </div>

        {/* Psychology Concepts */}
        {showPsychologyConcepts && psychologyConcepts && psychologyConcepts.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-2">Psychology concepts:</h4>
            <div className="flex flex-wrap gap-1">
              {psychologyConcepts.map(concept => (
                <Badge
                  key={concept.id}
                  variant="outline"
                  className="text-xs border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  {concept.label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <ActionButton id={solution.id} subscribed={subscribed} href={solutionUrl} />
      </CardFooter>
    </Card>
  )
}

interface ActionButtonProps {
  id: number
  subscribed: boolean
  href: string
}

export function ActionButton({ id, subscribed, href }: ActionButtonProps) {
  if (subscribed) {
    return (
      <Button asChild className="w-full btn-primary mt-6" variant="outline">
        <Link href={href}>
          Go to dashboard
          <ArrowRightIcon />
        </Link>
      </Button>
    )
  }

  return (
    <Button asChild className="w-full btn-primary mt-6">
      <Link href={`${ROOTS.marketplace.getMarketplaceRoot()}/${id}`}>
        View Details
      </Link>
    </Button>
  )
}

'use client'

import type { SolutionCardProps } from '../types'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Brain, DollarSign, Star } from 'lucide-react'
import Link from 'next/link'

export default function SolutionCard({
  id,
  name,
  description,
  whatItDoes,
  howItHelps,
  easeOfUse,
  pricePerMonth,
  isFeatured,
  psychologyConcepts,
  showPsychologyConcepts = true,
}: SolutionCardProps) {
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
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border hover:border-primary/20 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
            {isFeatured && (
              <Badge className="mt-1 bg-primary/20 text-primary border-primary/30">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center text-2xl font-bold text-foreground">
              <DollarSign className="h-5 w-5" />
              {pricePerMonth}
            </div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>
        </div>

        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* What it does */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">What it does:</h4>
          <p className="text-sm text-muted-foreground">{whatItDoes}</p>
        </div>

        {/* How it helps */}
        <div>
          <h4 className="font-semibold text-foreground mb-2">How it helps:</h4>
          <p className="text-sm text-muted-foreground">{howItHelps}</p>
        </div>

        {/* Ease of Use */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Ease of use:</span>
          <Badge className={getEaseOfUseColor(easeOfUse)}>
            {easeOfUse}
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

        {/* Action Button */}
        <Button asChild className="w-full btn-primary mt-6">
          <Link href={`/dashboard/marketplace/${id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

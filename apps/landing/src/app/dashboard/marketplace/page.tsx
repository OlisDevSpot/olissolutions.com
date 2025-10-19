'use client'

import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardHeader } from '@workspace/ui/components/card'
import { Brain, Filter, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import {
  SolutionCard,
  usePsychologyConcepts,
  useSolutions,
} from '@/features/solutions'

export default function Marketplace() {
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])

  // Fetch data
  const {
    data: solutions,
    isLoading: solutionsLoading,
    error: solutionsError,
  } = useSolutions(selectedConcepts.length > 0 ? selectedConcepts : undefined)
  const { data: psychologyConcepts, isLoading: conceptsLoading }
    = usePsychologyConcepts()

  const handleConceptToggle = (conceptAccessor: string) => {
    setSelectedConcepts(prev =>
      prev.includes(conceptAccessor)
        ? prev.filter(c => c !== conceptAccessor)
        : [...prev, conceptAccessor],
    )
  }

  const clearFilters = () => {
    setSelectedConcepts([])
  }

  if (solutionsError) {
    return (
      <div className="bg-background">
        <div className="p-6 lg:p-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-destructive">
                Error loading solutions. Please try again.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <PageHeader
        label="Solution Marketplace"
        description="Browse and purchase construction sales tools to grow your business."
      />

      {/* Psychology Concepts Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filter by Psychology Concepts:</span>
          </div>
          {selectedConcepts.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              Clear filters (
              {selectedConcepts.length}
              )
            </Button>
          )}
        </div>

        {conceptsLoading
          ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">
                  Loading concepts...
                </span>
              </div>
            )
          : (
              <div className="flex flex-wrap gap-2">
                {psychologyConcepts?.map(concept => (
                  <Badge
                    key={concept.id}
                    variant={
                      selectedConcepts.includes(concept.accessor)
                        ? 'default'
                        : 'secondary'
                    }
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => handleConceptToggle(concept.accessor)}
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    {concept.label}
                  </Badge>
                ))}
              </div>
            )}
      </div>

      {/* Solutions Count */}
      {solutions && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {selectedConcepts.length > 0
              ? `${solutions.length} solutions found for selected psychology concepts`
              : `${solutions.length} solutions available`}
          </p>
        </div>
      )}

      {/* Solutions Grid */}
      {solutionsLoading
        ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array.from({ length: 6 })].map((_, i) => (
                <Card
                  key={i}
                  className="h-full"
                >
                  <CardHeader>
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="animate-pulse space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        : solutions && solutions.length > 0
          ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <SolutionCard {...solution} />
                  </motion.div>
                ))}
              </div>
            )
          : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No solutions found</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedConcepts.length > 0
                      ? 'Try selecting different psychology concepts or clear your filters.'
                      : 'There are no solutions available at the moment.'}
                  </p>
                  {selectedConcepts.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
    </div>
  )
}

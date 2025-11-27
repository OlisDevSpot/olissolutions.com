'use client'

import { useSession } from '@olis/auth/client'
import { EmptyState } from '@olis/ui/components/states/empty-state'
import { LoadingState } from '@olis/ui/components/states/loading-state'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { PageHeader } from '@/components/page-header'
import {
  SolutionCard,
} from '@/features/solutions'
import { useTRPC } from '@/trpc/client'

export default function Marketplace() {
  const { data: session } = useSession()
  const trpc = useTRPC()
  const { data: solutions, isPending } = useQuery(trpc.solutions.findAll.queryOptions({ isActive: true }))

  const { data: subscriptions } = useQuery(trpc['x-subscriptions'].findAll.queryOptions())

  if (isPending) {
    return <LoadingState title="Loading solutions..." />
  }

  if (!solutions) {
    return <div>No solutions found</div>
  }

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header */}
      <PageHeader
        label="Solution Marketplace"
        description="Browse and purchase construction sales tools to grow your business."
      />
      <div className="w-full h-full grow overflow-y-clip">
        {solutions.length === 0
          ? (<EmptyState title="No solutions found" />)
          : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 h-full w-full">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <SolutionCard solution={solution} subscribed={session?.user?.role === 'super-admin' || subscriptions?.some(sub => sub.solutionId === solution.id) || false} psychologyConcepts={'psychologyConcepts' in solution ? solution.psychologyConcepts : undefined} />
                  </motion.div>
                ))}
              </div>
            )}
      </div>
    </div>
  )
}

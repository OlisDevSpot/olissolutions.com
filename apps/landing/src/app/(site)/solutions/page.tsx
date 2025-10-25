'use client'

import { Badge } from '@olis/ui/components/badge'
import { AnimateOnScroll } from '@olis/ui/components/global/animate-on-scroll'
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from '@olis/ui/hooks/use-scroll-animation'
import { motion } from 'motion/react'
import SolutionCard from '@/components/solution-card'
import { categories, solutions } from '@/features/landing/data'

export default function SolutionsPage() {
  const categoriesRef = useScrollAnimation()
  const solutionsRef = useScrollAnimation()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-linear-to-br from-background to-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge
                variant="secondary"
                className="mb-4"
              >
                Our Solutions
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Tools Built for
                <span className="text-gradient"> Construction Sales</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover our comprehensive suite of digital tools designed
                specifically for construction sales professionals. Each solution
                is crafted to help you present professionally, manage
                efficiently, and close more deals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={categoriesRef?.ref}
            initial="hidden"
            animate={categoriesRef.isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="flex flex-wrap gap-2 justify-center"
          >
            {categories.map(category => (
              <motion.div
                key={category}
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Badge
                  variant={category === 'All' ? 'default' : 'secondary'}
                  className="cursor-pointer hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={solutionsRef?.ref}
            initial="hidden"
            animate={solutionsRef.isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                variants={staggerItem}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <SolutionCard
                  id={index + 1}
                  name={solution.title}
                  description={solution.description}
                  whatItDoes={solution.description}
                  howItHelps={solution.description}
                  easeOfUse="moderate"
                  pricePerMonth={0}
                  isFeatured={false}
                  psychologyConcepts={[]}
                  showPsychologyConcepts={true}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimateOnScroll variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of construction professionals who are already
                using our tools to increase their sales and grow their business.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  '30-day free trial on all solutions',
                  'Cancel anytime',
                  '24/7 support included',
                ].map(text => (
                  <motion.div
                    key={text}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-base px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {text}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  )
}

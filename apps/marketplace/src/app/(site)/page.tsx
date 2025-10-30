'use client'

import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@olis/ui/components/card'
import ContentSection from '@olis/ui/components/content-7'
import { FeaturesSection } from '@olis/ui/components/features-7'
import { KanbanFeaturesSection } from '@olis/ui/components/features-8'
import { AnimateOnScroll } from '@olis/ui/components/global/animate-on-scroll'
import { LoadingState } from '@olis/ui/components/global/loading-state'
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from '@olis/ui/hooks/use-scroll-animation'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Shield,
  Star,
  Trophy,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'
import { eliteStats, eliteTestimonials } from '@/features/landing'
import { MarketRealitySection } from '@/features/landing/ui/components/market-reality-section'
import { useTRPC } from '@/trpc/client'

export default function HomePage() {
  const solutionsRef = useScrollAnimation()
  const testimonialsRef = useScrollAnimation()
  const trpc = useTRPC()
  const { data: solutions, isPending } = useQuery(trpc.solutions.findAll.queryOptions({ isActive: true }))

  return (
    <div className="flex flex-col">

      <HeroSection />
      <FeaturesSection />
      <KanbanFeaturesSection />
      <MarketRealitySection />
      <ContentSection />

      <section
        id="solutions"
        className="py-20 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="mb-4 border-orange-500/50 text-orange-500 bg-orange-500/10"
            >
              🚀 Revolutionary Arsenal
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              8 Weapons That Transform Average Salespeople Into
              {' '}
              <span className="text-gradient">Industry Legends</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don&apos;t just provide tools—we provide the unfair advantage
              that guarantees the sale.
              Born from deep construction expertise.
            </p>
          </AnimateOnScroll>

          <motion.div
            ref={solutionsRef?.ref}
            initial="hidden"
            animate={solutionsRef.isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {isPending
              ? <LoadingState title="Loading solutions..." />
              : solutions?.map(solution => (
                  <motion.div
                    key={solution.id}
                    variants={staggerItem}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Card
                      className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    >
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {solution.name}
                        </CardTitle>
                        <CardDescription className="font-semibold text-orange-600">
                          {solution.generalDescription.description}
                        </CardDescription>
                        <CardDescription className="text-base mt-2">
                          {solution.generalDescription.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {solution.psychologyConcepts.map(psychologyConcept => (
                              <div
                                key={psychologyConcept.id}
                                className="flex items-center text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                                {psychologyConcept.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="mb-4 border-orange-500/50 text-orange-500 bg-orange-500/10"
            >
              💰 The Financial Reality
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Single Sale ROI: One Deal Pays for
              {' '}
              <span className="text-gradient">12+ Months</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In a business where single meetings determine $50,000+
              commissions, the right tools don&apos;t cost money—they make
              money.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {eliteStats.map(stat => (
              <AnimateOnScroll
                key={stat.label}
                variants={scaleIn}
                threshold={0.1}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      {stat.number}
                    </div>
                    <CardTitle className="text-lg">{stat.label}</CardTitle>
                    <CardDescription className="text-sm">
                      {stat.sublabel}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll
            variants={fadeInUp}
            className="text-center"
          >
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-orange-500/30 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-4">
                The question isn&apos;t whether you can afford our platform.
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                The question is whether you can afford to keep losing deals to
                competitors who are already using it.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span>Extra $5K-$50K per successful sale</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span>30-40% additional upsell revenue</span>
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span>15-25% margin enhancement</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="mb-4 border-orange-500/50 text-orange-500 bg-orange-500/10"
            >
              🏆 Elite Results
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              From the Ranks of Southern California&apos;s
              {' '}
              <span className="text-gradient">Home Improvement Elite</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real salespeople closing real high-stakes deals.
            </p>
          </AnimateOnScroll>

          <motion.div
            ref={testimonialsRef?.ref}
            initial="hidden"
            animate={testimonialsRef.isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {eliteTestimonials.map(testimonial => (
              <motion.div
                key={testimonial.name}
                variants={staggerItem}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <Card
                  className={`h-full hover:shadow-xl transition-all duration-300 ${
                    testimonial.featured
                      ? 'ring-1 ring-orange-500/50 bg-orange-500/5'
                      : ''
                  }`}
                >
                  <CardHeader>
                    {testimonial.featured && (
                      <Badge
                        variant="secondary"
                        className="mb-4 bg-orange-500/20 text-orange-600 border-orange-500/30 w-fit"
                      >
                        ⭐ FEATURED SUCCESS
                      </Badge>
                    )}
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array.from({ length: 5 })].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <CardDescription className="text-base italic mb-4">
                      &quot;
                      {testimonial.quote}
                      &quot;
                    </CardDescription>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                        <div className="font-bold text-orange-600">
                          {testimonial.revenue}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Revenue Impact
                        </div>
                      </div>
                      <div className="text-center bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                        <div className="font-bold text-orange-600">
                          {testimonial.increase}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          In
                          {' '}
                          {testimonial.timeframe}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-primary font-semibold">
                        {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            variants={scaleIn}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <Badge
                variant="outline"
                className="mb-6 border-orange-500/50 text-orange-500 bg-orange-500/10 px-4 py-2"
              >
                ⚡ LIMITED ACCESS - SoCal Elite Only
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Join the Ranks of
                {' '}
                <span className="text-gradient">
                  Southern California&apos;s Elite
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Your competitors are hoping you&apos;ll keep doing things the
                old way. We&apos;re here to make sure you don&apos;t. Transform
                from average performer to industry legend.
              </p>

              <div className="bg-slate-900 text-white rounded-lg p-6 mb-8 border border-orange-500/30">
                <h3 className="text-xl font-bold text-orange-400 mb-4">
                  ⏰ Act Now - Limited Time Offer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      FREE
                    </div>
                    <div className="text-sm text-slate-300">
                      14-Day Elite Trial
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">$0</div>
                    <div className="text-sm text-slate-300">
                      Setup or Training Fees
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      24/7
                    </div>
                    <div className="text-sm text-slate-300">
                      Elite Support Access
                    </div>
                  </div>
                </div>
                <p className="text-center text-slate-300 text-sm">
                  ⚠️ Access restricted to serious professionals in SoCal home
                  improvement only
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 h-auto shadow-xl"
                  >
                    <Link href="/sign-in">
                      Claim Your Elite Access
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4 h-auto border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Link href="/solutions">See The Full Arsenal</Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-orange-500 mr-2" />
                  <span>Israeli expertise & cultural understanding</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-orange-500 mr-2" />
                  <span>Proven by SoCal&apos;s top performers</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-orange-500 mr-2" />
                  <span>Single sale pays for 12+ months</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-8 text-center"
              >
                <p className="text-lg font-semibold text-orange-600">
                  &quot;In an industry where your closest competitor is doing
                  nothing at all, Olis Solutions provides the nuclear
                  option.&quot;
                </p>
              </motion.div>
            </motion.div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}

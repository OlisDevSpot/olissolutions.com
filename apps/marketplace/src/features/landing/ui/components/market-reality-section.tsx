import { Badge } from '@olis/ui/components/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@olis/ui/components/card'
import { AnimateOnScroll } from '@olis/ui/components/global/animate-on-scroll'
import { fadeInUp, staggerContainer, staggerItem, useScrollAnimation } from '@olis/ui/hooks/use-scroll-animation'
import { motion } from 'motion/react'

export function MarketRealitySection() {
  const statsRef = useScrollAnimation()

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-orange-500/50 text-orange-500 bg-orange-500/10"
          >
            ⚠️ The Brutal Reality
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Southern California&apos;s Home Improvement Battlefield
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            While your competitors show up with pen and paper, you&apos;ll
            arrive with the nuclear option.
          </p>
        </AnimateOnScroll>

        <motion.div
          ref={statsRef?.ref}
          initial="hidden"
          animate={statsRef.isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              stat: '60-70%',
              problem: 'Salesperson Turnover',
              reason: 'Burnout & inconsistent results',
            },
            {
              stat: 'Millions',
              problem: 'Lost Upsell Revenue',
              reason: 'Zero follow-up systems',
            },
            {
              stat: '$50K+',
              problem: 'Commission Leakage',
              reason: 'Deals that should close but don\'t',
            },
            {
              stat: '90 Days',
              problem: 'Learning Curve',
              reason: 'New salespeople winging it',
            },
          ].map(item => (
            <motion.div
              key={item.problem}
              variants={staggerItem}
              className="text-center group"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {item.stat}
                  </div>
                  <CardTitle className="text-white text-lg">
                    {item.problem}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm">{item.reason}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimateOnScroll
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <div className="bg-slate-800/50 border border-orange-500/30 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-orange-400 mb-3">
              The Israeli-led home improvement companies dominating Southern
              California needed a solution...
            </h3>
            <p className="text-lg text-slate-300">
              Built by people who understand their culture, their market, and
              their million-dollar stakes.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

export function HeroSectionPrevious() {
  return (
    <section
      className="relative py-20 lg:py-32 min-h-[calc(100vh-var(--navbar-height))] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{
        backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 40% 70%, rgba(20, 184, 166, 0.4), transparent 50%)',
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="container relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <Badge
              variant="outline"
              className="mb-6 text-orange-500 border-orange-500/50 bg-orange-500/10 px-4 py-2"
            >
              🏆 Southern California&apos;s Elite Choice
            </Badge>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              The Top Sales Toolbox for
              {' '}
              <span className="block bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Home Improvement
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Born from deep construction expertise. The only comprehensive
              sales ecosystem designed for high-stakes residential home
              improvement sales where single meetings determine $18,000 to
              $200,000+ commissions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg px-8 py-4 h-auto shadow-2xl"
                >
                  <Link href="/sign-in">
                    Get Your Unfair Advantage
                    <ArrowRight className="ml-2 h-5 w-5" />
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
                  className="text-lg px-8 py-4 h-auto border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 transition-colors"
                >
                  <Link href="#solutions">See The Arsenal</Link>
                </Button>
              </motion.div>
            </div>

            {/* Urgency Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 text-red-300">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">
                  Your competitors are hoping you&apos;ll keep doing things
                  the old way.
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

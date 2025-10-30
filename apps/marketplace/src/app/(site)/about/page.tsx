'use client'

import { Badge } from '@olis/ui/components/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@olis/ui/components/card'
import { AnimateOnScroll } from '@olis/ui/components/global/animate-on-scroll'
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from '@olis/ui/hooks/use-scroll-animation'
import { motion } from 'motion/react'
import { stats, values } from '@/features/landing/data'

export default function AboutPage() {
  const statsRef = useScrollAnimation()
  const valuesRef = useScrollAnimation()

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
                variant="outline"
                className="mb-4 text-orange-500 border-orange-500/50 bg-orange-500/10"
              >
                🇮🇱 Israeli Innovation Meets SoCal Expertise
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Built by Israelis Who Understand
                <span className="text-gradient"> Southern California</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Founded by Israeli entrepreneur Ophir Oliver Porat, Olis
                Solutions emerged from deep cultural understanding of both
                worlds: the precision and innovation of Israeli business
                culture, and the high-stakes reality of Southern
                California&apos;s home improvement market where single deals
                determine financial futures.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef?.ref}
            initial="hidden"
            animate={statsRef.isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <motion.div
                      className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 },
                      }}
                    >
                      <stat.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                      <CardTitle className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                        {stat.value}
                      </CardTitle>
                    </motion.div>
                    <CardDescription className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimateOnScroll variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                The Cultural Bridge That Changes Everything
              </h2>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                We understand what others miss: Southern California&apos;s home
                improvement elite aren&apos;t just selling
                construction—they&apos;re selling transformation. And many of
                the most successful companies are led by Israeli entrepreneurs
                who bring a unique combination of precision, innovation, and
                cultural understanding to this market.
              </motion.p>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Traditional sales software was built for generic sales
                processes. We built Olis Solutions specifically for the
                high-stakes, relationship-driven, culturally-nuanced world of
                Southern California home improvement sales where single meetings
                determine $50,000+ outcomes.
              </motion.p>
              <motion.div
                className="bg-slate-50 dark:bg-slate-800/50 border border-orange-500/30 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <p className="text-lg text-foreground font-semibold text-center">
                  &quot;We speak both languages: the language of Israeli
                  business precision and the language of Southern California
                  home improvement success.&quot;
                </p>
              </motion.div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Israeli Advantage in SoCal Sales
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We&apos;re not just another software company. We&apos;re the
              bridge between Israeli innovation culture and Southern
              California&apos;s home improvement elite—bringing military-grade
              precision to an industry where details determine million-dollar
              outcomes.
            </p>
          </AnimateOnScroll>

          <motion.div
            ref={valuesRef?.ref}
            initial="hidden"
            animate={valuesRef.isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map(value => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll
              variants={scaleIn}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Meet Our Founder
              </h2>
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="text-left hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                        whileHover={{
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.6 },
                        }}
                      >
                        <span className="text-2xl font-bold text-primary">
                          OP
                        </span>
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          Ophir Oliver Porat
                        </CardTitle>
                        <CardDescription className="text-lg text-orange-600 font-semibold">
                          Israeli Founder & CEO
                        </CardDescription>
                        <Badge
                          variant="outline"
                          className="mt-2 text-xs border-orange-500/50 text-orange-600 bg-orange-500/10"
                        >
                          🇮🇱 Israeli Innovation • 🌴 SoCal Market Expert
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.p
                      className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      Born and raised in Israel, Ophir brings the precision and
                      innovation mindset of Israeli business culture to Southern
                      California&apos;s home improvement market. He founded Olis
                      Solutions in 2021 after recognizing that many of the most
                      successful home improvement companies in SoCal were led by
                      Israeli entrepreneurs who lacked tools designed for their
                      unique cultural approach to high-stakes sales.
                    </motion.p>
                    <br />
                    <motion.p
                      className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      Understanding both the Israeli approach to business
                      excellence and the Southern California market dynamics,
                      Ophir built Olis Solutions as the missing
                      bridge—technology that speaks the language of precision,
                      relationship-building, and cultural nuance that defines
                      success in this elite market. Under his leadership, the
                      platform has become the secret weapon for SoCal&apos;s
                      home improvement elite.
                    </motion.p>
                    <br />
                    <motion.div
                      className="bg-slate-50 dark:bg-slate-800/50 border border-orange-500/30 rounded-lg p-4 mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    >
                      <p className="text-sm font-semibold text-orange-600 text-center italic">
                        &quot;I built this platform because I understand what it
                        means to bridge two worlds: Israeli business excellence
                        and Southern California home improvement success. This
                        isn&apos;t just software—it&apos;s cultural intelligence
                        made digital.&quot;
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  )
}

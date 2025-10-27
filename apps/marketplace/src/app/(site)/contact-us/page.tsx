'use client'

import type {
  ContactForm,
} from '@/features/marketplace/schemas/contact-us'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@olis/ui/components/accordion'
import { Badge } from '@olis/ui/components/badge'
import { Button } from '@olis/ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@olis/ui/components/card'
import { AnimateOnScroll } from '@olis/ui/components/global/animate-on-scroll'
import { Input } from '@olis/ui/components/input'
import { Label } from '@olis/ui/components/label'
import { Textarea } from '@olis/ui/components/textarea'
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from '@olis/ui/hooks/use-scroll-animation'
import { Send } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { contactInfo, faqs } from '@/features/marketplace/data'
import {
  contactSchema,
} from '@/features/marketplace/schemas/contact-us'

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactRef = useScrollAnimation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async () => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success(
      'Message sent successfully! We\'ll get back to you within 24 hours.',
    )

    reset()
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-muted/50">
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
                Contact Us
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Get in
                {' '}
                <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Have questions about our solutions? Want to schedule a demo?
                We&apos;re here to help you succeed in construction sales.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={contactRef?.ref}
            initial="hidden"
            animate={contactRef.isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {contactInfo.map(info => (
              <motion.div
                key={info.title}
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
                      <info.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {info.details}
                    </p>
                    <CardDescription className="group-hover:text-foreground transition-colors">
                      {info.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variants={scaleIn}>
            <motion.div
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="hover:shadow-2xl transition-all duration-500">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you as
                    soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div
                        className="space-y-2"
                        variants={staggerItem}
                      >
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          {...register('name')}
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        variants={staggerItem}
                      >
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...register('email')}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div
                        className="space-y-2"
                        variants={staggerItem}
                      >
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="(555) 123-4567"
                          {...register('phone')}
                        />
                      </motion.div>
                      <motion.div
                        className="space-y-2"
                        variants={staggerItem}
                      >
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Your company name"
                          {...register('company')}
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What's this regarding?"
                        {...register('subject')}
                        className={errors.subject ? 'border-destructive' : ''}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive">
                          {errors.subject.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        {...register('message')}
                        className={errors.message ? 'border-destructive' : ''}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? (
                              'Sending...'
                            )
                          : (
                              <>
                                Send Message
                                <Send className="ml-2 h-4 w-4" />
                              </>
                            )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our solutions.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll
            variants={scaleIn}
            className="space-y-6 border rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-0"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <AccordionTrigger className="text-xl data-[state=open]:pb-4 p-8 hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-muted-foreground px-8">
                      <motion.p
                        className="text-muted-foreground text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}

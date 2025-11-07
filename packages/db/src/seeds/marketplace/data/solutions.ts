import type { InsertSolution } from '@olis/db/schema/marketplace'
import type { PsychologyConceptsAccessor } from '@olis/db/types/marketplace/psychology-concepts'

export const solutionsData = [
  {
    name: 'Remodel-X',
    slug: 'remodel-x',
    generalDescription: {
      description: 'A project design and sales management tool that helps salespeople close more profitable deals.',
      whatItDoes: 'Automates the sales process, streamlining the sales cycle and increasing sales success.',
      howItHelps: 'Reduces sales time and improves sales success rate.',
    },
    easeOfUse: 'easy',
    pricePerMonth: 99,
    devPort: 3001,
    subdomain: 'remodel-x',
    salesPsychologyConcepts: [
      'authority',
      'socialProof',
      'priceAnchoring',
      'scarcity',
    ],
    isActive: true,
  },
  {
    name: 'Automatic Texts',
    slug: 'automatic-texts',
    generalDescription: {
      description: 'A tool that sends pre-crafted, psychologically powerful text messages to the salesperson\'s phone to be shown to homeowners during meetings.',
      whatItDoes: 'Simulates real-time customer messages to boost the salesperson\'s credibility and influence.',
      howItHelps: 'Triggers buyer psychology by displaying texts from happy customers, urgent situations, or pricing wins to nudge the homeowner toward closing.',
    },
    easeOfUse: 'easy',
    pricePerMonth: 49,
    devPort: 9999,
    subdomain: 'automatic-texts',
    salesPsychologyConcepts: [
      'urgency',
      'socialProof',
      'priceAnchoring',
      'scarcity',
      'authority',
    ],
    isActive: true,
  },
  {
    name: 'Project Scoper',
    slug: 'project-scoper',
    generalDescription: {
      description: 'A wizard-style tool that helps salespeople automatically generate detailed scopes of work for multi-part construction projects.',
      whatItDoes: 'Guides the salesperson through each trade or sub-project to build a complete scope of work and accurate pricing.',
      howItHelps: 'Increases trust and clarity for the homeowner, reducing confusion and increasing likelihood of saying yes.',
    },
    easeOfUse: 'moderate',
    pricePerMonth: 99,
    devPort: 9999,
    subdomain: 'project-scoper',
    salesPsychologyConcepts: [
      'authority',
    ],
  },
  {
    name: 'Salesperson Starter Kit',
    slug: 'salesperson-starter-kit',
    generalDescription: {
      description: 'A complete onboarding suite for new salespeople, providing resources and training to start closing deals fast.',
      whatItDoes: 'Gives access to checklists, construction education, project photos, and proven sales techniques.',
      howItHelps: 'Equips salespeople to appear confident and credible from day one, increasing authority and consistency in sales.',
    },
    easeOfUse: 'easy',
    pricePerMonth: 29,
    devPort: 9999,
    subdomain: 'salesperson-starter-kit',
    salesPsychologyConcepts: [
      'authority',
      'socialProof',
    ],
  },
  {
    name: 'Appointments AI',
    slug: 'appointments-ai',
    generalDescription: {
      description: 'An AI tool that analyzes recorded homeowner meetings and gives personalized feedback to optimize closing and upselling.',
      whatItDoes: 'Listens to calls, generates summaries, and suggests improvements or upsell opportunities.',
      howItHelps: 'Improves future sales interactions by reinforcing what works and correcting what doesn’t.',
    },
    easeOfUse: 'moderate',
    pricePerMonth: 79,
    devPort: 9999,
    subdomain: 'appointments-ai',
    salesPsychologyConcepts: [
      'authority',
    ],
  },
  {
    name: 'AI Follow Up',
    slug: 'ai-follow-up',
    generalDescription: {
      description: 'An agentic AI system that automatically follows up with homeowners post-meeting to boost conversion and upsell rates.',
      whatItDoes: 'Sends personalized messages based on time delay (1 week, 1 month, etc.) with value-based reminders or scheduling nudges.',
      howItHelps: 'Keeps the homeowner engaged and nudges them at psychologically optimized moments.',
    },
    easeOfUse: 'easy',
    pricePerMonth: 59,
    devPort: 9999,
    subdomain: 'ai-follow-up',
    salesPsychologyConcepts: [
      'urgency',
    ],
  },
  {
    name: 'AI Testimonials',
    slug: 'ai-testimonials',
    generalDescription: {
      description: 'A service that uses AI to generate realistic video testimonials from past \'customers\' to build trust and credibility.',
      whatItDoes: 'Creates high-quality, emotion-driven testimonial content for use during the sales pitch.',
      howItHelps: 'Builds trust, validates the service, and removes hesitation using social proof.',
    },
    easeOfUse: 'easy',
    pricePerMonth: 69,
    devPort: 9999,
    subdomain: 'ai-testimonials',
    salesPsychologyConcepts: [
      'socialProof',
      'authority',
    ],
  },
  {
    name: 'Construction JS Injections',
    slug: 'construction-js-injections',
    generalDescription: {
      description: 'A powerful Chrome-based overlay system that lets salespeople control what homeowners see during meetings.',
      whatItDoes: 'Displays custom content like reviews, news articles, or visuals that support the sale.',
      howItHelps: 'Shapes homeowner perception in real-time to overcome objections and build trust.',
    },
    easeOfUse: 'easy',
    pricePerMonth: 199,
    devPort: 9999,
    subdomain: 'construction-js-injections',
    salesPsychologyConcepts: [
      'socialProof',
      'authority',
      'scarcity',
    ],
    isFeatured: true,
  },
  {
    name: 'PPA Helper',
    slug: 'ppa-helper',
    generalDescription: {
      description: 'An interactive storytelling tool that helps salespeople explain and pitch Power Purchase Agreements (PPAs).',
      whatItDoes: 'Uses graphics, simplified logic, and storytelling to make PPAs easy to understand and desirable.',
      howItHelps: 'Reduces confusion and resistance by making the complex feel simple, and connects logically and emotionally.',
    },
    easeOfUse: 'easy',
    pricePerMonth: 89,
    devPort: 9999,
    subdomain: 'ppa-helper',
    salesPsychologyConcepts: [
      'authority',
    ],
  },
] as const satisfies (InsertSolution & { salesPsychologyConcepts: PsychologyConceptsAccessor[] })[]

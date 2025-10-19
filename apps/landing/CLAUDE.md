# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with Next.js and TypeScript rules
- `npm run db:push` - Push database schema changes to Neon DB
- `npm run db:seed` - Seed database with initial data
- `npm run types:check` - Run TypeScript type checking

## Environment Setup

Required environment variables in `.env.local`:

- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication public key
- `CLERK_SECRET_KEY` - Clerk authentication secret key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Clerk sign-in URL path
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Clerk sign-up URL path

Database setup:

1. Create Neon DB project and obtain connection string
2. Configure `DATABASE_URL` in `.env.local`
3. Run `npm run db:push` to create tables
4. Run `npm run db:seed` to populate with sample data

## Project Architecture

### Tech Stack

#### General

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode

#### Frontend

- **Styling**: Tailwind CSS v4 (via @tailwindcss/postcss)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: motion library (formerly framer-motion)
- **Icons**: Lucide React
- **Fonts**: Nunito (primary) and Syne (variable) from Google Fonts
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form with ShadCN `Form` component and Zod validation

#### Database

- **drizzle-orm**: ORM
- **PostgreSQL**: DB
- **NeonDB**: DBMS

##### Database Schema

Core entities:

- **Users**: User accounts with Clerk integration (`clerkUserId`, `name`, `email`)
- **Solutions**: Sales tools and products (`name`, `description`, `pricePerMonth`, `easeOfUse`)
- **Psychology Concepts**: Sales psychology principles (`label`, `accessor`, `description`)

Relationship tables:

- **xUsersSolutions**: Many-to-many linking users to their purchased solutions
- **xSolutionsPsychologyConcepts**: Many-to-many linking solutions to psychology concepts

Database workflow:

- Schema defined in `src/drizzle/schema/`
- Migrations in `src/drizzle/migrations/`
- Seeds in `src/drizzle/seeds/` with sample data
- Configuration in `drizzle.config.ts`

#### Backend

- **HTTP Server**: Next.js API Routes
- **Auth**: Clerk

##### Authentication

Clerk integration provides:

- User registration and login with email/password and social providers
- Session management and protected routes
- User profile management
- Integration with database via `clerkUserId` field

Authentication patterns:

- Protected pages use Clerk's `auth()` middleware
- User data synced between Clerk and local database
- API routes protected with `auth()` helper
- Client-side authentication state with `useUser()` hook

#### Utility & Function

- **zod**: Schema validation

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui components (complete set pre-installed)
- `src/components/` - Custom application components
- `src/lib/` - Utility functions and configurations
- `src/hooks/` - Custom React hooks
- `src/modules/` - Our per-module components, logic, and data. Co-located files per module

### Key Configuration

- **Paths**: `@/*` alias maps to `src/*`
- **ESLint**: Extends Next.js core web vitals and TypeScript rules, enforces double quotes
- **shadcn/ui**: Configured with "new-york" style, CSS variables, and neutral base color
- **Tailwind**: v4 configuration via PostCSS plugin

### Component Development

- Use shadcn/ui components from `@/components/ui` as building blocks
- Follow the existing pattern of exporting components with proper TypeScript types
- Utilize the `cn()` utility function from `@/lib/utils` for conditional class merging
- Components should be built with Radix UI primitives when shadcn/ui components are insufficient
- Components should live in the most related `src/modules` folder for code organization & co-location

### Business Context

This is the landing page and marketplace platform for "Olis Solutions" - a digital solutions provider for the Southern California construction industry, as indicated by the metadata description.

Olis Solutions provides high-conversion, in-home sales tools tailored for residential home improvement companies in Southern California. Built to support 3–5 hour, one-sit meetings with deal sizes of $18k–$200k+. All tools tightly integrated with psychological buy triggers:

#### Sales tools

1. Automated Social Proof System
   Trigger-based SMS sending (manual or AI-timed)
   Preloaded fake/testimonial message templates
   Real-time delivery during live meetings
   Integration with SMS APIs (e.g., Twilio)

2. Project Scoping & Pricing Engine
   Dynamic form-based scope builder
   Multi-phase project structure support
   Real-time margin and pricing calculator
   Exportable proposals (PDF, web view)
   Product/upgrade database with configuration options

3. Salesperson Enablement Toolkit
   Onboarding dashboard with training content
   Access to pitch decks, scripts, product media
   Role-based access control (manager vs rep)

4. Appointments AI (Meeting Analyzer)
   Audio/video recording of sales meetings
   AI analysis pipeline (transcription → NLP sentiment → insights)
   Close rate prediction, objection detection, and upsell prompts
   Secure storage with permissions and playback UI

5. AI Follow-Up System
   Smart CRM with lead nurturing workflows
   Email/SMS sequences triggered by meeting status
   Follow-up timeline builder (weeks/months/years)
   Native reminders + integrations with external CRM (e.g., HubSpot)

6. AI-Generated Testimonials
   Fake or semi-automated video testimonial generation
   Script templates + avatar/video synthesis (e.g., Synthesia API)
   Auto-tagging by use case (reputation, upsell, trust)

7. “JS Injection” Overlay System
   Custom browser-based script injection tool
   Overlay or modify third-party websites in real-time
   Controlled by salesperson via interface during presentation
   Target domains (e.g., Yelp, BBB, news sites)
   Legal/ethical guardrails configurable per company

8. PPA Helper (Sales Explainer Tool)
   Visual explainer builder for complex financing (e.g., solar PPAs)
   Drag-and-drop storytelling components (graphs, cost comparisons)
   Data-driven storytelling widgets (before/after bills, loan vs lease)
   Export/share presentation view for homeowner

#### Psychological Buy Triggers

1. Social proof
2. Urgency
3. Authority / trust
4. Price anchoring / conditioning
5. Scarcity

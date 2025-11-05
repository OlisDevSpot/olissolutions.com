# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

1StopSales 2.0 is a cost calculator application built with Next.js 15, featuring a full-stack architecture with Hono API backend, Better Auth authentication, Drizzle ORM with PostgreSQL, and a comprehensive cost calculation engine for home improvement services.

## Key Technologies

- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS, shadcn/ui components
- **Backend**: Hono.js API framework with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (hosted on Neon)
- **Authentication**: Better Auth with email/password and email verification
- **Styling**: TailwindCSS v4 with dark/light theme support
- **Email**: Resend for transactional emails
- **Environment**: Node.js with strict TypeScript configuration

## Development Commands

```bash
# Start development server with turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database operations
npm run db:push        # Push schema changes to database
npm run db:studio      # Open Drizzle Studio
npm run db:seed        # Seed database with initial data
npm run db:reset       # Reset and re-seed database

# API documentation
npm run open-api-docs  # Open Better Auth API docs at localhost:3000/api/auth/reference
```

## Architecture Overview

### File Structure Logic

- **Frontend**: Next.js App Router with route-based file organization in `src/app/`
  - `(marketplace)/` - Public marketplace page
  - `auth/` - Authentication pages (login/signup)
  - `dashboard/` - Protected dashboard area
  - `api/[[...routes]]/route.ts` - Single API route handler that delegates to Hono

- **Backend**: Hono.js API in `src/server/` with modular routing
  - `routes/` - Feature-based route modules (auth, projects, solutions, etc.)
  - `middlewares/` - Custom middleware (auth, logging, project context)
  - `lib/` - Core application setup and utilities

- **Database**: Drizzle ORM setup in `src/drizzle/`
  - `schema/` - Database schema definitions organized by domain
  - `seeds/` - Seed data and seeding logic
  - `migrations/` - Auto-generated migration files

- **Business Logic**: Domain modules in `src/modules/`
  - `cost-calculator/` - Core cost calculation engine with formulas
  - `auth/` - Authentication UI components and schemas
  - `trades/` - Trade-related business logic

### Authentication Flow

The app uses Better Auth with a custom session system:

1. Email/password authentication with required email verification
2. Custom user roles (admin/user) with "user" as default
3. Session includes `activeProjectId` for project-scoped operations
4. Protected routes enforced via Next.js middleware
5. Automatic redirects: authenticated users → dashboard, unauthenticated users → login

### API Architecture

**Single Route Handler Pattern**: All API requests go through `src/app/api/[[...routes]]/route.ts` which delegates to the Hono app in `src/server/app.ts`. This provides:

- Unified middleware pipeline (CORS, logging, error handling)
- Better Auth integration at `/api/auth/*` routes
- Modular route organization with auto-mounting

**Route Structure**:

- `/api/auth/*` - Better Auth endpoints (handled automatically)
- `/api/projects` - Project CRUD operations
- `/api/solutions` - Solution catalog management
- `/api/trades` - Trade options management
- `/api/cost-calculator` - Cost calculation endpoints
- `/api/users` - User management

### Database Schema Architecture

The schema is organized around a cost calculation engine:

**Core Entities**:

- `customers` - Customer information
- `projects` - Individual project instances
- `solutions` - Available home improvement solutions (HVAC, roofing, etc.)
- `trades` - Optional trade packages
- `variables` - Dynamic project variables for calculations

**UI/Display Entities**:

- `materials` - Materials used in solutions
- `benefits` - Customer-facing benefit descriptions
- `benefit_categories` - Groupings for benefits
- `pricing` - Base pricing configurations

**Junction Tables**: Uses `x-` prefix for relationship tables (e.g., `x-project-solution`, `x-material-benefits`)

### Cost Calculation Engine

Located in `src/modules/cost-calculator/`:

- **Formulas**: Domain-specific calculation formulas (HVAC, roofing, solar, etc.)
- **Calculate**: Main calculation logic with 2.8x markup for pricing
- **Types**: TypeScript interfaces for project variables and calculations
- **Cache**: Formula caching system for performance

## Environment Setup

The app uses `.env.local` file (not `.env`) with the following required variables:

- `DATABASE_URL` - Neon PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Authentication secret
- `BETTER_AUTH_URL` - Base URL for auth callbacks
- `RESEND_API_KEY` - For transactional emails
- `NEXT_PUBLIC_BASE_URL` - Public-facing base URL

Environment validation is handled by `src/env/index.ts` with Zod schemas.

## Component Architecture

**UI Components**: Uses shadcn/ui pattern with components in `src/components/ui/`

- All components are customizable via `components.json`
- Theme system supports dark/light modes via `next-themes`
- Custom components in `src/components/` for app-specific functionality

**Layout System**:

- Dashboard uses sidebar layout with `AppSidebar` and `AppTopbar`
- Sidebar state persistence via cookies
- Responsive design with mobile-first approach

## Development Guidelines

- **Database Changes**: Always run `npm run db:push` after schema modifications
- **Type Safety**: The project enforces strict TypeScript - all types must be properly defined
- **Error Handling**: Uses Stoker middleware for consistent API error responses
- **Logging**: Pino logger integrated throughout the application
- **Testing**: No test setup currently - tests would need to be added manually
- **Code Quality**: ESLint with @antfu/eslint-config for consistent code style

## Common Patterns

- **Repository Pattern**: Used in server routes for data access abstraction
- **Zod Validation**: Request/response validation throughout API routes
- **Custom Hooks**: React hooks in `src/hooks/` for reusable logic
- **Middleware Chain**: Auth → Logging → CORS → Route Handlers
- **Error Boundaries**: Implemented at layout level for graceful degradation

## Business Logic & Product Information

### Overview

**1StopSales** is a digital sales enablement platform purpose-built for Southern California's in-home improvement sales industry. The platform empowers sales representatives selling construction trade services (roofing, siding, HVAC, windows, solar, landscaping) to conduct professional, interactive, and highly visual presentations during in-person homeowner meetings.

The platform replaces outdated pen-and-paper methods with an **"Amazon cart"-style workflow** where salespeople:

1. Start a project and configure it with specific trades, solutions, and variables
2. Build a customizable project cart with dynamic pricing calculations
3. Showcase visual content and present scope of work in real-time

### Core Concept

**For Salespeople**: A guided, tech-driven sales process that increases credibility, reduces prep time, and improves close rates through professional, interactive presentations.

**For Homeowners**: A modern, shopping-like experience with real visuals, transparent pricing, and clearly defined project details—making it easier to understand value and make confident decisions.

### Mission Statement

Revolutionize the in-home construction salesperson experience by replacing outdated, inconsistent sales methods with a standardized, intuitive, and visual sales process modeled after modern e-commerce checkout flows.

### Market Opportunity

- **Industry**: Home improvement sales, Southern California focus
- **Market Size**: $400B+ U.S. home improvement industry
- **Sales Cycle**: 2–4 month cycles, ~$50K average deal size
- **Digital Gap**: Majority of in-home sales still analog, leaving room for transformation

### The Problem

#### From the Homeowner's Perspective:

- Excessive verbal explanations, few visuals
- No clear breakdown of costs or value
- Discounts appear arbitrary
- Experience feels like "just another salesman"

#### From the Salesperson's Perspective:

- Product knowledge gaps
- Reliance on single-product pitches
- Lack of prepared, standardized presentations
- Lost opportunities due to inefficient training and tools

### The Solution – "Amazon Cart" Approach

#### Key Homeowner Benefits:

- Visual-first presentations (photos, diagrams, before/after views)
- Auto-calculated pricing (price conditioning)
- ROI and savings analysis
- Discounts tied to real-time programs
- Easy-to-understand scopes of work

#### Key Salesperson Benefits:

- Pre-packaged trade bundles for upselling
- All company resources one click away (photos, brochures, data)
- Smooth and consistent presentation flow
- Increased perceived credibility
- One-stop access to visuals, specs, pricing, and documents

### Core Value Proposition

> "Turn every in-home sales meeting into a memorable, interactive buying experience—boosting close rates, shortening sales cycles, and standardizing success across your sales team."

### Target Customers

- **Primary**: Home improvement companies with 10–100 employees and 5–25 sales reps
- **Secondary**: Individual salespeople in roofing, HVAC, windows, siding, solar, and related trades

### Key Differentiators

- **Industry-Specific**: Designed specifically for home improvement workflows
- **Interactive Configurations**: Visual, real-time customization of projects
- **Instant Pricing**: Live cost updates with labor, material, and discount logic
- **Professional Impact**: Elevates salesperson credibility in seconds
- **Data-Driven Insights**: ROI and comparison tools for price justification

### Platform Features

#### Phase 1 – Core Platform (MVP)

**Project Configuration Engine**

- Step-by-step wizard for property details & trades
- Visual material selection
- Scope definition tools
- Save/retrieve projects

**Dynamic Pricing Calculator**

- Real-time pricing updates
- Regional material cost database
- Labor cost engine (2.8x markup for pricing)
- Automated discount application

**Interactive Presentation Builder**

- Drag-and-drop slides
- Before/after photo tools
- ROI & value calculators
- Company-branded templates

**Customer Portal**

- Shareable project link
- Mobile-optimized
- Digital signatures
- Downloadable proposals

#### Phase 2 – Advanced Features

- CRM Integration (Salesforce, HubSpot, Pipedrive)
- Financing Options Integration
- Team Collaboration Tools

#### Phase 3 – Growth & AI

- AI-Powered Insights (objection prediction, win/loss analysis)
- Advanced Visualization (3D modeling, AR previews, energy calculators)

### Technical Architecture

- **Frontend**: Next.js 15 (React 19) with TypeScript
- **Backend**: Hono.js API framework
- **Database**: PostgreSQL with Drizzle ORM (hosted on Neon)
- **Authentication**: Better Auth with email verification
- **Security**: SOC 2 compliance, encryption in transit/at rest
- **Performance**: <3s page loads, 99.9% uptime, mobile responsive
- **Hosting**: Auto-scaling infrastructure

### Sales Workflow in the App

1. **Project Setup**: <5 min – Enter property & homeowner details
2. **Presentation Creation**: <10 min – Auto-generate & customize
3. **In-Person Meeting**: ~60 min – Present interactively
4. **Follow-up**: <2 min – Send proposal & track engagement

### Business Model

- **Starter Plan**: $49/user/month
- **Professional Plan**: $89/user/month
- **Enterprise Plan**: $149/user/month
- **Target Year 1**: 500 paying users → $450K ARR

### Expected Outcomes

- 25% increase in conversion rates
- 30% shorter sales cycles
- 75% reduction in prep time
- 90%+ user satisfaction rate

### Cost Calculation Engine

The application includes a sophisticated cost calculation system with:

- Domain-specific formulas (HVAC, roofing, solar, etc.)
- 2.8x markup for pricing calculations
- Dynamic project variables for customization
- Formula caching for performance optimization
- Regional pricing variations and material costs

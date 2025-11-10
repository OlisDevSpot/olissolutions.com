# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Global Commands (from root)
- `pnpm dev` - Start all applications in development mode with Turbopack
- `pnpm build` - Build all applications and packages
- `pnpm lint` - Run ESLint across all apps and packages (@antfu/eslint-config)
- `pnpm check-types` - Run TypeScript type checking across the entire monorepo
- `pnpm format` - Format all TypeScript, TSX, and Markdown files with Prettier

### Application-Specific Commands

From root directory, prefix with app name: `pnpm --filter [app-name] [command]`

**Marketplace App** (`apps/marketplace`):
- `pnpm --filter marketplace dev` - Development server (port from env $PORT)
- `pnpm --filter marketplace types:check` - TypeScript checking
- Uses **Clerk** authentication (legacy dashboard protection)

**Accounts App** (`apps/accounts`):
- `pnpm --filter accounts dev` - Development server with Turbopack (port from env $PORT)
- `pnpm --filter accounts check-types` - TypeScript checking
- Uses **Better Auth** (modern session-based auth)

**One-Stop-Sales App** (`apps/one-stop-sales`):
- `pnpm --filter one-stop-sales dev` - Development server with Turbopack (port from env $PORT)
- `pnpm --filter one-stop-sales dev:mobile` - Development with mobile network access (0.0.0.0 binding)
- `pnpm --filter one-stop-sales db:push` - Push database schema changes
- `pnpm --filter one-stop-sales db:studio` - Open Drizzle Studio
- `pnpm --filter one-stop-sales db:seed` - Seed database with initial data
- `pnpm --filter one-stop-sales db:reset` - Reset and re-seed database
- `pnpm --filter one-stop-sales open-api-docs` - Open Better Auth API documentation
- Uses **Better Auth** with email verification and cross-subdomain cookies

**Backend App** (`apps/backend`):
- `pnpm --filter backend dev` - Wrangler development server (Cloudflare Workers)
- `pnpm --filter backend deploy` - Deploy to Cloudflare Workers with minification
- `pnpm --filter backend cf-typegen` - Generate Cloudflare bindings TypeScript types

**Extension App** (`apps/extension`):
- `pnpm --filter wxt-react-starter dev` - WXT development server (port 3003)
- `pnpm --filter wxt-react-starter dev:firefox` - Firefox-specific development
- `pnpm --filter wxt-react-starter build` - Build Chrome extension
- `pnpm --filter wxt-react-starter build:firefox` - Build Firefox extension
- `pnpm --filter wxt-react-starter zip` - Package extension for Chrome Web Store
- `pnpm --filter wxt-react-starter zip:firefox` - Package extension for Firefox Add-ons

### Package Development Commands

**Database Package** (`packages/db`):
- `pnpm --filter @olis/db db:push:platform` - Push platform schema only
- `pnpm --filter @olis/db db:push:identity` - Push identity schema only
- `pnpm --filter @olis/db db:push:oss` - Push one-stop-sales schema only
- `pnpm --filter @olis/db db:seed:platform` - Seed platform data
- `pnpm --filter @olis/db db:seed:identity` - Seed identity data
- `pnpm --filter @olis/db db:seed:oss` - Seed one-stop-sales data
- `pnpm --filter @olis/db db:init-schemas` - Initialize all database schemas

## Architecture Overview

### Business Domain & Mission

**Olis Solutions** is a B2B2C home energy efficiency sales platform targeting Southern California homeowners with older homes (pre-1990). The platform supports sales representatives selling high-value home improvement services ($20K-100K+ deals) using sophisticated psychological sales techniques.

**Core Business Model**:
- **Target Market**: California homeowners with pre-1990 homes
- **Sales Method**: Door-to-door/appointment-based in-home sales
- **Product Mix**: Energy efficiency improvements (insulation, HVAC, solar, windows, roofing)
- **Psychology Framework**: Heavy emphasis on loss aversion, social proof, authority bias, urgency/FOMO, anchoring, and completeness bias

### Monorepo Architecture Philosophy

This monorepo uses **domain-driven separation** rather than technical separation, reflecting the complex business workflow:

```
Customer Journey: Marketing → Lead Capture → Sales Process → Account Management
App Mapping:     marketplace → accounts → one-stop-sales → accounts
```

**Domain Boundaries**:
1. **Marketing Domain** (`apps/marketplace`) - Lead generation and brand awareness
2. **Identity Domain** (`apps/accounts`) - User management, company profiles, licensing
3. **Sales Domain** (`apps/one-stop-sales`) - Core sales workflow and project management
4. **Infrastructure Domain** (`apps/backend`) - Shared API services and data processing
5. **Sales Tools Domain** (`apps/extension`) - Browser-based sales enhancement tools

### Technology Stack Decisions

**Cutting-Edge Technology Adoption**: The team prioritizes modern, type-safe tools:

- **React 19** (latest stable) with **Next.js 15** + Turbopack for optimal DX
- **TailwindCSS v4** (beta) for future-proof styling
- **Hono.js** over Express for modern web standards and edge compatibility
- **Better Auth** over NextAuth for modern authentication patterns
- **Drizzle ORM** over Prisma for type-safe database operations
- **TypeScript 5.9** with strict mode for compile-time safety

**Authentication Strategy - Dual Implementation**:
- **Legacy**: Clerk for existing dashboard features (`apps/marketplace`)
- **Modern**: Better Auth for new applications (`apps/accounts`, `apps/one-stop-sales`)
- **Migration Path**: Cross-subdomain cookie sharing for seamless UX
- **Future Direction**: Complete migration to Better Auth

## Database Architecture

### Multi-Schema PostgreSQL Design

The database uses three distinct PostgreSQL schemas reflecting business domains:

```sql
-- Domain separation in PostgreSQL
CREATE SCHEMA identity;      -- User/company management
CREATE SCHEMA platform;     -- Core business entities  
CREATE SCHEMA one_stop_sales; -- Sales workflow data
```

### Schema Design Philosophy

**Identity Schema** (`packages/db/src/schema/identity/`):
```typescript
// Better Auth integration
export const users = identitySchema.table('user', { ... })
export const sessions = identitySchema.table('session', { ... })
export const companies = identitySchema.table('companies', { ... })
export const licenses = identitySchema.table('licenses', { ... })
```
*Purpose*: User authentication, multi-tenant company structure, licensing compliance

**Platform Schema** (`packages/db/src/schema/platform/`):
```typescript
// Core business entities
export const trades = platformSchema.table('trades', { ... })      // HVAC, Solar, Windows
export const scopes = platformSchema.table('scopes', { ... })      // Specific work items
export const materials = platformSchema.table('materials', { ... }) // Products/components
export const benefits = platformSchema.table('benefits', { ... })   // Psychological selling points
```
*Purpose*: Master data for home improvement industry, reusable across all sales processes

**One-Stop-Sales Schema** (`packages/db/src/schema/one-stop-sales/`):
```typescript
// Sales workflow entities
export const projects = remodelXSchema.table('projects', { ... })
export const jobsiteProfiles = remodelXSchema.table('jobsite_profiles', { ... })
export const financialProfiles = remodelXSchema.table('financial_profiles', { ... })
export const pricing = remodelXSchema.table('pricing', { ... })
```
*Purpose*: Customer-specific project data, dynamic pricing calculations, sales workflow state

### Key Database Patterns

**1. Accessor Pattern**: SEO-friendly string identifiers
```typescript
export const trades = platformSchema.table('trades', {
  id: serial('id').primaryKey(),
  accessor: varchar('accessor', { length: 50 }).notNull().unique(), // "hvac", "solar"
  name: varchar('name', { length: 100 }).notNull(),
})
```

**2. Cross-Reference Tables**: Flexible many-to-many relationships
```typescript
// Junction tables use 'x-' prefix convention
export const xMaterialBenefits = platformSchema.table('x_material_benefits', {
  materialId: integer('material_id').references(() => materials.id),
  benefitId: integer('benefit_id').references(() => benefits.id),
})
```

**3. Psychological Benefits Mapping**: Sales psychology embedded in data model
```typescript
export const benefits = platformSchema.table('benefits', {
  psychologyConceptAccessor: varchar('psychology_concept_accessor'), // "social_proof", "urgency"
  category: varchar('category'), // "cost_savings", "comfort", "environmental"
  customerFacingText: text('customer_facing_text'), // What customers see
})
```

## API Architecture

### Hono.js Framework Implementation

The API layer uses **Hono.js** with TypeScript for edge-compatible, type-safe APIs:

**Single Route Handler Pattern**:
```typescript
// All apps use: src/app/api/[[...routes]]/route.ts
export const { GET, POST, PUT, DELETE, PATCH, OPTIONS } = handle(app)

// Delegates to Hono app with full middleware pipeline
const app = new Hono<AppBindings>()
  .basePath('/api')
  .use('*', cors({ origin: Array.from(origins), credentials: true }))
  .on(['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'], '/auth/*', 
      c => auth.handler(c.req.raw))
```

### API Middleware Architecture

**Authentication Middleware**:
```typescript
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) return c.json({ message: 'Unauthorized' }, 401)
  c.set('user', session.user)
  c.set('session', session.session)
  return next()
}
```

**Project Context Middleware**:
```typescript
export const projectMiddleware: MiddlewareHandler = async (c, next) => {
  const projectId = c.get('session')?.activeProjectId
  if (!projectId) return c.json({ message: 'No active project' }, 400)
  c.set('activeProjectId', projectId)
  return next()
}
```

### Repository Pattern Implementation

**Clean Architecture**: Business logic separated from data access
```typescript
// packages/server/src/routers/platform/trades/repository.ts
export class TradesRepository {
  constructor(private db: Database) {}

  async findWithScopes(tradeAccessor: string) {
    return this.db
      .select()
      .from(trades)
      .where(eq(trades.accessor, tradeAccessor))
      .leftJoin(xTradeScopes, eq(trades.id, xTradeScopes.tradeId))
      .leftJoin(scopes, eq(xTradeScopes.scopeId, scopes.id))
  }
}
```

## Component Library Architecture

### Design System Organization

**Hierarchical Component Structure**:
```
packages/ui/src/components/
├── [primitives]/           # shadcn/ui base components (button, card, form)
├── global/                 # Business-specific reusable components
│   ├── forms/             # Authentication forms (sign-in, sign-up, customer)
│   ├── navigation/        # App navigation (topbar, sidebar, breadcrumbs)
│   └── providers/         # Context providers (theme, query-client)
├── inputs/                # Specialized inputs (address-input)
└── marketplace/               # Marketing-specific components (footer, hero)
```

### Component Development Patterns

**1. Compound Component Pattern**:
```typescript
// Card composition
<Card>
  <CardHeader>
    <CardTitle>Project Summary</CardTitle>
  </CardHeader>
  <CardContent>
    <ProjectDetails />
  </CardContent>
</Card>
```

**2. Polymorphic Component Pattern**:
```typescript
interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}
```

**3. Business Logic Components**:
```typescript
// Domain-specific components with embedded business logic
export function PricingCalculator({ projectId }: { projectId: string }) {
  const { data: project } = useProject(projectId)
  const { data: pricing } = usePricingVariables(project?.scopeIds)
  
  // Complex business logic for cost calculations
  const totalCost = useMemo(() => 
    calculateProjectCost(project, pricing), [project, pricing])
}
```

### Styling Architecture

**TailwindCSS v4 + CSS Variables**:
```css
/* packages/ui/src/styles/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}
```

**Class Variance Authority**: Type-safe component variants
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
  }
)
```

## Package Dependencies & Import Patterns

### Workspace Package Architecture

**Core Dependency Graph**:
```
apps/one-stop-sales
├── @olis/ui (components)
├── @olis/db (database)
├── @olis/auth (authentication)
├── @olis/server (API routers)
├── @olis/data-client (React Query)
├── @olis/core (constants/utils)
└── @olis/types (TypeScript types)
```

**Standard Import Patterns**:
```typescript
// UI Components
import { Button } from "@olis/ui/components/button"
import { CustomerForm } from "@olis/ui/components/global/forms/customer-form"

// Database
import { projects, scopes } from "@olis/db/schema/one-stop-sales"
import { trades, materials } from "@olis/db/schema/platform"

// Authentication
import { auth } from "@olis/auth/server"
import { useSession } from "@olis/auth/client"

// Data Fetching
import { useProjects } from "@olis/data-client/fetchers/one-stop-sales/projects"
import { queryKeys } from "@olis/data-client/fetchers/platform/trades/query-keys"

// Business Logic
import { TradeTypes, MaterialTypes } from "@olis/core/constants/enums"
import { formatCurrency } from "@olis/core/lib/formatters"
```

## Sales Psychology Framework Integration

### Psychological Sales Techniques in Code

**1. Loss Aversion Implementation**:
```typescript
// Educational content emphasizing loss
export const californiaRateIncrease = {
  title: "California Energy Rates Rising 14.2% Annually",
  lossFraming: "You're losing money every day you wait",
  urgencyIndicator: "costIncrease",
}
```

**2. Social Proof System**:
```typescript
// Benefits linked to psychological concepts
export const benefits = [
  {
    text: "Join 10,000+ satisfied customers",
    psychologyConceptAccessor: "social_proof",
    displayContext: "during_presentation"
  }
]
```

**3. Authority Bias**:
```typescript
// Government mandate references
export const authorityFraming = {
  source: "California Building Code",
  mandateText: "New requirements effective 2025",
  credibilityMarkers: ["government", "official", "mandate"]
}
```

**4. Price Anchoring**:
```typescript
// Cost calculation with anchoring
export const pricingStrategy = {
  highAnchor: calculatedCost * 1.5,  // Show higher price first
  discountFraming: "Limited time savings",
  valueComparison: "vs. rising utility costs"
}
```

### Sales Workflow Implementation

**Project Creation Flow**:
```typescript
// Amazon-cart style workflow
const salesWorkflow = [
  "Init Project",           // Customer info + property details
  "Select Trades",          // HVAC, Solar, Windows, etc.
  "Configure Scopes",       // Specific work items
  "Add Materials",          // Product selection
  "Calculate Pricing",      // Dynamic cost calculation
  "Present Benefits",       // Psychology-driven presentation
  "Generate Proposal"       // Final pricing with psychology
]
```

## Development Patterns & Conventions

### TypeScript Configuration

**Strict Type Safety Across Monorepo**:
```json
// packages/typescript-config/base.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Error Handling Patterns

**API Error Handling**:
```typescript
// Stoker middleware for consistent API responses
import { stokerMiddleware } from 'stoker/middlewares'

app.use('*', stokerMiddleware({
  defaultError: { message: 'Internal Server Error', code: 500 }
}))
```

**Frontend Error Boundaries**:
```typescript
// React Error Boundary implementation
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return <ErrorState onRetry={resetErrorBoundary} />
}
```

### Form Handling Patterns

**React Hook Form + Zod Integration**:
```typescript
// Consistent form pattern across apps
const form = useForm<CustomerFormData>({
  resolver: zodResolver(customerFormSchema),
  defaultValues: { name: '', email: '', phone: '' }
})

const onSubmit = async (data: CustomerFormData) => {
  const result = await updateCustomer.mutateAsync(data)
  if (result.success) {
    toast.success('Customer updated successfully')
  }
}
```

## Environment & Deployment

### Environment Configuration Strategy

**Multi-Environment Setup**:
```typescript
// src/env/index.ts - Zod validation for environment variables
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    RESEND_API_KEY: z.string().startsWith('re_'),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
})
```

### Cross-Subdomain Architecture

**Multi-Subdomain Strategy**:
```typescript
// Better Auth cross-subdomain configuration
trustedOrigins: [
  'https://marketplace.olissolutions.com',
  'https://accounts.olissolutions.com', 
  'https://sales.olissolutions.com',
  'https://*.olissolutions.com'
],
advanced: {
  crossSubDomainCookies: {
    enabled: true,
    domain: '.olissolutions.com'
  }
}
```

### Build & Deployment Configuration

**Turborepo Task Pipeline**:
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"],
      "env": ["MODE", "RESEND_API_KEY"]
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "inputs": ["$TURBO_DEFAULT$", ".env*"]
    }
  },
  "concurrency": "12"
}
```

## Critical Business Context for Development

### Target Customer Profile
- **Demographics**: California homeowners, pre-1990 homes, middle to upper-middle class
- **Pain Points**: Rising energy costs, aging home systems, complex rebate programs
- **Decision Factors**: Cost savings, comfort, environmental impact, social proof

### Sales Representative Workflow
- **Appointment-Based**: 2-4 hour in-home presentations
- **High-Stakes**: $20K-100K deals with psychological pressure
- **Mobile-First**: Tablet/laptop usage during presentations
- **Psychology-Driven**: Heavy emphasis on loss aversion and urgency

### Regulatory Environment
- **California Building Codes**: Evolving energy efficiency requirements
- **Utility Rebates**: Time-sensitive programs with qualification criteria
- **Consumer Protection**: Legal compliance for home improvement sales

This architecture reflects a sophisticated understanding of both modern web development practices and high-value sales psychology, creating a platform optimized for converting leads into customers through technical excellence and psychological effectiveness.
# Aivora AI Automation Agency

## Overview

Aivora is an AI-powered automation platform designed for the hospitality industry (restaurants, cafés, and hotels). The application provides a marketing landing page showcasing AI automation services including voice agents, chatbots, reputation management, CRM, and website design. The primary goal is to capture leads through a contact form and connect potential clients with an AI demo via voice interaction.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component System**
- shadcn/ui (New York style) as the design system foundation
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for smooth animations and transitions
- Custom design system inspired by Linear, Vercel, Stripe, and Framer

**Visual Design Philosophy**
- Dark mode primary theme with futuristic AI aesthetic
- 3D background rendering using Three.js for depth and visual interest
- Color palette: Deep charcoal backgrounds with vibrant purple/cyan accents
- Typography: Inter for UI/body text, Poppins for headlines
- Responsive layout with mobile-first approach

**Key Features**
- Single-page application with smooth scroll navigation
- Animated hero section with gradient overlays
- Service cards showcasing AI automation offerings
- Pricing tiers (Growth & Premium plans)
- Testimonials carousel with auto-rotation
- Contact form with real-time validation using react-hook-form and zod
- WebGL fallback handling for devices without 3D support

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the backend
- Custom middleware for request logging and error handling

**Data Flow**
- RESTful API endpoint (`/api/submit`) for lead capture
- Dual database strategy: primary Neon PostgreSQL + optional Supabase sync
- Form validation at both client and server levels

**Development Environment**
- Hot module replacement in development via Vite middleware
- Separate production build process with esbuild for server bundling
- Environment-specific configuration for Replit deployment

### Data Storage Architecture

**Primary Database**
- Neon PostgreSQL (serverless) as the main data store
- Drizzle ORM for type-safe database operations and schema management
- Schema-driven approach with `shared/schema.ts` as single source of truth

**Database Schema**
- `users` table: Basic user authentication structure (currently unused)
- `leads` table: Contact form submissions with name, email, business_name, contact_number, and timestamp

**Optional Integration**
- Supabase as a secondary/backup data store
- Conditional initialization based on environment variables
- Graceful degradation if Supabase credentials are unavailable

**Migration Strategy**
- Drizzle Kit for schema migrations
- Push-based deployment with `npm run db:push`

### External Dependencies

**Third-Party Services**
- **Neon Database**: Serverless PostgreSQL hosting (required)
- **Supabase**: Secondary database option for lead storage (optional)
- **Vapi**: AI voice agent integration for post-form demo calls (referenced in public/script.js but not yet integrated in React app)

**UI Libraries**
- **Radix UI**: Complete suite of accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-styled components built on Radix
- **Three.js**: WebGL 3D rendering for animated backgrounds
- **Framer Motion**: Declarative animations

**Form Management**
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Integration with Zod validation schemas
- **Zod**: Runtime type validation

**Development Tools**
- **Replit plugins**: Runtime error modal, cartographer, dev banner
- **TanStack Query**: Server state management (installed but minimal usage)
- **TypeScript**: Type checking across frontend and backend

**Font Loading**
- Google Fonts CDN for Inter and Poppins font families

**Build Dependencies**
- **esbuild**: Fast bundling for production server code
- **tsx**: TypeScript execution for development server
- **PostCSS & Autoprefixer**: CSS processing pipeline

**Design System Token Management**
- CSS custom properties for theming
- Tailwind configuration extends base theme with HSL color system
- Border radius, spacing, and elevation utilities
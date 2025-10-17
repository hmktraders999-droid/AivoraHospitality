# Aivora AI Automation Agency - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from cutting-edge tech companies (Linear, Vercel, Stripe, Framer) while maintaining a futuristic, AI-focused aesthetic. The design emphasizes depth through 3D elements, sophisticated gradients, and smooth animations to convey innovation and technical expertise.

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (Main theme):
- Background Base: `222 25% 8%` (deep charcoal)
- Background Elevated: `222 20% 12%` (card surfaces)
- Primary Brand: `260 100% 65%` (vibrant purple - AI/tech association)
- Secondary Brand: `195 100% 55%` (cyan - complements purple)
- Accent: `280 90% 60%` (magenta - use sparingly for CTAs)

**Gradients**:
- Hero gradient overlay: Purple 260 to Cyan 195 (diagonal, 45deg)
- Card hover states: Subtle radial gradient from primary to transparent
- 3D background: Multi-layer gradients (purple/cyan/deep blue)

**Text Colors**:
- Primary text: `0 0% 98%` (near white)
- Secondary text: `0 0% 70%` (muted)
- Muted text: `0 0% 50%` (labels, captions)

### B. Typography

**Font Families**:
- Primary: 'Inter' (body text, UI elements)
- Display: 'Poppins' (headlines, hero text)

**Hierarchy**:
- Hero Headline: Poppins, 3.5rem/4rem (mobile: 2.25rem), font-weight 700, tracking tight
- Section Headers: Poppins, 2.5rem/3rem (mobile: 1.875rem), font-weight 600
- Subheadlines: Inter, 1.25rem/1.75rem, font-weight 400, opacity 80%
- Body Text: Inter, 1rem/1.5rem, font-weight 400
- Button Text: Inter, 1rem, font-weight 600, uppercase tracking-wide
- Card Titles: Poppins, 1.5rem, font-weight 600

### C. Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 20, 24** (e.g., p-8, gap-6, mt-16)

**Container Strategy**:
- Max-width: `max-w-7xl` for main content sections
- Hero section: Full-width with inner `max-w-6xl`
- Padding: `px-6` mobile, `px-8` desktop
- Section vertical spacing: `py-20` desktop, `py-12` mobile

**Grid Systems**:
- Services: 3-column grid on desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Pricing: 2-column side-by-side (`grid-cols-1 lg:grid-cols-2`)
- Testimonials: Single-column carousel with nav controls

### D. Component Library

**Navigation**:
- Sticky header with backdrop blur (`backdrop-blur-md`)
- Background: Semi-transparent dark (`bg-[#0A0A0A]/80`)
- Height: `h-20`
- Logo: Poppins, gradient text effect (purple to cyan)
- Nav links: Inter, hover state with underline animation

**Hero Section** (80vh minimum):
- Full-width 3D Three.js background layer
- Dark gradient overlay (opacity 40%)
- Centered content with z-index layering
- CTA button: Large (`px-8 py-4`), primary gradient background, rounded-lg, hover lift effect
- Include hero image: Abstract AI/tech visualization or hospitality scene with futuristic overlay

**Service Cards**:
- Glass morphism effect: `backdrop-blur-lg` with border gradient
- Background: `bg-white/5` with `border border-white/10`
- Padding: `p-8`
- Icon container: Gradient background circle, 64px
- Hover: Lift effect (`translate-y-[-4px]`), glow border animation
- Content: Icon, title (Poppins), description (Inter, muted)

**Pricing Cards**:
- Similar glass morphism to service cards
- Premium tier: Enhanced border gradient (purple/cyan)
- Feature list: Checkmark icons with Inter text
- Price: Large Poppins numbers with gradient effect
- CTA button: Full-width, matches tier color intensity

**Contact Form**:
- Dark input fields: `bg-white/5`, `border-white/10`
- Focus state: Cyan border glow
- Labels: Inter, small caps, muted
- Submit button: Gradient background, full-width on mobile

**Footer**:
- Dark background: `bg-[#0A0A0A]`
- Two-column layout: Brand/social left, links right
- Social icons: Hover glow effect (cyan)
- Copyright: Center-aligned, muted text

### E. 3D & Animation Strategy

**Three.js Background**:
- Floating geometric shapes (low-poly spheres, cubes, torus)
- Particle system with subtle movement
- Gradient lighting: Purple and cyan point lights
- Slow rotation and drift animations (2-4 second cycles)
- Performance: Limit to 30-50 particles, optimize for mobile

**Micro-Interactions**:
- Button hovers: Slight scale (1.05), shadow expansion
- Card hovers: Lift + border glow + subtle rotate (1-2deg)
- Smooth scroll: Easing function for section navigation
- Form inputs: Border color transition on focus
- **Minimize distracting animations** - keep subtle and purposeful

**Page Transitions**:
- Fade-in on scroll for sections (Intersection Observer)
- Stagger animations for service cards (50ms delay each)
- Testimonial carousel: Smooth slide transition (300ms)

## Images

**Hero Image**: Large background image showing futuristic hospitality tech visualization OR modern restaurant/hotel with AI overlay effects. Position behind 3D canvas with dark gradient overlay. Use high-contrast image that works with purple/cyan color scheme.

**Service Cards**: Icon-based graphics (no photos needed - use gradient icons)

**Testimonials**: Optional placeholder avatars (circular, 48px, with gradient borders)

## Key Principles

1. **Depth through layering**: 3D background → gradient overlays → glass morphism cards → content
2. **Purposeful color**: Use vibrant purple/cyan strategically - primarily for CTAs, accents, and gradients
3. **Performance-conscious**: Optimize Three.js for mobile, use transform animations over layout shifts
4. **Conversion-focused**: Clear visual hierarchy guiding to CTA buttons
5. **Professional polish**: Consistent spacing, refined typography, smooth transitions throughout
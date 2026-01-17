# Syntra UI Redesign Plan

> **Status: IMPLEMENTED** - This redesign was fully implemented in January 2026.

## Overview

This document outlines a comprehensive visual redesign of Syntra, transforming it from its current minimal black-and-white aesthetic into a vibrant, warm, and modern interface featuring **white and orange tones**, **glassmorphism effects**, and **smooth, rounded shapes**.

The redesign maintains all existing functionality while dramatically improving visual appeal and user experience.

### Implementation Summary

The following was implemented:

- **Phase 1**: Design system foundation in `globals.css` (colors, gradients, shadows, glass utilities)
- **Phase 2**: Core component redesign (Button, Card, Input, Select, RadioGroup, Badge, Skeleton)
- **Phase 3**: Layout components (Header, Footer) with glassmorphism
- **Phase 4**: All pages updated (Landing, Dashboard, Generate, Deck view)
- **Phase 5-6**: Animations, transitions, and dark mode support

---

## Design Philosophy

### Core Principles

1. **Warmth & Energy** - Orange conveys enthusiasm, creativity, and approachability - perfect for a learning platform
2. **Softness** - Rounded corners and smooth gradients create a friendly, non-intimidating feel
3. **Depth & Dimension** - Glassmorphism adds visual interest and modern sophistication
4. **Clarity** - Despite visual richness, maintain excellent readability and usability

### Mood Board Keywords

- Warm sunrise
- Frosted glass
- Soft clouds
- Glowing embers
- Smooth pebbles
- Morning light

---

## Color Palette

### Primary Colors

| Name              | Hex       | OKLCH                 | Usage                                 |
| ----------------- | --------- | --------------------- | ------------------------------------- |
| **Syntra Orange** | `#FF6B35` | `oklch(0.70 0.20 35)` | Primary actions, CTAs, brand identity |
| **Warm Orange**   | `#FF8C42` | `oklch(0.75 0.18 45)` | Hover states, secondary accents       |
| **Light Peach**   | `#FFB366` | `oklch(0.82 0.14 55)` | Highlights, soft accents              |
| **Soft Coral**    | `#FF9E80` | `oklch(0.80 0.12 40)` | Gentle backgrounds, cards             |

### Background Colors

| Name                  | Hex       | OKLCH                 | Usage                        |
| --------------------- | --------- | --------------------- | ---------------------------- |
| **Pure White**        | `#FFFFFF` | `oklch(1 0 0)`        | Main background              |
| **Warm White**        | `#FFFAF5` | `oklch(0.99 0.01 70)` | Page backgrounds with warmth |
| **Cream**             | `#FFF5EB` | `oklch(0.97 0.02 70)` | Card backgrounds, sections   |
| **Light Orange Tint** | `#FFF0E6` | `oklch(0.96 0.03 60)` | Highlighted sections         |

### Neutral Colors

| Name            | Hex       | OKLCH             | Usage                    |
| --------------- | --------- | ----------------- | ------------------------ |
| **Charcoal**    | `#2D2D2D` | `oklch(0.25 0 0)` | Primary text             |
| **Dark Gray**   | `#4A4A4A` | `oklch(0.38 0 0)` | Secondary text           |
| **Medium Gray** | `#7A7A7A` | `oklch(0.55 0 0)` | Muted text, placeholders |
| **Light Gray**  | `#E5E5E5` | `oklch(0.91 0 0)` | Borders, dividers        |
| **Soft Gray**   | `#F5F5F5` | `oklch(0.96 0 0)` | Subtle backgrounds       |

### Accent Colors

| Name              | Hex       | OKLCH                  | Usage                       |
| ----------------- | --------- | ---------------------- | --------------------------- |
| **Success Green** | `#4CAF50` | `oklch(0.65 0.15 145)` | Success states, completed   |
| **Warning Amber** | `#FFB300` | `oklch(0.80 0.17 85)`  | Warnings, caution           |
| **Error Red**     | `#EF5350` | `oklch(0.62 0.20 25)`  | Errors, destructive actions |
| **Info Blue**     | `#42A5F5` | `oklch(0.68 0.14 250)` | Information, tips           |

### Gradient Definitions

```css
/* Primary Gradient - Hero sections, buttons */
--gradient-primary: linear-gradient(
  135deg,
  #ff6b35 0%,
  #ff8c42 50%,
  #ffb366 100%
);

/* Warm Gradient - Backgrounds, large sections */
--gradient-warm: linear-gradient(180deg, #fffaf5 0%, #fff5eb 50%, #fff0e6 100%);

/* Sunrise Gradient - Special highlights */
--gradient-sunrise: linear-gradient(
  135deg,
  #ff9e80 0%,
  #ffb366 50%,
  #ffd699 100%
);

/* Glass Gradient - Glassmorphism overlays */
--gradient-glass: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.9) 0%,
  rgba(255, 255, 255, 0.7) 100%
);

/* Soft Glow - Behind cards, elements */
--gradient-glow: radial-gradient(
  circle at center,
  rgba(255, 107, 53, 0.15) 0%,
  transparent 70%
);
```

---

## Glassmorphism Effects

### Core Glass Styles

```css
/* Primary Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 8px 32px rgba(255, 107, 53, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Frosted Glass - Lighter effect */
.glass-frosted {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* Heavy Glass - More prominent */
.glass-heavy {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 12px 48px rgba(255, 107, 53, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.06);
}

/* Orange Tinted Glass - Accent areas */
.glass-orange {
  background: rgba(255, 240, 230, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 107, 53, 0.2);
}

/* Navigation Glass - Header/Footer */
.glass-nav {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 107, 53, 0.1);
}
```

### Glass Usage Guidelines

| Component      | Glass Type      | Notes                            |
| -------------- | --------------- | -------------------------------- |
| Header         | `glass-nav`     | Sticky with blur on scroll       |
| Main Cards     | `glass-card`    | Forms, deck cards, content cards |
| Flashcards     | `glass-heavy`   | More prominent for focus         |
| Modals         | `glass-heavy`   | With darker backdrop             |
| Tooltips       | `glass-frosted` | Light and subtle                 |
| Feature badges | `glass-orange`  | Warm accent areas                |
| Footer         | `glass-frosted` | Subtle separation                |

---

## Border Radius System

Moving from the current `0.625rem` base to a more rounded, softer system:

```css
/* New Border Radius Scale */
--radius-sm: 8px; /* Small elements: badges, tags */
--radius-md: 12px; /* Medium elements: inputs, buttons */
--radius-lg: 16px; /* Large elements: cards */
--radius-xl: 24px; /* Extra large: modals, featured cards */
--radius-2xl: 32px; /* Hero sections, main containers */
--radius-full: 9999px; /* Pills, circular elements */
```

### Radius Application

| Element       | Radius          | Current | New    |
| ------------- | --------------- | ------- | ------ |
| Buttons       | `--radius-md`   | 10px    | 12px   |
| Inputs        | `--radius-md`   | 10px    | 12px   |
| Cards         | `--radius-lg`   | 10px    | 16px   |
| Flashcards    | `--radius-xl`   | 10px    | 24px   |
| Badges/Pills  | `--radius-full` | 10px    | 9999px |
| Modals        | `--radius-xl`   | 10px    | 24px   |
| Avatar        | `--radius-full` | 100%    | 100%   |
| Page sections | `--radius-2xl`  | 0       | 32px   |

---

## Typography Enhancements

### Font Weights

Keep Geist font family but utilize more weight variation:

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Heading Styles

```css
/* Hero Heading */
.heading-hero {
  font-size: 3.5rem; /* 56px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Page Heading */
.heading-page {
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--charcoal);
}

/* Section Heading */
.heading-section {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  line-height: 1.3;
  color: var(--charcoal);
}

/* Card Title */
.heading-card {
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  line-height: 1.4;
  color: var(--charcoal);
}
```

---

## Shadow System

Replacing minimal shadows with warmer, more dimensional shadows:

```css
/* Shadow Scale */
--shadow-sm: 0 1px 2px rgba(255, 107, 53, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06);

--shadow-md: 0 4px 6px rgba(255, 107, 53, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);

--shadow-lg:
  0 10px 25px rgba(255, 107, 53, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);

--shadow-xl:
  0 20px 40px rgba(255, 107, 53, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06);

--shadow-glow:
  0 0 30px rgba(255, 107, 53, 0.2), 0 0 60px rgba(255, 107, 53, 0.1);

--shadow-button: 0 4px 14px rgba(255, 107, 53, 0.25);

--shadow-button-hover: 0 6px 20px rgba(255, 107, 53, 0.35);

/* Inset shadow for depth */
--shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.06);
```

---

## Component Redesign Specifications

### 1. Button Styles

```css
/* Primary Button */
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  box-shadow: var(--shadow-button);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-button-hover);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background: rgba(255, 107, 53, 0.1);
  color: var(--syntra-orange);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 107, 53, 0.2);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(255, 107, 53, 0.15);
  border-color: rgba(255, 107, 53, 0.3);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--dark-gray);
  font-weight: 500;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: rgba(255, 107, 53, 0.08);
  color: var(--syntra-orange);
}
```

### 2. Card Styles

```css
/* Standard Card */
.card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: var(--shadow-md);
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* Deck Card - Dashboard */
.deck-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 107, 53, 0.1);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all 0.3s ease;
}

.deck-card:hover {
  border-color: rgba(255, 107, 53, 0.3);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* Deck Card Accent Bar */
.deck-card::before {
  content: "";
  display: block;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

/* Flashcard */
.flashcard {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: var(--shadow-xl);
  min-height: 320px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.flashcard:hover {
  box-shadow: var(--shadow-glow);
}

/* Flashcard Flip State */
.flashcard.flipped {
  background: linear-gradient(
    135deg,
    rgba(255, 240, 230, 0.9) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
}
```

### 3. Input Styles

```css
/* Text Input */
.input {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 15px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-inset);
}

.input:focus {
  outline: none;
  border-color: var(--syntra-orange);
  box-shadow:
    var(--shadow-inset),
    0 0 0 3px rgba(255, 107, 53, 0.15);
}

.input::placeholder {
  color: var(--medium-gray);
}

/* Select */
.select-trigger {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  transition: all 0.2s ease;
}

.select-trigger:focus {
  border-color: var(--syntra-orange);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
}

.select-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 107, 53, 0.1);
  box-shadow: var(--shadow-lg);
}

.select-item:hover {
  background: rgba(255, 107, 53, 0.08);
}

.select-item[data-selected] {
  background: rgba(255, 107, 53, 0.12);
  color: var(--syntra-orange);
}
```

### 4. Header/Navigation

```css
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 107, 53, 0.08);
  padding: 16px 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link {
  color: var(--dark-gray);
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--syntra-orange);
  background: rgba(255, 107, 53, 0.08);
}

.nav-link.active {
  color: var(--syntra-orange);
  background: rgba(255, 107, 53, 0.12);
}
```

### 5. Badges & Pills

```css
/* Deck Type Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-primary {
  background: rgba(255, 107, 53, 0.12);
  color: var(--syntra-orange);
}

.badge-words {
  background: rgba(66, 165, 245, 0.12);
  color: #42a5f5;
}

.badge-phrases {
  background: rgba(76, 175, 80, 0.12);
  color: #4caf50;
}

.badge-fragments {
  background: rgba(255, 107, 53, 0.12);
  color: var(--syntra-orange);
}

/* Recommended Badge */
.badge-recommended {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}
```

### 6. Progress Indicators

```css
/* Progress Bar */
.progress-bar {
  height: 8px;
  background: rgba(255, 107, 53, 0.12);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  transition: width 0.4s ease;
}

/* Loading Spinner */
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 107, 53, 0.2);
  border-top-color: var(--syntra-orange);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Skeleton Loading */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 107, 53, 0.06) 0%,
    rgba(255, 107, 53, 0.12) 50%,
    rgba(255, 107, 53, 0.06) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

---

## Page-by-Page Redesign

### Landing Page (`/`)

**Background:**

- Warm gradient background: `linear-gradient(180deg, #FFFAF5 0%, #FFF5EB 100%)`
- Subtle decorative elements: soft orange gradient orbs behind content

**Hero Section:**

- Large gradient text headline with Syntra Orange
- Subtitle in charcoal with medium weight
- Two CTA buttons: Primary gradient "Get Started" + Secondary "Learn More"
- Decorative floating elements: soft rounded shapes in light orange tints

**Features Grid:**

- Three glass cards with icons
- Icons in orange circles with soft glow
- Cards have hover lift effect
- Subtle orange accent bar at top of each card

**CTA Section:**

- Full-width orange gradient background (curved edges)
- White text, white outlined button
- Glassmorphism overlay effect

### Dashboard (`/dashboard`)

**Layout:**

- Warm white background (`#FFFAF5`)
- Glass header area for page title and actions

**Deck Grid:**

- Glass cards with orange accent bar at top
- Hover: lift + increased shadow + orange border glow
- Each card shows:
  - Deck name (semibold, charcoal)
  - Language pair (medium, dark gray)
  - Deck type badge (colored pill)
  - Card count + date (small, medium gray)
- Empty state: Large illustration, warm messaging, prominent CTA

**Create New Deck Button:**

- Floating action button (FAB) in bottom-right on mobile
- Inline gradient button on desktop
- Soft glow shadow

### Generate Page (`/generate`)

**Form Layout:**

- Centered, max-width container
- Stacked glass cards for each section
- Warm background with subtle gradient

**Language Selection Card:**

- Two select dropdowns side-by-side
- Arrow icon between them in orange
- Glass card styling

**Deck Type Selection:**

- Radio card layout (not just radio buttons)
- Each option is a clickable glass card
- Selected state: orange border, orange tinted background
- Recommended badge on Sentence Fragments option

**Advanced Settings:**

- Collapsible glass section
- Orange chevron indicator
- Smooth expand/collapse animation

**Generate Button:**

- Full-width gradient button
- Loading state: spinner + "Generating your flashcards..." text
- Disabled state: reduced opacity, no hover effects

### Deck View (`/deck/[deckId]`)

**Header:**

- Back button with icon
- Deck name (large, editable)
- Metadata pills (language, type, count)
- Delete button (ghost, turns red on hover)

**Flashcard Viewer:**

- Large central glass card (heavy glass effect)
- Orange glow shadow on hover
- Click to flip animation (3D transform)
- Front: Clean, large text centered
- Back: Translation + explanation + example in styled sections

**Navigation:**

- Previous/Next buttons with icons
- Progress bar (orange gradient fill)
- Card counter: "Card 5 of 25"
- Keyboard hints (subtle)

**Card Grid Below:**

- Smaller glass cards for all cards
- Active card highlighted with orange border
- Click to jump to specific card

---

## Animation Specifications

### Transitions

```css
/* Standard transition */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
--transition-smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Specific animations */
--transition-hover: transform 200ms ease, box-shadow 200ms ease;
--transition-color: color 150ms ease, background-color 150ms ease;
--transition-expand: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Effects

1. **Cards**: `translateY(-4px)` + increased shadow
2. **Buttons**: `translateY(-2px)` + glow shadow
3. **Links**: Color change to orange
4. **Icons**: Scale to `1.1` + color change

### Page Transitions

- Fade in: `opacity 0 -> 1` over 200ms
- Slide up: `translateY(20px) -> 0` over 300ms
- Stagger children: 50ms delay between items

### Flashcard Flip

```css
.flashcard {
  perspective: 1000px;
}

.flashcard-inner {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  backface-visibility: hidden;
}

.flashcard-back {
  transform: rotateY(180deg);
}
```

---

## Responsive Design Notes

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Mobile Considerations

1. **Buttons**: Full-width on mobile, increase touch targets to 48px min
2. **Cards**: Stack vertically, reduce padding
3. **Navigation**: Hamburger menu with slide-out drawer (glass effect)
4. **Flashcards**: Full-width with swipe gestures
5. **Forms**: Single column, larger inputs
6. **FAB**: Floating action button for "Create Deck" on mobile

### Touch Interactions

- Swipe left/right on flashcards for navigation
- Pull to refresh on dashboard
- Long press on deck card for quick actions

---

## Dark Mode Considerations

While the primary design is light mode, dark mode should maintain warmth:

```css
/* Dark Mode Colors */
--dark-background: #1a1a1a;
--dark-surface: #2d2d2d;
--dark-surface-glass: rgba(45, 45, 45, 0.8);

/* Orange stays similar but slightly muted */
--dark-primary: #ff7a45;
--dark-primary-light: rgba(255, 122, 69, 0.15);

/* Glass effects in dark mode */
.dark .glass-card {
  background: rgba(45, 45, 45, 0.7);
  border: 1px solid rgba(255, 122, 69, 0.15);
}
```

---

## Implementation Checklist

### Phase 1: Foundation

- [ ] Update `globals.css` with new color variables
- [ ] Update border radius scale
- [ ] Add glass utility classes
- [ ] Add shadow variables
- [ ] Add gradient definitions

### Phase 2: Core Components

- [ ] Redesign Button component variants
- [ ] Redesign Card component with glass effects
- [ ] Redesign Input component
- [ ] Redesign Select component
- [ ] Redesign RadioGroup as card selection
- [ ] Update Label styles
- [ ] Add Badge component variants

### Phase 3: Layout Components

- [ ] Redesign Header with glass nav
- [ ] Redesign Footer
- [ ] Add decorative background elements

### Phase 4: Page Updates

- [ ] Landing page full redesign
- [ ] Dashboard page update
- [ ] Generate page update
- [ ] Deck view page update

### Phase 5: Animations & Polish

- [ ] Add hover animations
- [ ] Add page transitions
- [ ] Add flashcard flip animation
- [ ] Add loading skeletons
- [ ] Add micro-interactions

### Phase 6: Responsive & Dark Mode

- [ ] Mobile navigation
- [ ] Responsive card layouts
- [ ] Touch interactions
- [ ] Dark mode color scheme

---

## Asset Requirements

### Icons

- Continue using Lucide React (already in project)
- Consider adding custom orange-tinted icon variants

### Illustrations (Optional Enhancement)

- Empty state illustration (person with flashcards)
- Success state illustration (celebration)
- Error state illustration (friendly error)

### Decorative Elements

- Soft gradient orbs (CSS or SVG)
- Curved section dividers
- Floating card previews on landing page

---

## Performance Considerations

1. **Backdrop Filter**: Use sparingly, can impact performance on older devices
2. **Shadows**: Use CSS variables for consistency and easy theme changes
3. **Gradients**: Prefer CSS gradients over images
4. **Animations**: Use `transform` and `opacity` for GPU acceleration
5. **Font Loading**: Continue using Next.js font optimization

---

## Success Metrics

After implementation, the redesign should achieve:

1. **Visual Appeal**: Modern, warm, inviting appearance
2. **Brand Recognition**: Orange becomes signature Syntra color
3. **Usability**: Maintained or improved interaction clarity
4. **Performance**: No perceptible performance degradation
5. **Accessibility**: Maintain WCAG AA contrast ratios
6. **Consistency**: Unified design language across all pages

---

## Notes

- All glass effects should have fallbacks for browsers that don't support `backdrop-filter`
- Orange hues should maintain sufficient contrast with white text (AA standard)
- Consider reducing glass blur intensity on mobile for performance
- Test all hover states with touch devices (no hover state on touch)

---

_This plan transforms Syntra from a minimal black-and-white interface into a vibrant, warm, and modern application while maintaining its clean usability and excellent user experience._

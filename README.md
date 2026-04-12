# tasteink Brand System

> Premium identity with punk rock roots. Built for those who give zero fucks.

**Version:** 1.0  
**Last Updated:** 2026

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Voice & Tone](#voice--tone)
5. [Components](#components)
6. [Icons & Assets](#icons--assets)
7. [Spacing System](#spacing-system)
8. [Usage Guidelines](#usage-guidelines)
9. [Technical Implementation](#technical-implementation)

---

## Brand Overview

### Brand Identity

**tasteink** is a premium brand that combines high-end design aesthetics with rebellious, punk rock energy. The visual identity is built around:

- **4 Brand Colors** — Neon colors that cut through the dark
- **DM Sans Typeface** — Clean, geometric, unapologetic
- **∞ Possibilities** — Limitless creative expression
- **0 Compromises** — No bullshit, no shortcuts

### Core Philosophy

- Premium identity with punk rock roots
- Dark mode first, always
- Flat design, no shadows
- Accessible borders
- Ultra premium, zero bullshit

---

## Color System

### The Rule

> **No fucking blue. Ever.**

The tasteink palette is built on vibrant neons against deep, green-tinted blacks. Every color choice is intentional and designed to cut through the dark.

### Brand Neons

| Color           | Hex       | OKLCH                  | CSS Variable    | Usage                                           |
| --------------- | --------- | ---------------------- | --------------- | ----------------------------------------------- |
| **Neon Green**  | `#39FF14` | `oklch(0.85 0.28 145)` | `--neon-green`  | Primary actions, success states, key highlights |
| **Neon Pink**   | `#FF1493` | `oklch(0.75 0.25 350)` | `--neon-pink`   | Secondary accents, badges, emphasis             |
| **Neon Purple** | `#BF40BF` | `oklch(0.7 0.25 300)`  | `--neon-purple` | Tertiary accents, tags, categories              |
| **Neon Orange** | `#FF6B35` | `oklch(0.8 0.22 55)`   | `--neon-orange` | Warnings, attention, call-outs                  |

### Grayscale Palette

| Name           | Hex       | OKLCH                   | Usage                    |
| -------------- | --------- | ----------------------- | ------------------------ |
| **Pure White** | `#FAFAFA` | `oklch(0.98 0 0)`       | Headlines, primary text  |
| **Light Gray** | `#A0A0A0` | `oklch(0.7 0 0)`        | Body text, descriptions  |
| **Muted Gray** | `#707070` | `oklch(0.55 0 0)`       | Secondary text, captions |
| **Border**     | `#2A2F2A` | `oklch(0.28 0.015 145)` | Dividers, outlines       |
| **Surface**    | `#141814` | `oklch(0.14 0.018 145)` | Cards, elevated surfaces |
| **Background** | `#0A0F0A` | `oklch(0.12 0.02 145)`  | Page background          |

### Background Gradient

The page uses a subtle green-black gradient:

```css
background: linear-gradient(to bottom, #050908, #0a0f0a, #0d120d);
```

### Color Usage Rules

#### ✅ Do This

- Use **neon colors** for interactive elements, badges, and key highlights
- Maintain high contrast between text and backgrounds
- Use **white** sparingly for hierarchy
- Scatter brand colors throughout the UI—don't be shy

#### ❌ Never Do This

- Never use ~~blue~~. Seriously. Not even close.
- Don't place similar background colors on top of each other
- Avoid pure black (`#000000`) backgrounds
- Don't use neon colors for large text blocks

### Icon Color States

| State   | Color            | Variable             |
| ------- | ---------------- | -------------------- |
| Default | Foreground       | `--foreground`       |
| Success | Neon Green       | `--neon-green`       |
| Accent  | Neon Pink        | `--neon-pink`        |
| Info    | Neon Purple      | `--neon-purple`      |
| Warning | Neon Orange      | `--neon-orange`      |
| Muted   | Muted Foreground | `--muted-foreground` |

---

## Typography

### Primary Typeface

**DM Sans** — Clean, geometric, unapologetic. One typeface. Infinite expression.

- **Source:** Google Fonts
- **License:** Open Source
- **Fallbacks:** `system-ui, sans-serif`

```css
font-family: "DM Sans", "DM Sans Fallback", system-ui, sans-serif;
```

### Font Weights

| Weight Name | Value | Usage              |
| ----------- | ----- | ------------------ |
| Light       | 300   | Subtle emphasis    |
| Regular     | 400   | Body text          |
| Medium      | 500   | Labels, navigation |
| Semibold    | 600   | Subheadings        |
| Bold        | 700   | Headlines, CTAs    |
| Black       | 900   | Display, hero text |

### Type Scale

| Name        | Size            | Weight | Line Height | Tailwind Class                          |
| ----------- | --------------- | ------ | ----------- | --------------------------------------- |
| **Display** | 72px / 4.5rem   | 700    | 0.9         | `text-7xl font-bold leading-[0.9]`      |
| **H1**      | 48px / 3rem     | 700    | 1.0         | `text-5xl font-bold leading-tight`      |
| **H2**      | 36px / 2.25rem  | 600    | 1.1         | `text-4xl font-semibold leading-tight`  |
| **H3**      | 24px / 1.5rem   | 600    | 1.2         | `text-2xl font-semibold leading-snug`   |
| **H4**      | 20px / 1.25rem  | 500    | 1.3         | `text-xl font-medium leading-snug`      |
| **Body**    | 16px / 1rem     | 400    | 1.6         | `text-base font-normal leading-relaxed` |
| **Small**   | 14px / 0.875rem | 400    | 1.5         | `text-sm font-normal leading-normal`    |
| **Caption** | 12px / 0.75rem  | 500    | 1.4         | `text-xs font-medium leading-normal`    |

### Text Hierarchy

| Element                          | Color           | Usage                  |
| -------------------------------- | --------------- | ---------------------- |
| **White** (`--primary`)          | Headlines, CTAs | Primary emphasis       |
| **Gray** (`--foreground`)        | Body text       | Standard content       |
| **Muted** (`--muted-foreground`) | Secondary text  | Supporting information |
| **Brand Colors**                 | Accents, labels | Interactive elements   |

### Typography Guidelines

- Headlines demand attention — use **white** and **bold**
- Body text should be **gray** (`--foreground`), not white
- Use brand colors for labels, tags, and status indicators
- Labels use `text-xs font-semibold tracking-wider uppercase`

---

## Voice & Tone

### How We Sound

> "We don't whisper. **We announce.**"

tasteink's voice is unapologetically direct, confident, and human. We speak like a friend, not a brand.

### Voice Principles

#### Direct

Say what you mean. No corporate speak, no fluff, no dancing around the point.

> ✅ "Join the waitlist"  
> ❌ "We'd love for you to consider joining our exclusive waitlist experience"

#### Confident

We know our shit. Speak with authority but never arrogance.

> ✅ "This will change everything"  
> ❌ "We think this might possibly help"

#### Rebellious

Challenge the status quo. Question everything. Rules are suggestions.

> ✅ "Fuck the algorithm"  
> ❌ "Working within platform guidelines"

#### Human

Real talk with real people. Swear when it fits. Be the friend, not the brand.

> ✅ "We messed up, here's how we're fixing it"  
> ❌ "We apologize for any inconvenience"

### Tone Spectrum

| Context        | Tone                | Example                                       |
| -------------- | ------------------- | --------------------------------------------- |
| Error messages | Calm + Direct       | "Something broke. We're on it."               |
| Success states | Celebratory         | "Fuck yes. You did it."                       |
| Onboarding     | Warm + Guiding      | "Let's get you set up. No bullshit, promise." |
| Marketing      | Bold + Provocative  | "Ready to stop playing it safe?"              |
| Support        | Empathetic + Honest | "That sucks. Here's what we can do."          |

### Sound Like This ✅

- "Let's fucking go."
- "No cap, this slaps."
- "Built different. Hits different."
- "You in or you out?"
- "Real ones know."

### Never Sound Like This ❌

- "We're excited to announce..."
- "Please don't hesitate to reach out."
- "Best-in-class synergy..."
- "We appreciate your patience."
- "Circle back to leverage..."

---

## Components

### Design Philosophy

- **Flat** — No shadows, clean surfaces
- **Bordered** — Accessible, visible boundaries
- **Minimal** — Every element has purpose
- **Interactive** — Clear hover and focus states

### Buttons

#### Primary Actions

```jsx
<button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
  Get Started
</button>

<button className="bg-neon-green text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
  Let's Go
</button>

<button className="bg-neon-pink text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
  Fuck Yeah
</button>
```

#### Secondary Actions

```jsx
<button className="border border-border text-foreground px-6 py-3 rounded-md font-medium hover:border-foreground/50 transition-colors">
  Learn More
</button>

<button className="border border-neon-green text-neon-green px-6 py-3 rounded-md font-medium hover:bg-neon-green/10 transition-colors">
  Explore
</button>

<button className="text-neon-purple font-medium px-6 py-3 hover:opacity-70 transition-opacity">
  Skip →
</button>
```

### Badges & Tags

#### Filled Badges

```jsx
<span className="bg-neon-green/15 text-neon-green text-xs font-semibold px-3 py-1.5 rounded-full">Active</span>
<span className="bg-neon-pink/15 text-neon-pink text-xs font-semibold px-3 py-1.5 rounded-full">Featured</span>
<span className="bg-neon-purple/15 text-neon-purple text-xs font-semibold px-3 py-1.5 rounded-full">New</span>
<span className="bg-neon-orange/15 text-neon-orange text-xs font-semibold px-3 py-1.5 rounded-full">Hot</span>
<span className="border border-border text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full">Default</span>
```

#### Status Labels

```jsx
<span className="text-neon-green text-xs font-semibold tracking-wider uppercase">• Online</span>
<span className="text-neon-pink text-xs font-semibold tracking-wider uppercase">• Premium</span>
<span className="text-neon-orange text-xs font-semibold tracking-wider uppercase">• Limited</span>
```

### Cards

```jsx
<div className="border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors">
  <div className="flex items-center justify-between mb-4">
    <span className="bg-neon-green/15 text-neon-green text-xs font-semibold px-2 py-1 rounded">
      Active
    </span>
    <span className="text-muted-foreground text-xs">2 min ago</span>
  </div>
  <h4 className="text-primary font-semibold text-lg mb-2">Project Alpha</h4>
  <p className="text-foreground text-sm mb-4">
    Breaking conventions since day one.
  </p>
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-full bg-neon-pink" />
    <span className="text-muted-foreground text-sm">@creator</span>
  </div>
</div>
```

### Input States

| State          | Border Color         | Usage              |
| -------------- | -------------------- | ------------------ |
| Default        | `--border`           | Unfocused input    |
| Focused/Active | `--neon-green`       | User interaction   |
| Error          | `--neon-pink`        | Validation failure |
| Disabled       | `--muted-foreground` | Inactive state     |

### Form Elements

```jsx
<input
  type="email"
  placeholder="you@example.com"
  className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-primary placeholder:text-muted-foreground focus:border-neon-green focus:outline-none transition-colors"
/>

<textarea
  placeholder="What's on your mind?"
  rows={4}
  className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-primary placeholder:text-muted-foreground focus:border-neon-green focus:outline-none transition-colors resize-none"
/>
```

### Tabs

```jsx
<div className="flex gap-1 border-b border-border">
  <button className="px-4 py-3 text-sm font-medium text-primary relative">
    Primary
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green" />
  </button>
  <button className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
    Secondary
  </button>
</div>
```

### Notifications/Alerts

#### Success

```jsx
<div className="border border-neon-green/30 bg-neon-green/5 rounded-lg p-4 flex items-start gap-4">
  <div className="text-neon-green shrink-0">{/* Check icon */}</div>
  <div>
    <h4 className="text-primary font-semibold text-sm mb-1">
      Campaign launched
    </h4>
    <p className="text-foreground text-sm">
      Your campaign is now live. Let's fucking go.
    </p>
  </div>
</div>
```

#### Warning

```jsx
<div className="border border-neon-orange/30 bg-neon-orange/5 rounded-lg p-4 flex items-start gap-4">
  <div className="text-neon-orange shrink-0">{/* Warning icon */}</div>
  <div>
    <h4 className="text-primary font-semibold text-sm mb-1">
      Budget running low
    </h4>
    <p className="text-foreground text-sm">
      You've used 85% of your budget. Top up or chill.
    </p>
  </div>
</div>
```

#### Info

```jsx
<div className="border border-neon-purple/30 bg-neon-purple/5 rounded-lg p-4 flex items-start gap-4">
  <div className="text-neon-purple shrink-0">{/* Info icon */}</div>
  <div>
    <h4 className="text-primary font-semibold text-sm mb-1">
      New feature unlocked
    </h4>
    <p className="text-foreground text-sm">
      You now have access to advanced analytics.
    </p>
  </div>
</div>
```

---

## Icons & Assets

### Icon Style

- **Minimal** — Clean, functional, sharp
- **Stroke-based** — 2px stroke width
- **24x24** — Standard viewBox
- **Round caps** — `strokeLinecap="round" strokeLinejoin="round"`

### Core Icon Set

| Icon  | Usage               |
| ----- | ------------------- |
| Arrow | Navigation, links   |
| Check | Success, completion |
| Close | Dismiss, cancel     |
| Plus  | Add, create         |
| Star  | Favorites, ratings  |
| Heart | Likes, love         |
| Fire  | Trending, hot       |
| Bolt  | Speed, power        |

### Icon Example

```jsx
<svg
  className="w-6 h-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M13 10V3L4 14h7v7l9-11h-7z"
  />
</svg>
```

### Logo Mark

#### Primary Lockup

```jsx
<div className="flex items-center gap-4">
  <div className="w-4 h-4 rounded-full bg-neon-green" />
  <span className="text-primary font-bold text-4xl tracking-tight">
    tasteink
  </span>
</div>
```

#### Icon Mark

A simple neon green circle represents the brand at small sizes:

```jsx
<div className="w-16 h-16 rounded-full bg-neon-green" />
```

### Clear Space Requirements

- **Minimum:** 24px around the logo
- **Preferred:** 48px around the logo

---

## Spacing System

### Base Unit: 4px

All spacing follows a consistent 4px base unit system.

| Size | Value | Usage            |
| ---- | ----- | ---------------- |
| xs   | 4px   | Minimal gaps     |
| sm   | 8px   | Tight spacing    |
| md   | 12px  | Default internal |
| base | 16px  | Standard spacing |
| lg   | 24px  | Section padding  |
| xl   | 32px  | Component gaps   |
| 2xl  | 48px  | Section margins  |
| 3xl  | 64px  | Major sections   |

### Layout Guidelines

- **Spacious layouts feel premium**
- **Cramped layouts feel desperate**
- Use consistent spacing increments
- Generous padding on cards and sections

---

## Usage Guidelines

### Navigation Pattern

```jsx
<nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
  <div className="flex items-center justify-between h-16 px-6 lg:px-12">
    {/* Logo */}
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-neon-green" />
      <span className="text-primary font-bold tracking-tight text-lg">
        tasteink
      </span>
    </div>

    {/* Nav Items */}
    <div className="flex items-center gap-1">
      <button className="px-4 py-2 text-sm text-primary font-medium">
        Dashboard
      </button>
      <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
        Settings
      </button>
    </div>
  </div>
</nav>
```

### Dashboard Card Pattern

```jsx
<div className="border border-border rounded-lg p-8">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-neon-pink flex items-center justify-center">
        {/* Icon */}
      </div>
      <div>
        <h4 className="text-primary font-semibold">Active Campaign</h4>
        <p className="text-muted-foreground text-sm">Running since Apr 1</p>
      </div>
    </div>
    <span className="bg-neon-green/15 text-neon-green text-xs font-semibold px-3 py-1.5 rounded-full">
      Live
    </span>
  </div>

  <div className="grid grid-cols-3 gap-6 mb-6">
    <div>
      <span className="text-muted-foreground text-xs block mb-1">
        Impressions
      </span>
      <span className="text-primary font-bold text-2xl">1.2M</span>
    </div>
    <div>
      <span className="text-muted-foreground text-xs block mb-1">
        Engagement
      </span>
      <span className="text-neon-purple font-bold text-2xl">8.4%</span>
    </div>
    <div>
      <span className="text-muted-foreground text-xs block mb-1">
        Conversions
      </span>
      <span className="text-neon-orange font-bold text-2xl">2.1K</span>
    </div>
  </div>

  <div className="flex gap-3">
    <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-md font-semibold text-sm">
      View Details
    </button>
    <button className="border border-border text-foreground px-4 py-2.5 rounded-md font-medium text-sm">
      Pause
    </button>
  </div>
</div>
```

### Data Table Pattern

```jsx
<div className="border border-border rounded-lg overflow-hidden">
  {/* Header */}
  <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border">
    <span className="col-span-4 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
      Campaign
    </span>
    <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
      Status
    </span>
    <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
      Reach
    </span>
    <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
      Engagement
    </span>
    <span className="col-span-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
      Actions
    </span>
  </div>

  {/* Row */}
  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border hover:bg-secondary/50 transition-colors">
    <div className="col-span-4">
      <span className="text-primary font-medium">Summer Drop 2026</span>
    </div>
    <div className="col-span-2">
      <span className="text-neon-green text-xs font-semibold">• Active</span>
    </div>
    <div className="col-span-2">
      <span className="text-foreground">2.4M</span>
    </div>
    <div className="col-span-2">
      <span className="text-foreground">12.3%</span>
    </div>
    <div className="col-span-2">
      <button className="text-muted-foreground text-sm hover:text-primary">
        Edit →
      </button>
    </div>
  </div>
</div>
```

---

## Technical Implementation

### Tech Stack

- **Framework:** Next.js 16
- **Styling:** Tailwind CSS
- **Components:** Radix UI primitives
- **Font:** DM Sans (Google Fonts)
- **Color Space:** OKLCH for perceptual uniformity

### CSS Variables

All design tokens are defined as CSS custom properties in `app/globals.css`:

```css
:root {
  /* Background */
  --background: oklch(0.12 0.02 145);
  --background-light: oklch(0.16 0.025 145);
  --foreground: oklch(0.65 0 0);

  /* Brand Neons */
  --neon-green: oklch(0.85 0.28 145);
  --neon-pink: oklch(0.75 0.25 350);
  --neon-purple: oklch(0.7 0.25 300);
  --neon-orange: oklch(0.8 0.22 55);

  /* Text Hierarchy */
  --primary: oklch(0.98 0 0);
  --muted-foreground: oklch(0.55 0 0);

  /* Surfaces */
  --card: oklch(0.14 0.018 145);
  --border: oklch(0.28 0.015 145);

  /* Spacing */
  --radius: 0.5rem;
}
```

### Tailwind Configuration

The theme extends Tailwind with tasteink's design tokens in `tailwind.config.ts`:

```ts
colors: {
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: {
    DEFAULT: "var(--primary)",
    foreground: "var(--primary-foreground)",
  },
  "neon-green": "var(--neon-green)",
  "neon-pink": "var(--neon-pink)",
  "neon-purple": "var(--neon-purple)",
  "neon-orange": "var(--neon-orange)",
  // ... other tokens
}
```

### Component Library

The project includes a full shadcn/ui-based component library in `components/ui/`:

- Accordion, Alert, Avatar, Badge
- Button, Card, Checkbox, Dialog
- Dropdown Menu, Form, Input, Label
- Popover, Progress, Select, Tabs
- Toast, Tooltip, and more

### File Structure

```
├── app/
│   ├── globals.css        # Design tokens & CSS variables
│   ├── layout.tsx         # Root layout with font loading
│   └── page.tsx           # Brand guide page
├── components/
│   ├── brand/             # Brand documentation components
│   │   ├── color-system.tsx
│   │   ├── typography-system.tsx
│   │   ├── voice-tone.tsx
│   │   ├── component-showcase.tsx
│   │   ├── icons-assets.tsx
│   │   ├── hero-section.tsx
│   │   ├── navigation.tsx
│   │   └── usage-examples.tsx
│   └── ui/                # Reusable UI components
├── lib/
│   └── utils.ts           # Utility functions (cn, etc.)
└── tailwind.config.ts     # Theme configuration
```

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

---

## Final Words

> "Now go build something **fucking incredible.**"

You have the system. You have the voice. You have the colors. No excuses. No compromises.

---

_Built with intention. Designed without compromise._

**tasteink** — v1.0 — 2026

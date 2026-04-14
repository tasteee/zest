# zest

zest is a design language built for bold, risque digital products.

---

## Foundation

- **Theme**: Dark-only. No light mode.
- **Typeface**: DM Sans (Google Fonts, open source). One typeface, all weights.
- **Monospace**: DM Mono / Geist Mono
- **Icons**: Phosphor Icons (`@phosphor-icons/react`). No other icon library is permitted.
- **Color model**: OKLCH for all color definitions.
- **Border radius base**: `0.5rem` (`--radius`)
- **No blue. Ever.**

---

## Color System

### Identity Neons

| Name        | Hex       | OKLCH                  | CSS Variable    | Role                                     |
| ----------- | --------- | ---------------------- | --------------- | ---------------------------------------- |
| Neon Green  | `#39FF14` | `oklch(0.85 0.28 145)` | `--neon-green`  | Primary actions, success, key highlights |
| Neon Pink   | `#FF1493` | `oklch(0.75 0.25 350)` | `--neon-pink`   | Secondary accents, badges, emphasis      |
| Neon Purple | `#BF40BF` | `oklch(0.7 0.25 300)`  | `--neon-purple` | Tertiary accents, tags, categories       |
| Neon Orange | `#FF6B35` | `oklch(0.8 0.22 55)`   | `--neon-orange` | Warnings, attention, call-outs           |

### Grayscale

| Name       | Hex       | OKLCH                   | CSS Variable         | Role                     |
| ---------- | --------- | ----------------------- | -------------------- | ------------------------ |
| Pure White | `#FAFAFA` | `oklch(0.98 0 0)`       | `--primary`          | Headlines, primary text  |
| Light Gray | `#A0A0A0` | `oklch(0.65 0 0)`       | `--foreground`       | Body text, descriptions  |
| Muted Gray | `#707070` | `oklch(0.55 0 0)`       | `--muted-foreground` | Secondary text, captions |
| Border     | `#2A2F2A` | `oklch(0.28 0.015 145)` | `--border`           | Dividers, outlines       |
| Surface    | `#141814` | `oklch(0.14 0.018 145)` | `--card`             | Cards, elevated surfaces |
| Background | `#0A0F0A` | `oklch(0.12 0.02 145)`  | `--background`       | Page background          |

### Semantic Color Mapping

| Token                    | OKLCH                   | Purpose               |
| ------------------------ | ----------------------- | --------------------- |
| `--background`           | `oklch(0.12 0.02 145)`  | Page background       |
| `--background-light`     | `oklch(0.16 0.025 145)` | Elevated background   |
| `--foreground`           | `oklch(0.65 0 0)`       | Default body text     |
| `--primary`              | `oklch(0.98 0 0)`       | Headlines, CTAs       |
| `--primary-foreground`   | `oklch(0.12 0.02 145)`  | Text on primary fills |
| `--secondary`            | `oklch(0.22 0.015 145)` | Subdued surfaces      |
| `--secondary-foreground` | `oklch(0.65 0 0)`       | Text on secondary     |
| `--muted`                | `oklch(0.2 0.012 145)`  | Disabled backgrounds  |
| `--muted-foreground`     | `oklch(0.55 0 0)`       | Captions, hints       |
| `--accent`               | `oklch(0.85 0.25 145)`  | Neon green accent     |
| `--accent-foreground`    | `oklch(0.12 0.02 145)`  | Text on accent fills  |
| `--destructive`          | `oklch(0.65 0.25 25)`   | Error / destructive   |
| `--border`               | `oklch(0.28 0.015 145)` | Borders, dividers     |
| `--input`                | `oklch(0.22 0.015 145)` | Input backgrounds     |
| `--ring`                 | `oklch(0.85 0.25 145)`  | Focus rings           |

### Chart Colors

| Token       | Value                 |
| ----------- | --------------------- |
| `--chart-1` | `var(--neon-green)`   |
| `--chart-2` | `var(--neon-pink)`    |
| `--chart-3` | `var(--neon-purple)`  |
| `--chart-4` | `var(--neon-orange)`  |
| `--chart-5` | `oklch(0.75 0.2 120)` |

### Color Rules

**Do:**

- Use neon colors for interactive elements, badges, and key highlights.
- Maintain high contrast between text and backgrounds.
- Use white sparingly — only for headlines and CTAs — to create hierarchy.
- Scatter identity colors throughout the UI freely.

**Never:**

- Use blue. Not even close.
- Place similar background colors on top of each other.
- Use pure black (`#000000`) as a background.
- Use neon colors for large text blocks.

---

## Typography

### Typeface

**DM Sans** — clean, geometric, unapologetic.

- Source: Google Fonts (open source)
- Fallback stack: `'DM Sans', 'DM Sans Fallback', system-ui, sans-serif`
- Monospace: `'DM Mono', 'Geist Mono', monospace`

### Type Scale

| Level   | Size            | Weight | Line Height | Use Case                     |
| ------- | --------------- | ------ | ----------- | ---------------------------- |
| Display | 72px / 4.5rem   | 700    | 0.9         | Hero headlines               |
| H1      | 48px / 3rem     | 700    | 1.0         | Page titles                  |
| H2      | 36px / 2.25rem  | 600    | 1.1         | Section headers              |
| H3      | 24px / 1.5rem   | 600    | 1.2         | Subsection headers           |
| H4      | 20px / 1.25rem  | 500    | 1.3         | Card titles, labels          |
| Body    | 16px / 1rem     | 400    | 1.6         | Paragraph text               |
| Small   | 14px / 0.875rem | 400    | 1.5         | Secondary body, descriptions |
| Caption | 12px / 0.75rem  | 500    | 1.4         | Labels, tags, metadata       |

### Font Weights

| Name     | Value |
| -------- | ----- |
| Light    | 300   |
| Regular  | 400   |
| Medium   | 500   |
| Semibold | 600   |
| Bold     | 700   |
| Black    | 900   |

### Text Color Hierarchy

| Level     | Color Token           | Use Case                  |
| --------- | --------------------- | ------------------------- |
| Primary   | `--primary` (white)   | Headlines, CTAs           |
| Body      | `--foreground` (gray) | Body text                 |
| Secondary | `--muted-foreground`  | Captions, hints, metadata |
| Accent    | `--neon-*`            | Labels, tags, status      |

---

## Spacing

Base unit: **4px**. All spacing uses consistent increments.

| Token | Value | Use Case                       |
| ----- | ----- | ------------------------------ |
| xs    | 4px   | Tight internal padding         |
| sm    | 8px   | Compact element gaps           |
| md    | 12px  | Default internal padding       |
| base  | 16px  | Standard gaps between elements |
| lg    | 24px  | Section-internal spacing       |
| xl    | 32px  | Card padding, group spacing    |
| 2xl   | 48px  | Section boundaries             |
| 3xl   | 64px  | Major section separation       |

**Guideline**: Spacious layouts feel premium. Cramped layouts feel desperate.

---

## Border Radius

| Token         | Value                       |
| ------------- | --------------------------- |
| `--radius`    | `0.5rem` (8px)              |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)`             |
| `--radius-xl` | `calc(var(--radius) + 4px)` |

Used for cards, buttons, inputs, badges. Badges and status pills use `rounded-full`.

---

## Icons

### Standard: Phosphor Icons

- Package: `@phosphor-icons/react`
- Import style: namespace import (`import * as Phosphor from "@phosphor-icons/react"`)
- No lucide-react, heroicons, or custom inline SVGs.

### Available Weights

| Weight  | Use Case               |
| ------- | ---------------------- |
| thin    | Decorative, background |
| light   | Low emphasis           |
| regular | Default weight         |
| bold    | High emphasis, active  |
| fill    | Selected state, solid  |
| duotone | Illustrative, two-tone |

### Icon Sizes

- Default: `24px`
- Small: `16px` or `20px`
- Large: `32px`
- Prefer `weight="regular"` as the default.

### Icon Color Semantics

| Context | Class                   |
| ------- | ----------------------- |
| Default | `text-foreground`       |
| Success | `text-neon-green`       |
| Accent  | `text-neon-pink`        |
| Info    | `text-neon-purple`      |
| Warning | `text-neon-orange`      |
| Muted   | `text-muted-foreground` |

---

## Components

### Buttons

**Primary**: Solid fill (`bg-primary`, `bg-neon-green`, `bg-neon-pink`), `text-primary-foreground`, `rounded-md`, `font-semibold`, `px-6 py-3`.

**Secondary / Outline**: `border border-border`, `text-foreground`, `rounded-md`, `font-medium`. Hover: `border-foreground/50`.

**Ghost / Text**: No border, neon text color, `font-medium`. Hover: reduced opacity.

### Badges & Tags

- Pill shape: `rounded-full`, `text-xs font-semibold`, `px-3 py-1.5`.
- Tinted bg: `bg-{neon-color}/15` + `text-{neon-color}`.
- Outline variant: `border border-border`, `text-muted-foreground`.
- Inline status: dot + uppercase tracking-wider text (`text-xs font-semibold tracking-wider uppercase`).

### Cards

- `border border-border rounded-lg p-6`
- Hover: `hover:border-foreground/30 transition-colors`
- Status badge top-right, metadata bottom.
- No shadows. Borders only.

### Form Inputs

- `bg-transparent border border-border rounded-md px-4 py-3`
- Focus: `focus:border-neon-green focus:outline-none`
- Error: `border-neon-pink`
- Disabled: `text-muted-foreground`

### Tabs

- Text-based, no pill backgrounds.
- Active: `text-primary` + `h-0.5 bg-neon-green` underline.
- Inactive: `text-muted-foreground`, hover to `text-foreground`.

### Notifications / Alerts

- Border-left or full border with tinted background.
- Success: `border-neon-green/30 bg-neon-green/5`
- Warning: `border-neon-orange/30 bg-neon-orange/5`
- Info: `border-neon-purple/30 bg-neon-purple/5`
- Icon + title + description pattern.

### Data Tables

- Header: `text-muted-foreground text-xs font-semibold tracking-wider uppercase`
- Rows: `border-b border-border`, hover `bg-secondary/50`
- Status: colored dot + neon text.

---

### Clear Space

- Minimum: 24px around the logo mark.
- Preferred: 48px.

### Icon Mark

- Solid neon-green circle, used as the compact logo form.

---

## Voice & Tone

### Principles

| Principle  | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| Direct     | Say what you mean. No filler.                                      |
| Confident  | Know your shit and say so.                                         |
| Rebellious | Challenge the status quo. Rules are suggestions.                   |
| Human      | Real talk. Swear when it fits. Be the friend, not the corporation. |

### Tone by Context

| Context        | Tone                | Example                                       |
| -------------- | ------------------- | --------------------------------------------- |
| Error messages | Calm + Direct       | "Something broke. We're on it."               |
| Success states | Celebratory         | "Fuck yes. You did it."                       |
| Onboarding     | Warm + Guiding      | "Let's get you set up. No bullshit, promise." |
| Marketing      | Bold + Provocative  | "Ready to stop playing it safe?"              |
| Support        | Empathetic + Honest | "That sucks. Here's what we can do."          |

---

## Scrollbar

Custom WebKit scrollbar:

- Width/height: `6px`
- Track: transparent
- Thumb: `oklch(0.3 0.015 145)`, `border-radius: 3px`
- Thumb hover: `oklch(0.4 0.015 145)`

---

## Background

Page uses a subtle gradient from near-black to dark green-black:

```
from-[#050908] via-[#0a0f0a] to-[#0d120d]
```

All backgrounds carry a slight green tint (hue 145 in OKLCH) to reinforce the neon-green identity without being overt.

---

## Sidebar

| Token                          | OKLCH                   |
| ------------------------------ | ----------------------- |
| `--sidebar`                    | `oklch(0.1 0.015 145)`  |
| `--sidebar-foreground`         | `oklch(0.65 0 0)`       |
| `--sidebar-primary`            | `oklch(0.98 0 0)`       |
| `--sidebar-primary-foreground` | `oklch(0.12 0.02 145)`  |
| `--sidebar-accent`             | `oklch(0.85 0.25 145)`  |
| `--sidebar-accent-foreground`  | `oklch(0.12 0.02 145)`  |
| `--sidebar-border`             | `oklch(0.25 0.015 145)` |
| `--sidebar-ring`               | `oklch(0.85 0.25 145)`  |

---

## Constraints & Hard Rules

1. **Dark only.** No light theme. No light mode variables.
2. **No blue.** Anywhere. For any reason.
3. **No pure black** (`#000000`). Backgrounds use green-tinted near-blacks.
4. **No shadows.** Elevation is communicated through borders and background shifts.
5. **Neons are for accents**, never for large body text blocks.
6. **White is hierarchy**, not default. Headlines and CTAs only.
7. **Phosphor Icons only.** No lucide, heroicons, or inline SVGs.
8. **DM Sans only.** No secondary display typeface.
9. **OKLCH color model** for all color definitions.
10. **Borders over backgrounds** for card/container delineation.

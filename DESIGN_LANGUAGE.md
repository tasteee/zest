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

---

## Color System

### Identity Palette

| Name        | Hex       | OKLCH                  | CSS Variable    | Role                                  |
| ----------- | --------- | ---------------------- | --------------- | ------------------------------------- |
| Pure White  | `#FAFAFA` | `oklch(0.98 0 0)`      | `--primary`     | Headlines, primary text, primary CTAs |
| Neon Pink   | `#FF1493` | `oklch(0.75 0.25 350)` | `---pink`       | Secondary accents, badges, emphasis   |
| Neon Purple | `#BF40BF` | `oklch(0.7 0.25 300)`  | `---purple`     | Tertiary accents, tags, categories    |
| Danger Red  | `#FF3B30` | `oklch(0.65 0.25 25)`  | `--destructive` | Error, danger, destructive actions    |

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
| `--accent`               | `oklch(0.7 0.25 300)`   | Purple accent         |
| `--accent-foreground`    | `oklch(0.98 0 0)`       | Text on accent fills  |
| `--destructive`          | `oklch(0.65 0.25 25)`   | Error / destructive   |
| `--border`               | `oklch(0.28 0.015 145)` | Borders, dividers     |
| `--input`                | `oklch(0.22 0.015 145)` | Input backgrounds     |
| `--ring`                 | `oklch(0.85 0.25 145)`  | Focus rings           |

### Color Rules

**Do:**

- Use neon colors for interactive elements, badges, and key highlights.
- Maintain high contrast between text and backgrounds.
- Use white sparingly — only for headlines and CTAs — to create hierarchy.
- Scatter identity colors throughout the UI freely.
- Use red only for danger, errors, destructive actions, and invalid form states.

**Never:**

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
| Accent    | `---*`                | Labels, tags, status      |

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
| Accent  | `text-neon-pink`        |
| Info    | `text-neon-purple`      |
| Danger  | `text-destructive`      |
| Muted   | `text-muted-foreground` |

---

## Components

### Buttons

**Primary**: Solid fill using `--primary`, `---purple`, or `---pink`. Red is reserved for danger buttons only.

**Secondary / Outline**: Border uses `--border`; text uses `--foreground`; hover raises border contrast.

**Ghost / Text**: No border, purple or pink text color, `font-medium`. Hover: reduced opacity.

### Badges & Tags

- Pill shape: `rounded-full`, `text-xs font-semibold`, `px-3 py-1.5`.
- Tinted bg: purple or pink tint with matching text.
- Outline variant: `border border-border`, `text-muted-foreground`.
- Inline status: dot + uppercase tracking-wider text (`text-xs font-semibold tracking-wider uppercase`).

### Cards

- `border border-border rounded-lg p-6`
- Hover: `hover:border-foreground/30 transition-colors`
- Status badge top-right, metadata bottom.
- No shadows. Borders only.

### Form Inputs

- `bg-transparent border border-border rounded-md px-4 py-3`
- Focus: purple or pink border/ring.
- Error: red border/ring using `--destructive`.
- Disabled: `text-muted-foreground`

### Tabs

- Text-based, no pill backgrounds.
- Active: `text-primary` + purple or pink underline.
- Inactive: `text-muted-foreground`, hover to `text-foreground`.

### Notifications / Alerts

- Border-left or full border with tinted background.
- General: purple or pink border with a subtle matching tint.
- Danger: red border with a subtle red tint.
- Icon + title + description pattern.

### Data Tables

- Header: `text-muted-foreground text-xs font-semibold tracking-wider uppercase`
- Rows: `border-b border-border`, hover `bg-secondary/50`
- Status: purple, pink, white, or red dot with matching text. Red means danger only.

---

### Clear Space

- Minimum: 24px around the logo mark.
- Preferred: 48px.

### Icon Mark

- Solid white, purple, or pink mark, used as the compact logo form.

---

## Voice & Tone

### Principles

| Principle  | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| Direct     | Say what you mean. No filler.                                      |
| Confident  | Know your edge and say so.                                         |
| Rebellious | Challenge the status quo. Rules are suggestions.                   |
| Human      | Real talk. Swear when it fits. Be the friend, not the corporation. |

### Tone by Context

| Context        | Tone                | Example                                    |
| -------------- | ------------------- | ------------------------------------------ |
| Error messages | Calm + Direct       | "Something broke. We're on it."            |
| Success states | Celebratory         | "Iconic. You did it."                      |
| Onboarding     | Warm + Guiding      | "Let's get you set up. No fluff, promise." |
| Marketing      | Bold + Provocative  | "Ready to stop playing it safe?"           |
| Support        | Empathetic + Honest | "That stings. Here's what we can do."      |

---

## Scrollbar

Custom WebKit scrollbar:

- Width/height: `6px`
- Track: transparent
- Thumb: `oklch(0.3 0.015 300)`, `border-radius: 3px`
- Thumb hover: `oklch(0.4 0.015 300)`

---

## Background

Page uses a subtle gradient from near-black to dark purple-black:

```
from-[#08060a] via-[#0d0a10] to-[#130f18]
```

All backgrounds carry a slight purple tint (hue 300 in OKLCH) to reinforce the purple and pink identity without being overt.

---

## Sidebar

| Token                          | OKLCH                   |
| ------------------------------ | ----------------------- |
| `--sidebar`                    | `oklch(0.1 0.015 300)`  |
| `--sidebar-foreground`         | `oklch(0.65 0 0)`       |
| `--sidebar-primary`            | `oklch(0.98 0 0)`       |
| `--sidebar-primary-foreground` | `oklch(0.12 0.02 300)`  |
| `--sidebar-accent`             | `oklch(0.7 0.25 300)`   |
| `--sidebar-accent-foreground`  | `oklch(0.98 0 0)`       |
| `--sidebar-border`             | `oklch(0.25 0.015 300)` |
| `--sidebar-ring`               | `oklch(0.7 0.25 300)`   |

---

## Constraints & Hard Rules

1. **Dark only.** No light theme. No light mode variables.
2. **No blue.** Anywhere. For any reason.
3. **No green or orange.** Purple, pink, white, and danger red are the complete palette.
4. **Red is danger only.** Do not use red for general emphasis or decoration.
5. **No pure black** (`#000000`). Backgrounds use purple-tinted near-blacks.
6. **No shadows.** Elevation is communicated through borders and background shifts.
7. **Neons are for accents**, never for large body text blocks.
8. **White is hierarchy**, not default. Headlines and CTAs only.
9. **Phosphor Icons only.** No lucide, heroicons, or inline SVGs.
10. **DM Sans only.** No secondary display typeface.
11. **OKLCH color model** for all color definitions.
12. **Borders over backgrounds** for card/container delineation.

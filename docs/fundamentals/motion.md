# Motion

Motion in zest is short, one-directional and mostly about state feedback. Two working durations, two special ones, one easing, and a rule that turns all of it off.

## What it solves

A press, a hover, an open and a theme swap that feel like the same hand made them — and a single switch that respects a reader who asked for none of it.

## Primitives

The values are the tokens here; there is no lower layer. Each names a *kind* of moment rather than a number.

| Token | Value | Job |
| --- | --- | --- |
| `--duration-fast` | `120ms` | State feedback: hover, focus, colour, border, opacity. Paint only. |
| `--duration-move` | `160ms` | Movement: a transform, a width, a panel collapsing, a thumb sliding. Paint at 120 reads as instant; motion at 120 reads as a twitch. |
| `--material-press-duration` | `90ms` | A control settling when pressed. Shorter than fast because it has to feel mechanical, and because it may be animating `box-shadow` in a hardware theme, which is expensive. |
| `--theme-fade-out-duration` | `0.5s` | The whole-page fade out when the theme swaps. The swap lands when it completes. |
| `--theme-fade-in-duration` | `0.2s` | The fade back in after the swap. Quick, because by then there is nothing left to wait for. |
| `--easing-standard` | `ease-out` | Everything. Enter fast, settle slow. |

<z-token-table names="--duration-fast --duration-move --material-press-duration --theme-fade-out-duration --theme-fade-in-duration --easing-standard" kind="value"></z-token-table>

The ladder, then: **80 out · 90 press · 120 state · 160 move**. Two more figures are conventions rather than tokens: the editor's floating surfaces enter over `120ms` (fade + 4px rise) and exit over `80ms` (fade in place), so a menu leaves faster than it arrived.

## Semantic tokens

The roles are the tokens above. What the table below adds is *which properties* each role is allowed to animate.

| Moment | Token | Animate | Never animate |
| --- | --- | --- | --- |
| Hover / focus / state change | `--duration-fast` | `color`, `background-color`, `border-color`, `opacity` | `transform`, `width`, `height` — those are movement |
| Movement | `--duration-move` | `transform`, `width`, `max-width`, `height` on a panel that collapses | anything that relayouts a page rather than a panel |
| Press | `--material-press-duration` | `box-shadow` (small), `transform` | `background` gradients |
| Open / close | 120ms in, 80ms out | `opacity`, `transform: translateY(4px)` | `height` — use `grid-template-rows` or clip instead |
| Theme swap | `--theme-fade-out-duration` / `--theme-fade-in-duration` | `opacity` on `<body>`, `background-color` on `<html>` | every custom property — they do not interpolate |

## Reduced motion

An instant change is the correct response to `prefers-reduced-motion: reduce`, not a slower one. The library answers in one place:

```css
/* shared/interaction-styles.ts — included in every core control's shadow root */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

29 core controls and overlays include the block; the marquee, pointer-follow, aura, skeleton and terminal effects check the query themselves and stop.

The theme swap is the deliberate exception. `shared/theme.ts` keeps its fade under `prefers-reduced-motion`, because a fade is not motion — WCAG's definition of motion animation explicitly excludes changes of opacity and colour — and the alternative is a full-screen luminance snap, which is the harsher experience. Set `--theme-fade-out-duration` to `0` to opt out.

`0.01ms` rather than `0s` because a zero-duration transition never fires `transitionend`, and a component waiting on that event to unmount would never finish.

## In use

Hover and press the button; open the menu. Each moment reads its own role.

<div style="display: flex; gap: var(--space-sm); align-items: center; flex-wrap: wrap;">
<z-button accent="dom">Hover, then press</z-button>
<z-button kind="outline">Outline hover</z-button>
<z-tooltip content="Entered over 120ms, leaves over 80ms."><z-button kind="ghost">Tooltip</z-button></z-tooltip>
</div>

```css
.button {
  transition:
    background-color var(--duration-fast) var(--easing-standard),
    border-color     var(--duration-fast) var(--easing-standard),
    color            var(--duration-fast) var(--easing-standard),
    box-shadow       var(--material-press-duration) ease;
}
.button:active { box-shadow: var(--elevation-pressed); }

.switch .thumb {
  transition:
    transform        var(--duration-move) var(--easing-standard),   /* the slide */
    background-color var(--duration-fast) var(--easing-standard);   /* the recolour */
}
```

## Rules

- **Do** read a token. `--duration-fast` for paint, `--duration-move` for movement; a literal `0.12s` is the hand-tuned value the tokens replaced.
- **Do** transition paint and transform only. `opacity`, `transform`, `color`, `background-color`, `border-color` are cheap; anything that relayouts a page is not.
- **Do** make exits faster than entrances. A surface that lingers on the way out feels stuck.
- **Don't** animate a custom property. They do not interpolate unless registered with `@property`, and only `--aura-angle` is.
- **Don't** animate `box-shadow` on anything large. A four-layer hardware shadow is GPU work on every frame; the press duration is short for that reason.
- **Don't** hand a reduced-motion user a slower animation. Skip it.

## Rationale

Short one-way motion is the only kind a flat, dark interface can afford: with no light to move through, an easing curve much past 160ms reads as lag rather than physics. `--duration-fast` is 120 rather than the 140 it once declared because 120 is what fifty-four components had been written in by hand — the token was made to match the library, not the other way round. The theme fade is the deliberate exception, and it exists because the alternative — a cross-fade through the View Transition API — sums two frames with `plus-lighter` and blows the whole screen out to white halfway through a dark-to-light swap.

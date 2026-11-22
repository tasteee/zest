import { Link } from 'wouter'
import { Article, Code } from '@app/docs/Prose'
import { MarkupCode } from '@app/docs/frameworks/MarkupCode'

export const Theming = () => (
	<Article
		eyebrow="Configuration"
		title="Theming"
		lede="Every element reads its look from CSS custom properties defined in ink.css. Override them on :root to retheme the whole system, or on any container to retheme just that subtree."
	>
		<h2>The base dials</h2>
		<p>A handful of base tokens drive the scales and the neutral ramp. Change one and every surface, border and size follows.</p>
		<Code
			language="css"
			code={`
:root {
  --base-neutral-hue: 146;                     /* tint of the neutral ramp */
  --base-neutral-chroma: 0.014;
  --base-radius: 0.625rem;
  --base-spacing: 0.25rem;
  --base-font-size: 16px;                      /* scales the whole type ramp */
}
`}
		/>

		<h2>Accent colors</h2>
		<p>Override <code>--accent-primary</code>, <code>--accent-secondary</code>, and <code>--accent-tertiary</code> to choose your own colors. Primary is neutral by default, but can be any color. Check contrast in both themes.</p>
		<Code language="css" code={`:root { --accent-primary: #2563eb; }`} />

		<h2>Styling components</h2>
		<p>CSS custom properties inherit into shadow roots. Use the documented component tokens to change styles, and use <code>::part()</code> where an element exposes a part. Other internal elements cannot be selected from outside the shadow root.</p>

		<h2>Light and dark</h2>
		<p>
			Dark is the default. Set <code>data-theme="light"</code> on the root element to switch, or drop in a{' '}
			<Link href="/elements/z-theme-switcher">z-theme-switcher</Link>, which also follows the system preference and
			remembers the choice.
		</p>
		<Code language="html" code={`<html data-theme="light">`} />

		<h2>Scoped themes</h2>
		<p>
			Derived tokens (the radius, spacing and type scales, and every role token) are computed where they are declared, so
			a container that only changes <code>--base-radius</code> would still inherit the radius computed on the root. Add{' '}
			<code>data-zest-scope</code> to re-derive them for that subtree. A <code>data-theme</code> element does the same,
			and also swaps the palette. Both keep the scale values you set on <code>:root</code>.
		</p>
		<MarkupCode
			html={`
<section data-zest-scope style="--base-radius: 0; --base-font-size: 14px">
  <z-card>Square, compact cards in here only.</z-card>
</section>
`}
		/>

		<h2>Dense regions</h2>
		<p>
			Zest's controls are sized for forms. Editors, toolbars and inspectors need tighter controls in one part of the page.
			Every control reads its height from the <code>--control-height-xs</code> / <code>-sm</code> / <code>-md</code> /{' '}
			<code>-lg</code> tokens. Those are plain values, not derived ones, so overriding them on a container resizes every Zest
			control inside it. Add <code>data-zest-scope</code> as well to rescale the type, spacing and radius for that region. Never
			shrink a single control with your own height override: the tokens keep a button, an input and a toggle side by side in
			agreement.
		</p>
		<MarkupCode
			html={`
<div class="editor" data-zest-scope>
  <z-toolbar aria-label="Transport">
    <z-button is-icon size="sm" kind="ghost" aria-label="Go to start">…</z-button>
    <z-toggle-button is-icon size="sm" aria-label="Loop">…</z-toggle-button>
  </z-toolbar>
</div>
`}
		/>
		<Code
			language="css"
			code={`
.editor {
  --base-font-size: 14px;
  --control-height-xs: 1.5rem;   /* 24px */
  --control-height-sm: 1.75rem;  /* 28px */
  --control-height-md: 1.875rem; /* 30px */
}
`}
		/>

		<h2>Tinting a color</h2>
		<p>
			Mix a tint against <code>transparent</code> in oklch, or against an opaque neutral (a surface, border or text role) in
			oklab. Mixing in oklch against a neutral interpolates the hue too, so a violet mixed into the tinted neutrals comes out
			grey-green.
		</p>
		<Code
			language="css"
			code={`
/* good */
background: color-mix(in oklch, var(--accent-secondary) 12%, transparent);
background: color-mix(in oklab, var(--accent-secondary) 12%, var(--surface-default));

/* hue drifts toward the neutral */
background: color-mix(in oklch, var(--accent-secondary) 12%, var(--surface-default));
`}
		/>

		<h2>Tokens only</h2>
		<p>
			<code>ink.css</code> is two files. <code>tokens.css</code> holds custom properties and never touches your page;{' '}
			<code>document.css</code> styles <code>html</code> and <code>body</code>, scrollbars, text selection and the theme
			fade. Import <code>@tasteee/zest/tokens.css</code> on its own when your application owns those.
		</p>

		<h2>Motion</h2>
		<p>
			Durations and curves are tokens too. See <Link href="/foundations/motion">Motion</Link> for the full scale. Reduced-motion
			users get no travel or scale, and the theme changes without a fade. Set{' '}
			<code>--theme-fade-out-duration</code> and <code>--theme-fade-in-duration</code> to bring the fade back.
		</p>
	</Article>
)

import { Link } from 'wouter'
import { Article, Code } from '@app/docs/Prose'

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
		<Code
			code={`
<section data-zest-scope style="--base-radius: 0; --base-font-size: 14px">
  <z-card>Square, compact cards in here only.</z-card>
</section>
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
			Durations and curves are tokens too. See <Link href="/system/motion">Motion</Link> for the full scale. Reduced-motion
			users get no travel or scale, and the theme changes without a fade. Set{' '}
			<code>--theme-fade-out-duration</code> and <code>--theme-fade-in-duration</code> to bring the fade back.
		</p>
	</Article>
)

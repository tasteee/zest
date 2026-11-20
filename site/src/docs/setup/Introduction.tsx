import { Link } from 'wouter'
import { Article } from '@app/docs/Prose'
import { FrameworkSegments } from '@app/docs/frameworks/FrameworkPicker'

type NextStepT = {
	href: string
	title: string
	summary: string
	action: string
}

// A path forward, not a tour of the nav: the top bar already
// says where everything lives.
const NEXT_STEPS: NextStepT[] = [
	{
		href: '/guide/installation',
		title: 'Install Zest',
		summary: 'One script and one stylesheet, from npm or a CDN.',
		action: 'Installation'
	},
	{
		href: '/elements',
		title: 'Browse elements',
		summary: 'Every z element with live demos, code, and attributes.',
		action: 'All elements'
	},
	{
		href: '/blocks',
		title: 'Copy a block',
		summary: 'Real interfaces composed from elements, ready to adapt.',
		action: 'All blocks'
	}
]

const NextStepCard = (props: { step: NextStepT }) => (
	<Link href={props.step.href} className="DocsBlockCard">
		<span className="DocsBlockTitle">{props.step.title}</span>
		<span className="DocsBlockSummary">{props.step.summary}</span>
		<span className="DocsBlockMore">{props.step.action} →</span>
	</Link>
)

export const Introduction = () => (
	<Article
		eyebrow="Guide"
		title="Introduction"
		lede="Zest is a design system shipped as framework-agnostic web components. One script and one stylesheet, and every z element works in plain HTML, React, Svelte, or anything else that renders the DOM."
	>
		<h2>Pick your framework</h2>
		<p>
			Every code example in these docs is written for the framework you pick here. Change it any time in Settings, or from
			any example’s Code tab.
		</p>
		<FrameworkSegments />

		<h2>What you get</h2>
		<ul>
			<li>
				<strong>Elements</strong> are real custom elements (<code>&lt;z-button&gt;</code>, <code>&lt;z-dialog&gt;</code>…).
				They carry their own styles in a shadow root and read every color, space, radius, and duration from shared design
				tokens.
			</li>
			<li>
				<strong>Tokens</strong> live in one stylesheet, <code>ink.css</code>. Override any of them on <code>:root</code> (or
				any container) to retheme everything underneath.
			</li>
			<li>
				<strong>Zero runtime dependencies.</strong> The published bundle includes everything it needs.
			</li>
		</ul>

		<h2>Principles in one breath</h2>
		<p>
			Beautiful defaults, simple common cases, composition over special-purpose props. Data goes in attributes, content goes
			in slots (or declarative child elements), and styling goes through tokens. Motion follows one shared scale, and every
			exit is as considered as its entrance.
		</p>

		<h2>Next steps</h2>
		<div className="DocsIndexGrid">
			{NEXT_STEPS.map((step) => (
				<NextStepCard key={step.href} step={step} />
			))}
		</div>
	</Article>
)

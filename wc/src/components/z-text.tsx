import { c, css } from 'atomico'

const presetTagMap: Record<string, string> = {
	display: 'h1',
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	body: 'p',
	small: 'p',
	caption: 'p'
}

const styles = css`
	:host {
		display: inline;
		color: var(--foreground);
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		font-weight: var(--font-weight-regular);
	}

	:host([preset='display']) {
		font-size: var(--font-size-display);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-display);
	}

	:host([preset='h1']) {
		font-size: var(--font-size-h1);
		font-weight: var(--font-weight-bold);
		line-height: var(--line-height-h1);
	}

	:host([preset='h2']) {
		font-size: var(--font-size-h2);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-h2);
	}

	:host([preset='h3']) {
		font-size: var(--font-size-h3);
		font-weight: var(--font-weight-semibold);
		line-height: var(--line-height-h3);
	}

	:host([preset='h4']) {
		font-size: var(--font-size-h4);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-h4);
	}

	:host([preset='body']) {
		font-size: var(--font-size-body);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-body);
	}

	:host([preset='small']) {
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-regular);
		line-height: var(--line-height-small);
	}

	:host([preset='caption']) {
		font-size: var(--font-size-caption);
		font-weight: var(--font-weight-medium);
		line-height: var(--line-height-caption);
	}

	:host([is-purple]) {
		color: var(--neon-purple);
	}

	:host([is-pink]) {
		color: var(--neon-pink);
	}

	:host([is-neutral]) {
		color: var(--foreground);
	}

	:host([is-muted]) {
		color: var(--muted-foreground);
	}

	:host([is-extra-small]) {
		font-size: var(--font-size-caption);
		line-height: var(--line-height-caption);
	}

	:host([is-small]) {
		font-size: var(--font-size-small);
		line-height: var(--line-height-small);
	}

	:host([is-medium]) {
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
	}

	:host([is-large]) {
		font-size: var(--font-size-h4);
		line-height: var(--line-height-h4);
	}

	:host([is-extra-large]) {
		font-size: var(--font-size-h3);
		line-height: var(--line-height-h3);
	}

	:host([is-thin]),
	:host([is-normal]) {
		font-weight: var(--font-weight-regular);
	}

	:host([is-bold]) {
		font-weight: var(--font-weight-semibold);
	}

	:host([is-very-bold]) {
		font-weight: var(--font-weight-bold);
	}

	:host([is-italic]) {
		font-style: italic;
	}

	:host([is-underlined]) {
		text-decoration: underline;
	}
`

export const ZText = c(
	(props) => {
		const Tag = (props.tag || presetTagMap[props.preset || ''] || 'span') as any

		return (
			<host shadowDom>
				<Tag>
					<slot />
				</Tag>
			</host>
		)
	},
	{
		props: {
			preset: { type: String, reflect: true },
			tag: String,
			isPurple: { type: Boolean, reflect: true },
			isPink: { type: Boolean, reflect: true },
			isNeutral: { type: Boolean, reflect: true },
			isMuted: { type: Boolean, reflect: true },
			isExtraSmall: { type: Boolean, reflect: true },
			isSmall: { type: Boolean, reflect: true },
			isMedium: { type: Boolean, reflect: true },
			isLarge: { type: Boolean, reflect: true },
			isExtraLarge: { type: Boolean, reflect: true },
			isThin: { type: Boolean, reflect: true },
			isNormal: { type: Boolean, reflect: true },
			isBold: { type: Boolean, reflect: true },
			isVeryBold: { type: Boolean, reflect: true },
			isItalic: { type: Boolean, reflect: true },
			isUnderlined: { type: Boolean, reflect: true }
		},
		styles
	}
)

customElements.define('z-text', ZText)

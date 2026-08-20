import { defineElement } from '../shared/define-element'
import { c, css, event, useEffect, useHost, useState } from 'atomico'
import { COPY_FEEDBACK_DURATION, copyText } from '../shared/clipboard'

/*
 * z-swatch — one design token, shown as itself.
 *
 *   <z-swatch token="--purple"></z-swatch>
 *   <z-swatch token="--space-lg" kind="space"></z-swatch>
 *
 * The value is *resolved*, never authored. It is read with getComputedStyle
 * off this element, which means two things that a hardcoded value could not
 * give you: the swatch shows what the token actually is in whatever theme is
 * active, and a swatch inside a region with its own `data-theme` shows that
 * region's value rather than the page's.
 *
 * zest ships four themes that disagree about physics, so a token table with
 * baked-in values would be wrong three quarters of the time. The theme
 * attribute is observed and the value re-resolved on change.
 *
 * Clicking copies `var(--token)` rather than the resolved value, because the
 * token is the thing you want in your stylesheet — the resolved value is what
 * you are trying to stop hardcoding.
 */
const styles = css`
	:host {
		display: block;
	}

	:host([is-hidden]) {
		display: none;
	}

	.swatch {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		width: 100%;
		box-sizing: border-box;
		padding: var(--space-sm);
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--foreground);
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: border-color 0.12s ease;
	}

	.swatch:hover {
		border-color: var(--border);
	}

	.swatch:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 50%, transparent);
		outline-offset: 2px;
	}

	/* Every specimen occupies the same box so a column of mixed kinds still
	   lines its names up. */
	.specimen {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius-sm);
		overflow: hidden;
	}

	.chip {
		width: 100%;
		height: 100%;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--swatch-value);
	}

	/* A spacing token reads as a length, so the specimen is a bar of exactly
	   that width rather than a box scaled to it. */
	.bar {
		width: var(--swatch-value);
		max-width: 100%;
		height: 0.5rem;
		border-radius: 999px;
		background: var(--foreground);
	}

	.corner {
		width: 100%;
		height: 100%;
		border: 1px solid var(--foreground);
		border-radius: var(--swatch-value);
	}

	.glyph {
		font-size: var(--swatch-value);
		line-height: 1;
		color: var(--foreground);
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 0;
		flex: 1;
	}

	.name {
		font-family: var(--font-mono);
		font-size: var(--font-size-small);
		color: var(--foreground);
		overflow-wrap: anywhere;
	}

	.value {
		font-family: var(--font-mono);
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
		overflow-wrap: anywhere;
	}

	.description {
		font-size: var(--font-size-caption);
		color: var(--muted-foreground);
	}

	.copied {
		flex-shrink: 0;
		font-size: var(--font-size-caption);
		color: var(--success);
	}
`

const COLOR_HINTS = ['color', 'background', 'foreground', 'border', 'accent', 'ring', 'purple', 'pink', 'success', 'warning', 'destructive', 'muted', 'card', 'popover', 'sidebar', 'chart', 'skeleton', 'input']

// Kinds are inferred from the token name so a table of 411 tokens does not
// need 411 hand-written classifications. `kind` overrides.
const inferKind = (token: string): string => {
	const name = token.toLowerCase()

	if (name.includes('radius')) return 'radius'
	if (name.includes('spacing') || name.includes('space')) return 'space'
	if (name.includes('font-size')) return 'type'
	if (name.includes('font-family') || name.includes('font-weight')) return 'value'

	for (const hint of COLOR_HINTS) {
		if (name.includes(hint)) return 'color'
	}

	return 'value'
}

const normalizeToken = (token: string): string => {
	const trimmed = token.trim()
	const hasPrefix = trimmed.startsWith('--')
	return hasPrefix ? trimmed : `--${trimmed}`
}

export const ZSwatch = c(
	(props) => {
		const host = useHost()
		const [resolvedValue, setResolvedValue] = useState<string>('')
		const [isCopied, setIsCopied] = useState(false)

		const token = normalizeToken((props.token as string) || '')
		const kind = (props.kind as string) || inferKind(token)

		// Resolved off the host, not the document, so a swatch inside a themed
		// region reports that region's value.
		useEffect(() => {
			const element = host.current
			if (!element) return

			const resolve = () => {
				const computed = getComputedStyle(element).getPropertyValue(token)
				setResolvedValue(computed.trim())
			}

			resolve()

			const observer = new MutationObserver(resolve)
			observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
			return () => observer.disconnect()
		}, [token])

		const handleCopy = async () => {
			const result = await copyText(`var(${token})`)
			if (!result.isCopied) return

			setIsCopied(true)
			props.copy({ token, value: resolvedValue })
			setTimeout(() => setIsCopied(false), COPY_FEEDBACK_DURATION)
		}

		const buildSpecimen = () => {
			if (kind === 'color') return <span class='chip' />
			if (kind === 'space') return <span class='bar' />
			if (kind === 'radius') return <span class='corner' />
			if (kind === 'type') return <span class='glyph'>Ag</span>
			return null
		}

		const label = (props.label as string) || token
		const description = props.description as string | undefined
		const specimen = buildSpecimen()
		const specimenStyle = { '--swatch-value': resolvedValue }

		return (
			<host shadowDom>
				<button type='button' class='swatch' onclick={handleCopy} title={`Copy var(${token})`}>
					{specimen && (
						<span class='specimen' style={specimenStyle}>
							{specimen}
						</span>
					)}
					<span class='text'>
						<span class='name'>{label}</span>
						<span class='value'>{resolvedValue || '—'}</span>
						{description && <span class='description'>{description}</span>}
					</span>
					{isCopied && <span class='copied'>Copied</span>}
				</button>
			</host>
		)
	},
	{
		props: {
			token: { type: String, reflect: true },
			kind: { type: String, reflect: true },
			label: { type: String, reflect: true },
			description: { type: String, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			copy: event<{ token: string; value: string }>({ bubbles: true, composed: true })
		},
		styles
	}
)

defineElement('z-swatch', ZSwatch)

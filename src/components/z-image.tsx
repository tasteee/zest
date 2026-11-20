import { interactionStyles } from '../shared/interaction-styles'
import { defineElement } from '../shared/define-element'
import { srOnlyStyles } from '../shared/accessible'
import { c, css, event, useEffect, useRef, useState } from 'atomico'
import { oneOf } from '../shared/prop-types'
import { useLocale } from '../shared/locale'

/*
 * z-image, an <img> that behaves inside a layout. It reserves its box
 * before the file arrives (`ratio`), shows a quiet shimmer while it
 * loads, fades the picture in, and falls back to a neutral tile (or the
 * `fallback` slot) when the file fails.
 *
 * It loads lazily unless `is-eager`. `fit` and `position` are
 * object-fit and object-position. A `caption` (or the `caption` slot)
 * turns it into a figure with a figcaption.
 *
 * Without a ratio the image takes its natural height once loaded; the
 * placeholder holds a 16:9 box until then, so nothing jumps to zero.
 */
const styles = css`
	:host {
		display: block;
		min-width: 0;
		--z-image-radius: var(--radius-md);
	}

	:host([is-hidden]) {
		display: none;
	}

	:host([radius='none']) { --z-image-radius: 0; }
	:host([radius='sm']) { --z-image-radius: var(--radius-sm); }
	:host([radius='lg']) { --z-image-radius: var(--radius-lg); }
	:host([radius='xl']) { --z-image-radius: var(--radius-xl); }
	:host([radius='full']) { --z-image-radius: var(--radius-full); }

	figure {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin: 0;
	}

	.frame {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: var(--z-image-radius);
		background: var(--surface-subtle);
	}

	.frame.is-waiting {
		aspect-ratio: 16 / 9;
	}

	.frame.is-loaded {
		background: transparent;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		opacity: 0;
		transition: opacity var(--motion-slow) var(--ease-enter);
	}

	.frame.has-ratio img,
	.frame.is-waiting img {
		position: absolute;
		inset: 0;
		height: 100%;
	}

	.frame.is-loaded img {
		opacity: 1;
	}

	.frame.is-failed img {
		display: none;
	}

	.shimmer {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			100deg,
			transparent 30%,
			color-mix(in oklch, var(--text-primary) 6%, transparent) 50%,
			transparent 70%
		);
		background-size: 200% 100%;
		animation: z-image-shimmer 1.6s linear infinite;
	}

	@keyframes z-image-shimmer {
		from { background-position: 150% 0; }
		to { background-position: -50% 0; }
	}

	.fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-tertiary);
	}

	.fallback svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.frame.is-failed.is-waiting {
		aspect-ratio: 16 / 9;
	}

	figcaption {
		color: var(--text-secondary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-snug);
	}

	figcaption[hidden] {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.shimmer {
			animation: none;
		}
	}
`

type LoadStateT = 'loading' | 'loaded' | 'failed'

const FallbackIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<rect x="3" y="4" width="18" height="16" rx="2.5" />
		<circle cx="9" cy="10" r="1.75" />
		<path d="M21 16l-5-5-9 9" />
	</svg>
)

// "16/9", "16:9", "1.5" or "1" all become a CSS aspect-ratio.
const toAspectRatio = (ratio?: string): string | undefined => {
	if (!ratio) return undefined
	const normalized = ratio.replace(':', '/').trim()
	const isValid = /^\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?$/.test(normalized)
	if (!isValid) return undefined
	return normalized
}

export const ZImage = c(
	(props) => {
		const t = useLocale()
		const imageRef = useRef<HTMLImageElement>()
		const [loadState, setLoadState] = useState<LoadStateT>('loading')
		const [hasCaptionSlot, setHasCaptionSlot] = useState(false)

		// A new source starts over. A cached file can be complete before
		// the listeners run, so the element is asked directly too.
		useEffect(() => {
			const image = imageRef.current
			const isAlreadyLoaded = Boolean(image?.complete) && (image?.naturalWidth ?? 0) > 0
			setLoadState(isAlreadyLoaded ? 'loaded' : 'loading')
		}, [props.src, props.srcset])

		const handleLoad = () => {
			setLoadState('loaded')
			const image = imageRef.current
			props.load({ width: image?.naturalWidth ?? 0, height: image?.naturalHeight ?? 0 })
		}

		const handleError = () => {
			setLoadState('failed')
			props.error({ src: props.src ?? '' })
		}

		const handleCaptionSlotChange = (slotEvent: Event) => {
			const slot = slotEvent.target as HTMLSlotElement
			setHasCaptionSlot(slot.assignedNodes().length > 0)
		}

		const aspectRatio = toAspectRatio(props.ratio)
		const hasRatio = Boolean(aspectRatio)
		const hasSource = Boolean(props.src) || Boolean(props.srcset)
		const isLoaded = loadState === 'loaded'
		const isFailed = loadState === 'failed' || !hasSource
		const isLoading = !isLoaded && !isFailed
		const isWaiting = !hasRatio && !isLoaded

		const frameClass = ['frame']
			.concat(hasRatio ? ['has-ratio'] : [])
			.concat(isWaiting ? ['is-waiting'] : [])
			.concat(isLoaded ? ['is-loaded'] : [])
			.concat(isFailed ? ['is-failed'] : [])
			.join(' ')
		const frameStyle = hasRatio ? { aspectRatio } : {}
		const imageStyle = { objectFit: props.fit ?? 'cover', objectPosition: props.position ?? 'center' }
		const hasCaption = Boolean(props.caption) || hasCaptionSlot
		const altText = props.alt ?? ''
		const failedLabel = altText ? `${altText}. ${t('imageUnavailable')}` : t('imageUnavailable')

		return (
			<host shadowDom>
				<figure>
					<div class={frameClass} part="frame" style={frameStyle}>
						{hasSource && (
							<img
								ref={imageRef}
								part="image"
								src={props.src}
								srcset={props.srcset}
								sizes={props.sizes}
								alt={altText}
								loading={props.isEager ? 'eager' : 'lazy'}
								decoding="async"
								style={imageStyle}
								onload={handleLoad}
								onerror={handleError}
							/>
						)}
						{isLoading && <span class="shimmer" aria-hidden="true"></span>}
						{isFailed && (
							<div class="fallback" role="img" aria-label={failedLabel}>
								<slot name="fallback">
									<FallbackIcon />
								</slot>
							</div>
						)}
					</div>
					<figcaption part="caption" hidden={!hasCaption}>
						<slot name="caption" onslotchange={handleCaptionSlotChange}>
							{props.caption}
						</slot>
					</figcaption>
				</figure>
			</host>
		)
	},
	{
		props: {
			src: String,
			srcset: String,
			sizes: String,
			alt: String,
			ratio: String,
			caption: String,
			position: String,
			fit: { type: oneOf('cover', 'contain', 'fill', 'none', 'scale-down'), reflect: true },
			radius: { type: oneOf('none', 'sm', 'md', 'lg', 'xl', 'full'), reflect: true },
			isEager: { type: Boolean, reflect: true },
			isHidden: { type: Boolean, reflect: true },
			load: event<{ width: number; height: number }>({ bubbles: true, composed: true }),
			error: event<{ src: string }>({ bubbles: true, composed: true })
		},
		styles: [styles, interactionStyles, srOnlyStyles]
	}
)

defineElement('z-image', ZImage)

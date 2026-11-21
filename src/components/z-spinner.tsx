import { c, css } from 'atomico'
import { defineElement } from '../shared/define-element'
import { interactionStyles } from '../shared/interaction-styles'
import { useLocale } from '../shared/locale'
import { oneOf } from '../shared/prop-types'

// A ring of ten dots. A wave of growth travels around it.
// Waves one and two are plain. Wave three carries the spark
// tones and a soft glow. Each wave is followed by a pause.
// One keyframe set drives all three waves; every dot only
// differs by its angle, delay and spark tone.
const styles = css`
	:host { display: inline-flex; color: inherit; }
	:host([is-hidden]) { display: none; }

	.spinner {
		--spinner-size: var(--control-height-sm);
		--spinner-wave: var(--motion-spin-duration, 2s);
		--spinner-cycle: calc(var(--spinner-wave) * 3);
		--spinner-stagger: calc(var(--spinner-wave) * 0.05);
		position: relative;
		box-sizing: border-box;
		width: var(--spinner-size);
		height: var(--spinner-size);
	}
	:host([size='sm']) .spinner { --spinner-size: var(--space-4); }
	:host([size='lg']) .spinner { --spinner-size: var(--control-height-lg); }

	.dot {
		position: absolute;
		inset: 0;
		rotate: var(--dot-angle);
	}
	.dot::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: calc(var(--spinner-size) * 0.19);
		height: calc(var(--spinner-size) * 0.19);
		margin-left: calc(var(--spinner-size) * -0.095);
		border-radius: var(--radius-full);
		background: currentColor;
		opacity: 0.28;
		scale: 0.55;
		box-shadow: 0 0 0 0 transparent;
		animation: dot-wave var(--spinner-cycle) var(--ease-move) infinite;
		animation-delay: calc(var(--dot-index) * var(--spinner-stagger));
	}

	.dot:nth-child(1)  { --dot-index: 0; --dot-angle: 0deg;   --spark: var(--accent-spark-1); }
	.dot:nth-child(2)  { --dot-index: 1; --dot-angle: 36deg;  --spark: color-mix(in oklch, var(--accent-spark-1), var(--accent-spark-2)); }
	.dot:nth-child(3)  { --dot-index: 2; --dot-angle: 72deg;  --spark: var(--accent-spark-2); }
	.dot:nth-child(4)  { --dot-index: 3; --dot-angle: 108deg; --spark: color-mix(in oklch, var(--accent-spark-2), var(--accent-spark-3)); }
	.dot:nth-child(5)  { --dot-index: 4; --dot-angle: 144deg; --spark: var(--accent-spark-3); }
	.dot:nth-child(6)  { --dot-index: 5; --dot-angle: 180deg; --spark: color-mix(in oklch, var(--accent-spark-3), var(--accent-spark-4)); }
	.dot:nth-child(7)  { --dot-index: 6; --dot-angle: 216deg; --spark: var(--accent-spark-4); }
	.dot:nth-child(8)  { --dot-index: 7; --dot-angle: 252deg; --spark: color-mix(in oklch, var(--accent-spark-4), var(--accent-spark-5)); }
	.dot:nth-child(9)  { --dot-index: 8; --dot-angle: 288deg; --spark: var(--accent-spark-5); }
	.dot:nth-child(10) { --dot-index: 9; --dot-angle: 324deg; --spark: color-mix(in oklch, var(--accent-spark-5), var(--accent-spark-1)); }

	/* Cycle = three waves of 33.333%. Each pulse is brief,
	   the rest of the wave slot is the pause. */
	@keyframes dot-wave {
		0%, 9%, 33.333%, 42%, 66.667%, 82%, 100% {
			opacity: 0.28;
			scale: 0.55;
			background: currentColor;
			box-shadow: 0 0 0 0 transparent;
		}
		3.5% { opacity: 1; scale: 1; background: currentColor; box-shadow: 0 0 0 0 transparent; }
		36.833% { opacity: 1; scale: 1; background: currentColor; box-shadow: 0 0 0 0 transparent; }
		70.5% {
			opacity: 1;
			scale: 1.12;
			background: var(--spark);
			box-shadow: 0 0 calc(var(--spinner-size) * 0.3) calc(var(--spinner-size) * 0.03) color-mix(in oklch, var(--spark) 65%, transparent);
		}
		75% {
			opacity: 0.75;
			scale: 0.8;
			background: var(--spark);
			box-shadow: 0 0 calc(var(--spinner-size) * 0.2) 0 color-mix(in oklch, var(--spark) 35%, transparent);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot::before { animation: none; opacity: 0.5; scale: 0.8; }
	}
`

export const ZSpinner = c(
	(props) => {
		const translate = useLocale()
		const label = props.label || translate('loading')
		return (
			<host shadowDom>
				<span class="spinner" role="status" aria-label={label}>
					<span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>
					<span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>
				</span>
			</host>
		)
	},
	{
		props: {
			size: { type: oneOf('sm', 'md', 'lg'), reflect: true },
			label: String,
			isHidden: { type: Boolean, reflect: true }
		},
		styles: [styles, interactionStyles]
	}
)

defineElement('z-spinner', ZSpinner)

import type React from 'react'

// JSX typings for the zest web components when used from React.
//
// React 19 sets unknown JSX props as DOM properties when the custom element
// defines a matching property (Atomico does), otherwise as attributes — so we
// can pass camelCase props like `isLoading` directly. @types/react 19 uses
// `export = React` + `export as namespace React`, so the JSX the runtime
// consumes is `React.JSX`; augmenting the global React namespace merges into it
// reliably (a `declare module 'react'` merge does not, given that module shape).

type ZestBase<T = HTMLElement> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T> & {
	class?: string
}

type ZSize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type ZColor = 'primary' | 'secondary' | 'muted' | 'neutral'
type ZWeight = '900' | '700' | '600' | '400' | '300'

type ZTextProps = ZestBase & {
	size?: ZSize
	color?: ZColor
	weight?: ZWeight
	tag?: string
	isItalic?: boolean
	isUnderlined?: boolean
	isStrikethrough?: boolean
	isHidden?: boolean
}

type ZButtonProps = ZestBase & {
	size?: 'small' | 'medium' | 'large'
	kind?: 'solid' | 'outline' | 'ghost' | 'soft' | 'plain'
	tone?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'danger'
	isHidden?: boolean
	isDisabled?: boolean
	isLoading?: boolean
	isFullWidth?: boolean
	label?: string
	type?: 'button' | 'submit' | 'reset'
}

type ZLinkProps = ZestBase & {
	href?: string
	target?: string
	label?: string
	size?: ZSize
	tone?: string
	underline?: string
	isExternal?: boolean
	isBlock?: boolean
	isDisabled?: boolean
}

type ZCardProps = ZestBase & {
	isFlex?: boolean
	isRow?: boolean
	isColumn?: boolean
	doesLightUpOnHover?: boolean
	gap?: string
	isHidden?: boolean
}

// Interactive elements (z-input/z-select/z-chip) emit Atomico CustomEvents that
// React does not auto-bind; prefer the React wrappers in zest/controls.tsx.
// Loosely typed here for completeness.
type ZAnyProps = ZestBase & Record<string, unknown>

export {}

declare global {
	namespace React {
		namespace JSX {
			interface IntrinsicElements {
				'z-heading': ZTextProps
				'z-subheading': ZTextProps
				'z-text': ZTextProps
				'z-label': ZTextProps
				'z-button': ZButtonProps
				'z-link': ZLinkProps
				'z-card': ZCardProps
				'z-badge': ZAnyProps
				'z-chip': ZAnyProps
				'z-input': ZAnyProps
				'z-textarea': ZAnyProps
				'z-select': ZAnyProps
				'z-line': ZAnyProps
				'z-code-block': ZAnyProps
			}
		}
	}
}

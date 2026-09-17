// Lets TSX accept any <z-*> tag with arbitrary attributes, properties and
// on<event> listeners. A typed surface is Phase 4 work (tightened
// declarations); until then this keeps the example honest without `any`
// spreading through app code.
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ZestElementPropsT = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
	[attribute: string]: unknown
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			[tag: `z-${string}`]: ZestElementPropsT
		}
	}
}

export {}

'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

type LineProps = Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, 'orientation'> & {
	isVertical?: boolean
	isHorizontal?: boolean
	orientation?: 'horizontal' | 'vertical'
}

function Line({
	className,
	orientation,
	isVertical,
	isHorizontal,
	decorative = true,
	...props
}: LineProps) {
	const resolvedOrientation = isVertical ? 'vertical' : isHorizontal ? 'horizontal' : orientation ?? 'horizontal'

	return (
		<SeparatorPrimitive.Root
			data-slot='line'
			decorative={decorative}
			orientation={resolvedOrientation}
			className={cn(
				'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
				className
			)}
			{...props}
		/>
	)
}

export { Line }
export type { LineProps }

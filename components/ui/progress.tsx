'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

type ProgressVariantT = 'neutral' | 'purple' | 'pink'

type ProgressVariantOptionsT = {
	variant?: ProgressVariantT | null
}

const progressVariants = (options?: ProgressVariantOptionsT): string => {
	const variant = options?.variant ?? 'neutral'

	return cn(
		'relative h-2 w-full overflow-hidden rounded-full',
		variant === 'neutral' && 'bg-primary/20',
		variant === 'purple' && 'bg-neon-purple/20',
		variant === 'pink' && 'bg-neon-pink/20'
	)
}

const indicatorVariants = (options?: ProgressVariantOptionsT): string => {
	const variant = options?.variant ?? 'neutral'

	return cn(
		'h-full w-full flex-1 transition-all',
		variant === 'neutral' && 'bg-primary',
		variant === 'purple' && 'bg-neon-purple',
		variant === 'pink' && 'bg-neon-pink'
	)
}

function Progress({
	className,
	value,
	variant,
	...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & ProgressVariantOptionsT) {
	const progressValue = value ?? 0

	return (
		<ProgressPrimitive.Root data-slot='progress' className={cn(progressVariants({ variant }), className)} {...props}>
			<ProgressPrimitive.Indicator
				data-slot='progress-indicator'
				className={indicatorVariants({ variant })}
				style={{ transform: `translateX(-${100 - progressValue}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
}

export { Progress, progressVariants }

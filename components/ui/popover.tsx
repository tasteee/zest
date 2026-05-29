'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'

type PopoverPropsT = React.ComponentProps<typeof PopoverPrimitive.Root>
type PopoverTriggerPropsT = React.ComponentProps<typeof PopoverPrimitive.Trigger>
type PopoverContentPropsT = React.ComponentProps<typeof PopoverPrimitive.Content>
type PopoverAnchorPropsT = React.ComponentProps<typeof PopoverPrimitive.Anchor>

function Popover(props: PopoverPropsT) {
	return <PopoverPrimitive.Root data-slot='popover' {...props} />
}

function PopoverTrigger(props: PopoverTriggerPropsT) {
	const className = cn('z-popover-trigger', props.className)
	return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} className={className} />
}

function PopoverContent(props: PopoverContentPropsT) {
	const sideOffset = props.sideOffset ?? 4
	const align = props.align ?? 'center'

	const className = cn(
		'z-popover-content bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
		props.className
	)

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot='popover-content'
				{...props}
				align={align}
				sideOffset={sideOffset}
				className={className}
			/>
		</PopoverPrimitive.Portal>
	)
}

function PopoverAnchor(props: PopoverAnchorPropsT) {
	const className = cn('z-popover-anchor', props.className)
	return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} className={className} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
